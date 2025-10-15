import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Form from "../pages/form"

vi.mock("../supabase/client", () => ({
    supabase: {
        auth: { getUser: vi.fn(async () => ({ data: { user: { id: "user-1" } }, error: null })) },
    },
}))

const mockedUpdateEspecie = vi.hoisted(() => vi.fn(async () => ({ data: {}, error: null })))
vi.mock("../apis/Especie", () => ({
    updateEspecie: mockedUpdateEspecie,
    createEspecie: vi.fn(),
    deleteEspecie: vi.fn(),
}))

vi.mock("../context/NotificationsContext", () => ({
    useNotifications: () => ({ success: vi.fn(), error: vi.fn(), warning: vi.fn() }),
    NotificationsProvider: ({ children }) => children,
}))

vi.mock("../components/especies/form/especiesForm", () => ({
    default: ({ onChange }) => {
        // Simula cambio que incluye campo reference para verificar limpieza
        onChange({ scientificName: "Test", reference: { id: "ref1" } })
        return <div>Form Mock</div>
    },
}))

describe("Form update limpieza de campo reference", () => {
    it("elimina reference antes de enviar update", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: "/Form", state: { species: { id: 10 }, mode: "curador" } }]}>
                <Form />
            </MemoryRouter>
        )

        // Click en botón Actualizar
        const btn = await screen.findByRole("button", { name: /actualizar/i })
        fireEvent.click(btn)

        // Verifica que el update no recibe el campo reference
        expect(mockedUpdateEspecie).toHaveBeenCalled()
        const payload = mockedUpdateEspecie.mock.calls[0][1]
        expect("reference" in payload).toBe(false)
    })
})
