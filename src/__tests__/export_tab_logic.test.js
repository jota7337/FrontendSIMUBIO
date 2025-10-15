import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from "vitest"
import { exportDarwinCoreTSV } from "../lib/export_tab_logic"

// Mock de saveAs
vi.mock("file-saver", () => ({ saveAs: vi.fn() }))

// Mock de supabase
vi.mock("../supabase/client", () => ({
    supabase: {
        from: vi.fn(() => {
            const builder = {
                select() {
                    return builder
                },
                eq() {
                    return builder
                },
                then(resolve) {
                    return resolve({ data: [{ occurrenceID: "occ-1" }], error: null })
                },
            }
            return builder
        }),
    },
}))

describe("exportDarwinCoreTSV", () => {
    const OriginalBlob = globalThis.Blob
    let saveAs
    beforeAll(async () => {
        // Mock de Blob con soporte .text()
        globalThis.Blob = class BlobMock {
            constructor(parts) {
                this._text = parts.map((p) => (typeof p === "string" ? p : String(p))).join("")
            }
            async text() {
                return this._text
            }
        }
        saveAs = (await import("file-saver")).saveAs
    })
    afterAll(() => {
        globalThis.Blob = OriginalBlob
    })

    beforeEach(() => {
        saveAs.mockClear()
        window.alert = vi.fn()
    })

    it("genera archivo TSV con headers y descripciones", async () => {
        await exportDarwinCoreTSV("ref-1")
        expect(saveAs).toHaveBeenCalled()
        const blob = saveAs.mock.calls[0][0]
        const text = await blob.text()
        const cleaned = text.replace(/^\uFEFF/, "")
        const lines = cleaned.split(/\r?\n/)
        // primera línea: headers técnicos
        expect(lines[0]).toContain("occurrenceID\t")
        // segunda línea: descripciones en español
        expect(lines[1]).toContain("ID del registro biológico\t")
        // tercera línea: datos
        expect(lines[2]).toContain("occ-1")
    })

    it("llama alert y no saveAs si error en supabase", async () => {
        const { supabase } = await import("../supabase/client")
        supabase.from.mockReturnValueOnce({
            select: () => ({ eq: () => ({ eq: () => ({ data: null, error: { message: "fail" } }) }) }),
        })
        await exportDarwinCoreTSV("ref-err")
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/error/i))
        expect(saveAs).not.toHaveBeenCalled()
    })

    it("llama alert y no saveAs si no hay datos", async () => {
        const { supabase } = await import("../supabase/client")
        supabase.from.mockReturnValueOnce({
            select: () => ({ eq: () => ({ eq: () => ({ data: [], error: null }) }) }),
        })
        await exportDarwinCoreTSV("ref-vacio")
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/no hay registros/i))
        expect(saveAs).not.toHaveBeenCalled()
    })

    it("genera archivo con nombre correcto", async () => {
        await exportDarwinCoreTSV("ref-1")
        expect(saveAs).toHaveBeenCalled()
        const filename = saveAs.mock.calls[0][1]
        expect(filename).toBe("DarwinCore_SIMUBIO.tsv")
    })

    it("exporta datos en el mismo orden que los headers", async () => {
        await exportDarwinCoreTSV("ref-1")
        const blob = saveAs.mock.calls[0][0]
        const text = await blob.text()
        const lines = text.split(/\r?\n/)
        const headers = lines[0].split("\t")
        const data = lines[2].split("\t")
        expect(data.length).toBe(headers.length)
    })
})
