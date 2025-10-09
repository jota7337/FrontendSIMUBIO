import { useState, useEffect } from "react"
import { useWindowSize } from "../../lib/useWindowSize"
import { Pencil, Trash } from "lucide-react"
import { updateComentario, deleteComentario, getComentariosByAuthor } from "../../apis/Comentarios"

export default function ObservationsTable() {
    const [observations, setObservations] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [editValue, setEditValue] = useState("")
    const [filterEspecie, setFilterEspecie] = useState("")
    const [filterAprobado, setFilterAprobado] = useState("todos")
    async function fetchComentarios() {
        const comentarios = await getComentariosByAuthor()
        const mapped = comentarios.map((c) => ({
            id: c.id,
            encargado: c.profiles?.full_name || c.author_id,
            department: "",
            observation: c.cuerpo,
            especie: c.especies?.scientificName || "Desconocida",
            especieid: c.especies?.id || "Desconocida",
            created_at: c.created_at,
            campo: c.campo || "N/A",
            aprobado: c.aprobado ?? false,
        }))
        setObservations(mapped)
    }
    useEffect(() => {
        fetchComentarios()
    }, [])

    const handleEdit = (id) => {
        const obs = observations.find((o) => o.id === id)
        setEditingId(id)
        setEditValue(obs ? obs.observation : "")
    }

    const handleEditSave = async () => {
        await updateComentario(editingId, editValue, false)
        setObservations((obs) => obs.map((o) => (o.id === editingId ? { ...o, observation: editValue } : o)))
        setEditingId(null)
        setEditValue("")
        fetchComentarios()
    }

    const handleDelete = async (id) => {
        await deleteComentario(id)
        setObservations(observations.filter((obs) => obs.id !== id))
    }

    // Filtering logic
    const filteredObservations = observations.filter((obs) => {
        const matchEspecie = filterEspecie === "" || obs.especie.toLowerCase().includes(filterEspecie.toLowerCase())
        const matchAprobado =
            filterAprobado === "todos" ||
            (filterAprobado === "aprobado" && obs.aprobado) ||
            (filterAprobado === "pendiente" && !obs.aprobado)
        return matchEspecie && matchAprobado
    })

    // PAGINACIÓN responsiva
    const { breakpoint } = useWindowSize()
    let itemsPerPage = 20
    if (breakpoint === "xs") itemsPerPage = 5
    else if (breakpoint === "sm") itemsPerPage = 8
    else if (breakpoint === "md") itemsPerPage = 12
    else if (breakpoint === "lg") itemsPerPage = 16
    // xl = 20
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(filteredObservations.length / itemsPerPage)
    const paginatedObservations = filteredObservations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    useEffect(() => { setCurrentPage(1) }, [itemsPerPage])

    return (
        <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Correcciones </h2>
            {/* Filtros */}
            <div className="flex flex-wrap gap-4 mb-4 items-center justify-center">
                <div>
                    <label className="block text-sm text-gray-700 mb-1">Filtrar por especie</label>
                    <input
                        type="text"
                        value={filterEspecie}
                        onChange={(e) => setFilterEspecie(e.target.value)}
                        placeholder="Nombre científico"
                        className="border border-gray-300 rounded px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-700 mb-1">Filtrar por estado</label>
                    <select
                        value={filterAprobado}
                        onChange={(e) => setFilterAprobado(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        <option value="todos">Todos</option>
                        <option value="aprobado">Resuelto</option>
                        <option value="pendiente">Pendiente</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="text-left px-6 py-4">Encargado</th>
                            <th className="text-left px-6 py-4">id especie</th>
                            <th className="text-left px-6 py-4">Observación</th>
                            <th className="text-left px-6 py-4">Campo</th>
                            <th className="text-left px-6 py-4">Fecha</th>
                            <th className="text-left px-6 py-4">Especie</th>

                            <th className="text-center px-6 py-4">Aprobado</th>
                            <th className="text-center px-6 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedObservations.map((obs) => (
                            <tr key={obs.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-800">{obs.encargado}</td>
                                <td className="px-6 py-4 text-gray-800">{obs.especieid}</td>
                                <td className="px-6 py-4 text-gray-800">
                                    {editingId === obs.id ? (
                                        <>
                                            <textarea
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="border p-2 rounded w-full resize-vertical min-h-[60px] max-h-[200px]"
                                                rows={Math.max(3, editValue.split("\n").length)}
                                            />
                                            <button
                                                onClick={handleEditSave}
                                                className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingId(null)
                                                    setEditValue("")
                                                }}
                                                className="ml-2 bg-gray-400 text-white px-2 py-1 rounded"
                                            >
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        obs.observation
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-800">{obs.campo}</td>
                                <td className="px-6 py-4 text-gray-800">{new Date(obs.created_at).toLocaleString()}</td>
                                <td className="px-6 py-4 text-gray-800">{obs.especie}</td>
                                <td className="px-6 py-4 text-center font-bold">
                                    {obs.aprobado ? (
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Resuelto</span>
                                    ) : (
                                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Pendiente</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 flex justify-center space-x-4">
                                    <button
                                        onClick={() => handleEdit(obs.id)}
                                        className="text-blue-500 hover:text-blue-700 transition"
                                    >
                                        <Pencil size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(obs.id)}
                                        className="text-red-500 hover:text-red-700 transition"
                                    >
                                        <Trash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredObservations.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-6 text-center text-gray-500">
                                    No hay observaciones disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Controles de paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-3">
                    <button
                        className="ub-button-outline"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span className="mx-2 ub-text-primary font-medium">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        className="ub-button-outline"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    )
}
