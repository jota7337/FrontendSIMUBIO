import { useNavigate } from "react-router-dom"
import SpeciesDetailsDialog from "./especiedialog"
import ComentariosDialog from "./comentariosdialog"
import { getEspecies, deleteEspecie, getEspecieByUser } from "../../apis/Especie"
import { getComentariosByEspecie, updateComentario } from "../../apis/Comentarios"
import { useEffect, useState } from "react"

const ListEspecies = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [filterCatalog, setFilterCatalog] = useState("")
    const [filterMunicipio, setFilterMunicipio] = useState("")
    const [filterReferencia, setFilterReferencia] = useState("")
    const [filterOrden, setFilterOrden] = useState("")
    const [filterFamilia, setFilterFamilia] = useState("")
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
        await updateComentario(comentario.id, comentario.cuerpo, true, comentario.campo)
        setComentariosDialogList((list) => list.map((c) => (c.id === comentario.id ? { ...c, aprobado: true } : c)))
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const { data: especies, error } = await getEspecieByUser()
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

    // Handlers para los filtros
    const handleFilterCatalog = (e) => setFilterCatalog(e.target.value)
    const handleFilterMunicipio = (e) => setFilterMunicipio(e.target.value)
    const handleFilterReferencia = (e) => setFilterReferencia(e.target.value)
    const handleFilterOrden = (e) => setFilterOrden(e.target.value)
    const handleFilterFamilia = (e) => setFilterFamilia(e.target.value)

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

    // Filtrar datos por búsqueda y filtros
    const filteredData = data.filter((item) => {
        const matchesSearch = (item.scientificName || item.nombre || "").toLowerCase().includes(search.toLowerCase())
        const matchesCatalog =
            filterCatalog === "" || (item.catalogNumber || "").toLowerCase().includes(filterCatalog.toLowerCase())
        const matchesMunicipio =
            filterMunicipio === "" || (item.country || "").toLowerCase().includes(filterMunicipio.toLowerCase())
        //  const matchesReferencia = filterReferencia === "" || (item.referencia || "").toLowerCase().includes(filterReferencia.toLowerCase())
        const matchesOrden =
            filterOrden === "" || (item.order || item.orden || "").toLowerCase().includes(filterOrden.toLowerCase())
        const matchesFamilia =
            filterFamilia === "" || (item.family || item.familia || "").toLowerCase().includes(filterFamilia.toLowerCase())
        return matchesSearch && matchesCatalog && matchesMunicipio && matchesOrden && matchesFamilia
    })

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
        <div className="w-full p-6 ub-container min-h-screen">
            <div className="ub-card p-6">
                <h2 className="ub-title mb-6 text-center">Registros de Especies</h2>
                {/* Filtros iniciales */}
                <div className="mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    <input
                        type="text"
                        placeholder="Filtrar catálogo..."
                        value={filterCatalog}
                        onChange={handleFilterCatalog}
                        className="ub-input"
                    />
                    <input
                        type="text"
                        placeholder="Filtrar municipio..."
                        value={filterMunicipio}
                        onChange={handleFilterMunicipio}
                        className="ub-input"
                    />
                    <input
                        type="text"
                        placeholder="Filtrar referencia..."
                        value={filterReferencia}
                        onChange={handleFilterReferencia}
                        className="ub-input"
                    />
                    <input
                        type="text"
                        placeholder="Filtrar orden..."
                        value={filterOrden}
                        onChange={handleFilterOrden}
                        className="ub-input"
                    />
                    <input
                        type="text"
                        placeholder="Filtrar familia..."
                        value={filterFamilia}
                        onChange={handleFilterFamilia}
                        className="ub-input"
                    />
                    <input
                        type="text"
                        placeholder="Buscar por nombre científico..."
                        value={search}
                        onChange={handleSearch}
                        className="ub-input"
                    />
                </div>
                <div className="mb-4 flex justify-end">
                    <button className="ub-button-primary" onClick={handleAddClick}>
                        Agregar Registro
                    </button>
                </div>
                <div className="ub-card overflow-hidden">
                    <table className="w-full">
                        <thead className="ub-table-header">
                            <tr>
                                <th className="text-left p-3 font-semibold">Catálogo</th>
                                <th className="text-left p-3 font-semibold">Nombre científico</th>
                                <th className="text-left p-3 font-semibold">Lugar</th>
                                <th className="text-left p-3 font-semibold">Orden</th>
                                <th className="text-left p-3 font-semibold">Familia</th>
                                <th className="text-left p-3 font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center p-4 ub-text-muted">
                                        Cargando...
                                    </td>
                                </tr>
                            ) : filteredData.length > 0 ? (
                                paginatedData.map((item, index) => (
                                    <tr key={item.id || index} className="ub-table-row">
                                        <td className="p-3 ub-text-primary">{item.catalogNumber}</td>
                                        <td className="p-3 ub-text-primary font-medium">{item.scientificName || item.nombre}</td>
                                        <td className="p-3 ub-text-secondary">{item.country || item.pais || item.lugar}</td>
                                        <td className="p-3 ub-text-secondary">{item.order || item.orden}</td>
                                        <td className="p-3 ub-text-secondary">{item.family || item.familia}</td>
                                        <td className="p-3 flex gap-2 items-center">
                                            <span
                                                title="Ver Detalles"
                                                className="cursor-pointer text-green-600 text-xl hover:text-green-800"
                                                onClick={(e) => handleViewDetailsClick(e, item)}
                                            >
                                                🛈
                                            </span>
                                            <span
                                                title="Editar"
                                                className="cursor-pointer text-yellow-600 text-xl hover:text-yellow-800"
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
                                                className="cursor-pointer text-green-700 text-xl flex items-center gap-1"
                                                onClick={(e) => handleComentariosClick(e, item)}
                                            >
                                                💬
                                                <span className="ub-badge-info">
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
                                    <td colSpan="6" className="text-center p-4 ub-text-muted">
                                        No se encontraron resultados
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
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        <span className="mx-2 ub-text-primary font-medium">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            className="ub-button-outline"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Siguiente
                        </button>
                    </div>
                )}
                <SpeciesDetailsDialog isOpen={isDialogOpen} onClose={handleCloseDialog} species={selectedSpecies} />
            </div>
        </div>
    )
}
export default ListEspecies
