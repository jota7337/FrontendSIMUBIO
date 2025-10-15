it("getUsuarioPorId maneja error de usuario no autenticado", async () => {
    supabase.auth.getUser.mockResolvedValueOnce({ data: null, error: { message: "no user" } })
    // from no debe ser llamado
    const { data, error } = await userApi.getUsuarioPorId()
    expect(data).toBeUndefined()
    expect(error).toBeUndefined()
})

it("getUsuarioPorId maneja error en select", async () => {
    const single = vi.fn(async () => ({ data: null, error: { message: "fail" } }))
    const eq = vi.fn(() => ({ single }))
    const select = vi.fn(() => ({ eq }))
    supabase.from.mockReturnValue({ select })
    const { data, error } = await userApi.getUsuarioPorId()
    expect(error).toBeTruthy()
    expect(data).toBeNull()
})

it("getRoles maneja error en select", async () => {
    supabase.from.mockReturnValue({ select: async () => ({ data: null, error: { message: "fail" } }) })
    const { data, error } = await userApi.getRoles()
    expect(error).toBeTruthy()
    expect(data).toBeNull()
})

it("updateUsuario maneja error en update", async () => {
    supabase.from.mockReturnValue({ update: () => ({ eq: async () => ({ data: null, error: { message: "fail" } }) }) })
    const { error } = await userApi.updateUsuario("user-1", "Nuevo Nombre")
    expect(error).toBeTruthy()
})

it("getUsuarioPorId retorna perfil sin roles", async () => {
    const single = vi.fn(async () => ({ data: { id: "u1", roles: null }, error: null }))
    const eq = vi.fn(() => ({ single }))
    const select = vi.fn(() => ({ eq }))
    supabase.from.mockReturnValue({ select })
    const { data, error } = await userApi.getUsuarioPorId()
    expect(error).toBeNull()
    expect(data.roles).toBeNull()
})

it("getRoles retorna array vacío si no hay roles", async () => {
    supabase.from.mockReturnValue({ select: async () => ({ data: [], error: null }) })
    const { data, error } = await userApi.getRoles()
    expect(error).toBeNull()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(0)
})
import { describe, it, expect, vi, beforeEach } from "vitest"
import * as userApi from "../apis/usuarios"
import { supabase } from "../supabase/client"

vi.mock("../supabase/client", () => ({
    supabase: {
        from: vi.fn(),
        auth: { getUser: vi.fn(async () => ({ data: { user: { id: "user-1" } }, error: null })) },
    },
}))

describe("API usuarios.js", () => {
    beforeEach(() => vi.clearAllMocks())

    it("getUsuarioPorId devuelve perfil con rol", async () => {
        // from('profiles').select().eq().single()
        const single = vi.fn(async () => ({ data: { id: "u1" }, error: null }))
        const eq = vi.fn(() => ({ single }))
        const select = vi.fn(() => ({ eq }))
        supabase.from.mockReturnValue({ select })
        const { data, error } = await userApi.getUsuarioPorId()
        expect(error).toBeNull()
        expect(data).toBeTruthy()
    })

    it("getRoles hace select *", async () => {
        supabase.from.mockReturnValue({ select: async () => ({ data: [{ id: 1 }], error: null }) })
        const { data, error } = await userApi.getRoles()
        expect(error).toBeNull()
        expect(Array.isArray(data)).toBe(true)
    })

    it("updateUsuario actualiza nombre", async () => {
        supabase.from.mockReturnValue({ update: () => ({ eq: async () => ({ data: {}, error: null }) }) })
        const { error } = await userApi.updateUsuario("user-1", "Nuevo Nombre")
        expect(error).toBeNull()
    })
})
