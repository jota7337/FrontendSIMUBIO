import { useNavigate } from "react-router-dom"
import SpeciesDetailsDialog from "./especiedialog"
import ComentariosDialog from "./comentariosdialog"
import { getEspecies, deleteEspecie } from "../../apis/Especie"
import { getComentariosByEspecie, updateComentario } from "../../apis/Comentarios"
import { useEffect, useState } from "react"

const ListEspecies = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [selectedSpecies, setSelectedSpecies] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [comentariosCount, setComentariosCount] = useState({})
    const [comentariosDialogOpen, setComentariosDialogOpen] = useState(false)
    const [comentariosDialogList, setComentariosDialogList] = useState([])
    const [comentariosDialogSpecies, setComentariosDialogSpecies] = useState(null)
    // Abrir el diálogo de comentarios
    const handleComentariosClick = async (e, species) => {
        e.stopPropagation()
        setComentariosDialogSpecies(species)
        const comentarios = await getComentariosByEspecie(species.id)
        setComentariosDialogList(comentarios)
        setComentariosDialogOpen(true)
    }
    // Marcar comentario como hecho (aprobado)
    const handleComentarioHecho = async (comentario) => {
        if (comentario.aprobado) return
        await updateComentario(comentario.id, comentario.cuerpo, true)
        setComentariosDialogList((list) => list.map((c) => (c.id === comentario.id ? { ...c, aprobado: true } : c)))
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const { data: especies, error } = await getEspecies()
            if (!error && Array.isArray(especies)) {
                setData(especies)

                const counts = {}
                for (const especie of especies) {
                    if (especie.id) {
                        const comentarios = await getComentariosByEspecie(especie.id)
                        counts[especie.id] = comentarios.length
                    }
                }
                setComentariosCount(counts)
            } else {
                setData([])
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        setSelectedSpecies(null)
    }

    const handleAddClick = () => {
        navigate("/form", { state: { species: null, mode: "add" } })
    }

    const handleEditClick = (e, species) => {
        e.stopPropagation()

        navigate("/form", { state: { species: { ...species }, mode: "edit" } })
    }

    const handleDeleteClick = async (e, species) => {
        e.stopPropagation()
        if (window.confirm(`¿Seguro que deseas eliminar ${species.scientificName || species.nombre}?`)) {
            await deleteEspecie(species.id)
            setData((prev) => prev.filter((item) => item.id !== species.id))
        }
    }

    const handleViewDetailsClick = (e, species) => {
        e.stopPropagation()
        setSelectedSpecies(species)
        setIsDialogOpen(true)
    }

    // Filtrar datos por búsqueda
    const filteredData = data.filter((item) =>
        (item.scientificName || item.nombre || "").toLowerCase().includes(search.toLowerCase())
    )

    // Paginación
    const itemsPerPage = 20
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    return (
        <div>
            <div className="w-full p-4">
                <h2 className="text-2xl font-bold mb-4">Registros de Especies</h2>
                <div className="mb-4 flex justify-between">
                    <input
                        type="text"
                        placeholder="Buscar por nombre científico..."
                        value={search}
                        onChange={handleSearch}
                        className="border p-2 rounded w-1/3"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleAddClick} // Use handleAddClick
                    >
                        Agregar Registro
                    </button>
                </div>
                <table className="w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="text-left p-3">Nombre científico</th>
                            <th className="text-left p-3">Área o país</th>
                            <th className="text-left p-3">Coordenadas</th>
                            <th className="text-left p-3">Año</th>
                            <th className="text-left p-3">Base del registro</th>
                            <th className="text-left p-3">Conjunto de datos</th>
                            <th className="text-left p-3">Publicador</th>
                            <th className="text-left p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8" className="text-center p-4 text-gray-500">
                                    Cargando...
                                </td>
                            </tr>
                        ) : filteredData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <tr key={item.id || index} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{item.scientificName || item.nombre}</td>
                                    <td className="p-3">{item.country || item.pais}</td>
                                    <td className="p-3">
                                        {item.coordenadas || item.decimalLatitude + ", " + item.decimalLongitude || "-"}
                                    </td>
                                    <td className="p-3">{item.year || item.anio || "-"}</td>
                                    <td className="p-3">{item.basisOfRecord || item.base}</td>
                                    <td className="p-3">{item.datasetName || item.conjunto}</td>
                                    <td className="p-3">{item.rightsHolder || item.publicador}</td>
                                    <td className="p-3 flex gap-2 items-center">
                                        <span
                                            title="Ver Detalles"
                                            className="cursor-pointer text-blue-500 text-xl hover:text-blue-700"
                                            onClick={(e) => handleViewDetailsClick(e, item)}
                                        >
                                            🛈
                                        </span>
                                        <span
                                            title="Editar"
                                            className="cursor-pointer text-green-500 text-xl hover:text-green-700"
                                            onClick={(e) => handleEditClick(e, item)}
                                        >
                                            ✏️
                                        </span>
                                        <span
                                            title="Eliminar"
                                            className="cursor-pointer text-red-500 text-xl hover:text-red-700"
                                            onClick={(e) => handleDeleteClick(e, item)}
                                        >
                                            🗑️
                                        </span>
                                        <span
                                            title="Comentarios de la especie"
                                            className="cursor-pointer text-yellow-600 text-xl flex items-center gap-1"
                                            onClick={(e) => handleComentariosClick(e, item)}
                                        >
                                            💬
                                            <span className="text-xs font-bold bg-gray-200 rounded px-2 py-1">
                                                {comentariosCount[item.id] || 0}
                                            </span>
                                        </span>
                                        {/* Diálogo de comentarios como componente */}
                                        <ComentariosDialog
                                            isOpen={comentariosDialogOpen}
                                            onClose={() => setComentariosDialogOpen(false)}
                                            species={comentariosDialogSpecies}
                                            comentarios={comentariosDialogList}
                                            onHecho={handleComentarioHecho}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center p-4 text-gray-500">
                                    No se encontraron resultados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Controles de paginación */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-4 gap-2">
                        <button
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        <span className="mx-2">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Siguiente
                        </button>
                    </div>
                )}
            </div>
            <SpeciesDetailsDialog isOpen={isDialogOpen} onClose={handleCloseDialog} species={selectedSpecies} />
        </div>
    )
}

export default ListEspecies
