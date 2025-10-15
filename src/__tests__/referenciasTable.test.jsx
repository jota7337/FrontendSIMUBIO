import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import ReferenciasTable from "../components/referencias/referenciasTable"
import * as referenceApi from "../apis/reference"

jest.mock("../apis/reference")

describe("ReferenciasTable", () => {
    const referenciasMock = [
        { id: 1, referencia: "Colección 1", curador_nombre: "Curador 1", catalogNumber: "A1" },
        { id: 2, referencia: "Colección 2", admin_nombre: "Admin 2", catalogNumber: "B2" },
        { id: 3, referencia: "Colección 3", curador_nombre: "Curador 3", catalogNumber: null },
    ]

    beforeEach(() => {
        jest.clearAllMocks()
        referenceApi.getReferencias.mockResolvedValue([...referenciasMock])
        referenceApi.deleteReferencia.mockResolvedValue()
    })

    it("renderiza la tabla y los datos", async () => {
        render(<ReferenciasTable />)
        expect(await screen.findByText("Colección 1")).toBeInTheDocument()
        expect(screen.getByText("Curador 1")).toBeInTheDocument()
        expect(screen.getByText("A1")).toBeInTheDocument()
        expect(screen.getByText("Colección 2")).toBeInTheDocument()
        expect(screen.getByText("Admin 2")).toBeInTheDocument()
        expect(screen.getByText("B2")).toBeInTheDocument()
        expect(screen.getByText("Colección 3")).toBeInTheDocument()
        expect(screen.getByText("Curador 3")).toBeInTheDocument()
        expect(screen.getAllByText("—").length).toBeGreaterThanOrEqual(1)
    })

    it("abre el diálogo de crear colección", async () => {
        render(<ReferenciasTable />)
        fireEvent.click(await screen.findByText("Crear colección"))
        expect(await screen.findByText(/referencia/i)).toBeInTheDocument()
    })

    it("abre el diálogo de editar", async () => {
        render(<ReferenciasTable />)
        fireEvent.click(await screen.findByText("Editar"))
        expect(await screen.findByText(/referencia/i)).toBeInTheDocument()
    })

    it("elimina una referencia y refresca", async () => {
        render(<ReferenciasTable />)
        fireEvent.click(await screen.findAllByText("Eliminar")[0])
        await waitFor(() => {
            expect(referenceApi.deleteReferencia).toHaveBeenCalled()
            expect(referenceApi.getReferencias).toHaveBeenCalledTimes(2)
        })
    })

    it("muestra paginación si hay muchas referencias", async () => {
        referenceApi.getReferencias.mockResolvedValue(
            Array(25)
                .fill()
                .map((_, i) => ({ id: i, referencia: `Ref ${i}` }))
        )
        render(<ReferenciasTable />)
        expect(await screen.findByText("Ref 0")).toBeInTheDocument()
        expect(screen.getByText(/Página 1 de/)).toBeInTheDocument()
    })

    it("maneja error al cargar referencias", async () => {
        referenceApi.getReferencias.mockRejectedValue(new Error("fail"))
        render(<ReferenciasTable />)
        // No truena, pero no hay datos
        await waitFor(() => {
            expect(screen.queryByText("Colección 1")).not.toBeInTheDocument()
        })
    })
})
