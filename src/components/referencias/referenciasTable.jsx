import React, { useEffect, useState } from "react"
import { getReferencias, deleteReferencia } from "../../apis/reference"
import ReferenciaDialog from "./referenciaDialog"

const ReferenciasTable = () => {
    const [referencias, setReferencias] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [editReferencia, setEditReferencia] = useState(null)

    useEffect(() => {
        fetchReferencias()
    }, [])

    const fetchReferencias = async () => {
        const data = await getReferencias()
        setReferencias(data)
    }

    const handleEdit = (ref) => {
        setEditReferencia(ref)
        setOpenDialog(true)
    }

    const handleDelete = async (id) => {
        await deleteReferencia(id)
        fetchReferencias()
    }

    const handleCreate = () => {
        setEditReferencia(null)
        setOpenDialog(true)
    }

    const handleDialogClose = (refresh = false) => {
        setOpenDialog(false)
        setEditReferencia(null)
        if (refresh) fetchReferencias()
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Colecciónes</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreate}>
                    Crear colección
                </button>
            </div>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Colección</th>
                        <th className="border px-4 py-2">Curador/Admin</th>
                        <th className="border px-4 py-2">Catalog Number</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {referencias.map((ref) => (
                        <tr key={ref.id}>
                            <td className="border px-4 py-2">{ref.referencia}</td>
                            <td className="border px-4 py-2">{ref.curador_nombre || ref.admin_nombre}</td>
                            <td className="border px-4 py-2">{ref.catalogNumber || "—"}</td>
                            <td className="border px-4 py-2">
                                <button className="text-blue-500 mr-2" onClick={() => handleEdit(ref)}>
                                    Editar
                                </button>
                                <button className="text-red-500" onClick={() => handleDelete(ref.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openDialog && <ReferenciaDialog open={openDialog} onClose={handleDialogClose} referencia={editReferencia} />}
        </div>
    )
}

export default ReferenciasTable
