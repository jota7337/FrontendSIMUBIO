import { describe, it, expect, vi, beforeEach, afterAll } from "vitest"
import { exportEspeciesWithTemplate } from "../lib/table-especie-logic"

vi.mock("file-saver", () => ({ saveAs: vi.fn() }))
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
                gte() {
                    return builder
                },
                lte() {
                    return builder
                },
                async then(resolve) {
                    return resolve({ data: [{ Col1: "A", Col2: "B" }], error: null })
                },
            }
            return builder
        }),
    },
}))

const mockFetch = vi.fn()
window.fetch = mockFetch

const mockArrayBuffer = new ArrayBuffer(8)
const mockWorkbook = {
    Sheets: { Plantilla: { A1: { v: "Col1" }, B1: { v: "Col2" }, "!ref": "A1:B2" } },
}

vi.mock("xlsx", async () => {
    const actual = await vi.importActual("xlsx")
    return {
        ...actual,
        read: vi.fn(() => mockWorkbook),
        utils: {
            ...actual.utils,
            decode_range: () => ({ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }),
            encode_cell: ({ r, c }) => (c === 0 ? "A1" : "B1"),
            sheet_add_json: vi.fn(),
        },
        write: vi.fn(() => new ArrayBuffer(8)),
    }
})

describe("exportEspeciesWithTemplate", () => {
    let saveAs
    beforeEach(async () => {
        saveAs = (await import("file-saver")).saveAs
        saveAs.mockClear()
        window.alert = vi.fn()
        mockFetch.mockReset()
        mockFetch.mockResolvedValue({ arrayBuffer: () => mockArrayBuffer })
    })
    afterAll(() => {
        vi.restoreAllMocks()
    })

    it("genera archivo Excel con nombre correcto", async () => {
        await exportEspeciesWithTemplate("ref-1")
        expect(saveAs).toHaveBeenCalled()
        const filename = saveAs.mock.calls[0][1]
        expect(filename).toBe("Especies_Plantilla_SIMUBIO.xlsx")
    })

    it("muestra alerta si error en supabase", async () => {
        const { supabase } = await import("../supabase/client")
        supabase.from.mockReturnValueOnce({
            select: () => ({ eq: () => ({ eq: () => ({ data: null, error: { message: "fail" } }) }) }),
        })
        await exportEspeciesWithTemplate("ref-err")
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/error/i))
        expect(saveAs).not.toHaveBeenCalled()
    })

    it("muestra alerta si no hay datos", async () => {
        const { supabase } = await import("../supabase/client")
        supabase.from.mockReturnValueOnce({
            select: () => ({ eq: () => ({ eq: () => ({ data: [], error: null }) }) }),
        })
        await exportEspeciesWithTemplate("ref-vacio")
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/no hay registros/i))
        expect(saveAs).not.toHaveBeenCalled()
    })

    it("muestra alerta si no existe hoja Plantilla", async () => {
        const { read } = await import("xlsx")
        read.mockReturnValueOnce({ Sheets: {} })
        await exportEspeciesWithTemplate("ref-no-sheet")
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/plantilla/i))
        expect(saveAs).not.toHaveBeenCalled()
    })
})
