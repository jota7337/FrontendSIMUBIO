import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Alert } from "../components/ui/Alert"

describe("Alert component", () => {
    it("renderiza titulo y contenido", () => {
        render(
            <Alert variant="success" title="Listo">
                Guardado correctamente
            </Alert>
        )
        expect(screen.getByText("Listo")).toBeInTheDocument()
        expect(screen.getByText("Guardado correctamente")).toBeInTheDocument()
    })

    it("aplica clases por variante", () => {
        const { container } = render(<Alert variant="error">Error</Alert>)
        expect(container.firstChild.className).toContain("bg-red-50")
    })

    it("renderiza todas las variantes", () => {
        const variants = [
            { v: "success", c: "bg-green-50" },
            { v: "error", c: "bg-red-50" },
            { v: "warning", c: "bg-yellow-50" },
            { v: "info", c: "bg-blue-50" },
        ]
        variants.forEach(({ v, c }) => {
            const { container, unmount } = render(<Alert variant={v}>Alerta</Alert>)
            expect(container.firstChild.className).toContain(c)
            unmount()
        })
    })

    it("renderiza el botón de cierre si onClose está presente", () => {
        const onClose = vi.fn()
        render(<Alert onClose={onClose}>Cerrable</Alert>)
        const btn = screen.getByRole("button", { name: /cerrar/i })
        expect(btn).toBeInTheDocument()
    })

    it("llama a onClose al hacer clic en el botón de cierre", () => {
        const onClose = vi.fn()
        render(<Alert onClose={onClose}>Cerrable</Alert>)
        const btn = screen.getByRole("button", { name: /cerrar/i })
        btn.click()
        expect(onClose).toHaveBeenCalled()
    })

    it("no renderiza el botón de cierre si onClose no está presente", () => {
        render(<Alert>Sin cierre</Alert>)
        expect(screen.queryByRole("button", { name: /cerrar/i })).toBeNull()
    })

    it("renderiza sin título", () => {
        render(<Alert>Solo contenido</Alert>)
        expect(screen.getByText("Solo contenido")).toBeInTheDocument()
    })

    it("aplica clase personalizada", () => {
        const { container } = render(<Alert className="mi-clase">Alerta</Alert>)
        expect(container.firstChild.className).toContain("mi-clase")
    })
})
