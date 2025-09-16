import React, { useEffect, useState } from "react"
import { getCuradores } from "../../apis/curadores"
import { createReferencia, updateReferencia } from "../../apis/reference"

const ReferenciaDialog = ({ open, onClose, referencia }) => {
    const [curadores, setCuradores] = useState([])
    const [form, setForm] = useState({
        id_curador: referencia?.id_curador || "",
        referencia: referencia?.referencia || "",
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCuradores()
        if (referencia) {
            setForm({
                id_curador: referencia.id_curador || "",
                referencia: referencia.referencia || "",
            })
        } else {
            setForm({ id_curador: "", referencia: "" })
        }
    }, [referencia])

    const fetchCuradores = async () => {
        const data = await getCuradores()
        setCuradores(data)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (referencia) {
            await updateReferencia(referencia.id, form)
        } else {
            await createReferencia(form)
        }
        setLoading(false)
        onClose(true)
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg min-w-[350px]">
                <h3 className="text-lg font-bold mb-4">{referencia ? "Editar" : "Crear"} Referencia</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Curador/Admin</label>
                        <select
                            name="id_curador"
                            value={form.id_curador}
                            onChange={handleChange}
                            className="w-full border px-2 py-1 rounded"
                            required
                        >
                            <option value="">Seleccione...</option>
                            {curadores.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.full_name} ({c.rol})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Referencia</label>
                        <textarea
                            name="referencia"
                            value={form.referencia}
                            onChange={handleChange}
                            className="w-full border px-2 py-1 rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" className="px-4 py-2" onClick={() => onClose(false)}>
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReferenciaDialog
