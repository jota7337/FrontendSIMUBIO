it("updateRecordNumber maneja error de supabase", async () => {
    supabase.from.mockReturnValue({
        update: () => ({ eq: async () => ({ data: null, error: { message: "fail" } }) }),
    })
    const res = await especieApi.updateRecordNumber(5, "RN-001")
    expect(res.error).toBeTruthy()
})

it("createEspeciesBatch maneja error y lanza", async () => {
    supabase.from.mockReturnValue({ insert: async () => ({ data: null, error: { message: "fail" } }) })
    const rows = [{ scientificName: "Testus test" }]
    await expect(() => especieApi.createEspeciesBatch(rows, "user-1")).rejects
})

it("getEspecieByUser retorna undefined si usuario no autenticado", async () => {
    supabase.auth.getUser.mockResolvedValueOnce({ data: null, error: { message: "no user" } })
    const res = await especieApi.getEspecieByUser()
    expect(res).toBeUndefined()
})

it("getEspecieById retorna join anidado", async () => {
    supabase.from.mockReturnValue({
        select: () => ({ eq: () => ({ single: async () => ({ data: { id: 1, estado_especie: { id: 2 } }, error: null }) }) }),
    })
    const res = await especieApi.getEspecieById(1)
    expect(res.data.estado_especie).toBeTruthy()
})

it("getEspecieByReferenceUser retorna [] si usuario no autenticado", async () => {
    supabase.auth.getUser.mockResolvedValueOnce({ data: null, error: { message: "no user" } })
    const res = await especieApi.getEspecieByReferenceUser("ref-1")
    expect(res).toBeUndefined()
})

it("getEspecieByReferenceUser retorna data filtrada", async () => {
    supabase.auth.getUser.mockResolvedValueOnce({ data: { user: { id: "user-1" } }, error: null })
    supabase.from.mockReturnValue({
        select: () => ({ eq: () => ({ eq: async () => ({ data: [{ id: 1 }], error: null }) }) }),
    })
    const res = await especieApi.getEspecieByReferenceUser("ref-1")
    expect(Array.isArray(res)).toBe(true)
})
import { describe, it, expect, vi, beforeEach } from "vitest"
import * as especieApi from "../apis/Especie"
import { supabase } from "../supabase/client"

vi.mock("../supabase/client", () => ({
    supabase: {
        from: vi.fn(),
        auth: { getUser: vi.fn(async () => ({ data: { user: { id: "user-1" } }, error: null })) },
    },
}))

// Helpers para construir respuestas simuladas
function ok(data) {
    return { data, error: null }
}

describe("API Especie.js", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("updateRecordNumber llama update con recordNumber", async () => {
        supabase.from.mockReturnValue({
            update: () => ({ eq: async () => ok({}) }),
        })
        const res = await especieApi.updateRecordNumber(5, "RN-001")
        expect(res.error).toBe(null)
    })

    it("createEspecie agrega created_by y hace insert", async () => {
        const insert = vi.fn(async () => ok({ id: 1 }))
        supabase.from.mockReturnValue({ insert })
        const payload = { scientificName: "Testus test" }
        const res = await especieApi.createEspecie(payload, "user-1")
        expect(insert).toHaveBeenCalled()
        expect(res.error).toBe(null)
    })

    it("updateEspecie hace update por id", async () => {
        supabase.from.mockReturnValue({ update: () => ({ eq: async () => ok({}) }) })
        const res = await especieApi.updateEspecie(9, { country: "CO" })
        expect(res.error).toBe(null)
    })

    it("deleteEspecie hace delete por id", async () => {
        supabase.from.mockReturnValue({ delete: () => ({ eq: async () => ok({}) }) })
        const res = await especieApi.deleteEspecie(2)
        expect(res.error).toBe(null)
    })

    it("getEspecies hace select *", async () => {
        supabase.from.mockReturnValue({ select: async () => ok([{ id: 1 }]) })
        const res = await especieApi.getEspecies()
        expect(res.error).toBe(null)
        expect(res.data).toBeTruthy()
    })

    it("getEspecieByReference devuelve data", async () => {
        supabase.from.mockReturnValue({ select: () => ({ eq: async () => ok([{ id: 1 }]) }) })
        const res = await especieApi.getEspecieByReference("ref-1")
        expect(Array.isArray(res)).toBe(true)
    })
})
