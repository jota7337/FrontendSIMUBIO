import { useState, useEffect } from "react"
import { useWindowSize } from "../../lib/useWindowSize"
import { assignCatalogNumber } from "../../apis/curadores"
import { getReferencesByUser, getReferencias } from "../../apis/reference"
import { getEspecieByReference, updateEstadoEspecie, deleteEspecie } from "../../apis/Especie"
import { getUsuarioPorId } from "../../apis/usuarios"
// Opciones de estado disponibles
const ESTADOS_ESPECIE = [
    { id: 1, code: "apr", label: "Aprobada" },
    { id: 2, code: "re", label: "En revisión" },
    { id: 3, code: "des", label: "Desaprobada" },
]
import { useNavigate } from "react-router-dom"

const SpeciesCatalog = () => {
    // Filtro y orden
    const [catalogFilter, setCatalogFilter] = useState("")
    const [orderDesc, setOrderDesc] = useState(false)
    // Filtros adicionales
    const [estadoFilter, setEstadoFilter] = useState("")
    const [ordenFilter, setOrdenFilter] = useState("")
    const [familiaFilter, setFamiliaFilter] = useState("")
    const [lugarFilter, setLugarFilter] = useState("")
    const [estadoEditandoId, setEstadoEditandoId] = useState(null)
    const [nuevoEstadoId, setNuevoEstadoId] = useState("")
    const [loadingEstado, setLoadingEstado] = useState(false)
    // Abrir selector de estado para una especie
    const handleEstadoEditClick = (id) => {
        setEstadoEditandoId(id)
        setNuevoEstadoId("")
    }

    // Cancelar edición de estado
    const handleCancelEstadoEdit = () => {
        setEstadoEditandoId(null)
        setNuevoEstadoId("")
    }

    // Guardar nuevo estado
    const handleSaveEstado = async (especieId) => {
        if (!nuevoEstadoId) return
        setLoadingEstado(true)
        const res = await updateEstadoEspecie(especieId, nuevoEstadoId)
        setLoadingEstado(false)
        if (!res.error) {
            setSpecies((prev) =>
                prev.map((s) =>
                    s.id === especieId
                        ? { ...s, estado_especie: ESTADOS_ESPECIE.find((e) => e.id === parseInt(nuevoEstadoId)) }
                        : s
                )
            )
            setEstadoEditandoId(null)
            setNuevoEstadoId("")
        } else {
            alert("Error al actualizar estado")
        }
    }
    const [references, setReferences] = useState([])
    const [selectedReference, setSelectedReference] = useState(null)
    const [species, setSpecies] = useState([])
    const [showAssignDialog, setShowAssignDialog] = useState(false)
    const [assignCatalogSpecies, setAssignCatalogSpecies] = useState(null)
    const [catalogInput, setCatalogInput] = useState("")
    const [loadingAssign, setLoadingAssign] = useState(false)
    // Último número de catálogo registrado
    const getLastCatalogNumber = () => {
        // Filtrar los catalogNumber válidos que terminen con 6 dígitos (MCUB-R-NE-000380, MCUB-R-RE-000380, MCUB-R-MY-000380, etc.)
        const numbers = species
            .map((s) => s.catalogNumber)
            .filter((cn) => typeof cn === "string" && /\d{6}$/.test(cn))
            .map((cn) => {
                const match = cn.match(/(\d{6})$/)
                return match ? parseInt(match[1], 10) : null
            })
            .filter((num) => num !== null && !isNaN(num))
        if (numbers.length === 0) return null
        return Math.max(...numbers)
    }
    const lastCatalogNumber = getLastCatalogNumber()

    const handleAssignCatalogClick = (species) => {
        setAssignCatalogSpecies(species)
        setCatalogInput(species?.catalogNumber || "")
        setShowAssignDialog(true)
    }

    const handleCloseAssignDialog = () => {
        setShowAssignDialog(false)
        setAssignCatalogSpecies(null)
        setCatalogInput("")
    }

    const handleAssignSubmit = async (e) => {
        e.preventDefault()
        if (!assignCatalogSpecies || !catalogInput) return
        setLoadingAssign(true)
        const updated = await assignCatalogNumber(assignCatalogSpecies.id, catalogInput)
        setLoadingAssign(false)
        if (updated) {
            setSpecies((prev) => prev.map((s) => (s.id === updated.id ? { ...s, catalogNumber: updated.catalogNumber } : s)))
            handleCloseAssignDialog()
        } else {
            alert("Error al asignar catalogNumber o esta ya en uso")
        }
    }
    const navigate = useNavigate()
    const handleEditClick = (e, species) => {
        e.stopPropagation()
        // Excluir estado_especie
        const { estado_especie, ...speciesData } = species

        navigate("/form", { state: { species: { ...speciesData }, mode: "curador", fromCatalog: true } })
    }

    const handleDeleteClick = async (e, speciesId) => {
        e.stopPropagation()

        // Confirmar eliminación
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta especie? Esta acción no se puede deshacer.")) {
            return
        }

        try {
            const { error } = await deleteEspecie(speciesId)
            if (error) {
                alert("Error al eliminar la especie")
                console.error("Error:", error)
            } else {
                // Actualizar la lista de especies eliminando la especie borrada
                setSpecies((prevSpecies) => prevSpecies.filter((s) => s.id !== speciesId))
                alert("Especie eliminada correctamente")
            }
        } catch (error) {
            console.error("Error al eliminar especie:", error)
            alert("Error al eliminar la especie")
        }
    }

    async function fetchReferences() {
        try {
            // Obtener información del usuario actual
            const { data: userData } = await getUsuarioPorId()
            const userRole = userData?.roles?.name

            // Si es administrador, traer todas las referencias
            if (userRole === "Administrador") {
                const allReferences = await getReferencias()
                // Transformar el formato para que sea compatible con el componente
                const transformedReferences = allReferences.map((ref) => ({
                    id: ref.id,
                    referencia: ref.referencia,
                }))
                setReferences(transformedReferences)
            } else {
                // Si no es administrador, traer solo las referencias del usuario
                const data = await getReferencesByUser()
                setReferences(data)
            }
        } catch (error) {
            console.error("Error al obtener referencias:", error)
            setReferences([])
        }
    }
    useEffect(() => {
        fetchReferences()
    }, [])

    useEffect(() => {
        if (!selectedReference) return setSpecies([])
        async function fetchSpecies() {
            const data = await getEspecieByReference(selectedReference)
            setSpecies(data || [])
        }
        fetchSpecies()
    }, [selectedReference])

    const getStatusEmoji = (status) => {
        if (!status) return "⚪ Sin estado"
        const normalized = status.toLowerCase()
        switch (normalized) {
            case "apr":
                return "🟢 Aprobada"
            case "re":
                return "🟡 En revisión"
            case "des":
                return "🔴 Desaprobada"
            default:
                return `⚪ ${status}`
        }
    }

    // Filtrar y ordenar especies
    const filteredSpecies = species
        .filter((item) => {
            // Filtro por catalogNumber
            if (catalogFilter && !(item.catalogNumber && item.catalogNumber.toString().includes(catalogFilter))) return false
            // Filtro por estado
            if (estadoFilter && (!item.estado_especie || item.estado_especie.code !== estadoFilter)) return false
            // Filtro por orden
            if (ordenFilter && !(item.order || item.orden || "").toString().toLowerCase().includes(ordenFilter.toLowerCase()))
                return false
            // Filtro por familia
            if (
                familiaFilter &&
                !(item.family || item.familia || "").toString().toLowerCase().includes(familiaFilter.toLowerCase())
            )
                return false
            // Filtro por lugar
            if (
                lugarFilter &&
                !(item.country || item.pais || item.lugar || "").toString().toLowerCase().includes(lugarFilter.toLowerCase())
            )
                return false
            return true
        })
        .sort((a, b) => {
            const aNum = parseInt(a.catalogNumber) || 0
            const bNum = parseInt(b.catalogNumber) || 0
            return orderDesc ? bNum - aNum : aNum - bNum
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
    const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage)
    const paginatedSpecies = filteredSpecies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    useEffect(() => {
        setCurrentPage(1)
    }, [itemsPerPage])

    return (
        <div className="p-4">
            {/* Botón para abrir el diálogo de asignar catalogNumber */}
            <div className="mb-4"></div>
            <div className="flex gap-2 mb-4 flex-wrap">
                {references.map((ref) => (
                    <button
                        key={ref.id}
                        onClick={() => setSelectedReference(ref.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                            selectedReference === ref.id ? "bg-green-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
                        }`}
                    >
                        {ref.referencia}
                    </button>
                ))}
            </div>
            {selectedReference && species.length > 0 ? (
                <div className="overflow-x-auto">
                    <div className="mb-4 flex gap-4 items-center flex-wrap">
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            placeholder="Filtrar por catalogNumber"
                            value={catalogFilter}
                            onChange={(e) => setCatalogFilter(e.target.value)}
                        />
                        <select
                            className="border rounded px-2 py-1"
                            value={estadoFilter}
                            onChange={(e) => setEstadoFilter(e.target.value)}
                        >
                            <option value="">Estado</option>
                            {ESTADOS_ESPECIE.map((e) => (
                                <option key={e.code} value={e.code}>
                                    {e.label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            placeholder="Orden"
                            value={ordenFilter}
                            onChange={(e) => setOrdenFilter(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            placeholder="Familia"
                            value={familiaFilter}
                            onChange={(e) => setFamiliaFilter(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            placeholder="Lugar"
                            value={lugarFilter}
                            onChange={(e) => setLugarFilter(e.target.value)}
                        />
                        <button className="px-2 py-1 bg-gray-200 rounded border" onClick={() => setOrderDesc((o) => !o)}>
                            Ordenar {orderDesc ? "↓" : "↑"}
                        </button>
                    </div>
                    <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="text-left p-3">Catálogo</th>
                                <th className="text-left p-3">Nombre científico</th>
                                <th className="text-left p-3">Lugar</th>
                                <th className="text-left p-3">Orden</th>
                                <th className="text-left p-3">Familia</th>
                                <th className="px-4 py-2 border">Estado</th>
                                <th className="px-4 py-2 border">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedSpecies.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-3">{item.catalogNumber}</td>
                                    <td className="p-3">{item.scientificName || item.nombre}</td>
                                    <td className="p-3">{item.country || item.pais || item.lugar}</td>
                                    <td className="p-3">{item.order || item.orden}</td>
                                    <td className="p-3">{item.family || item.familia}</td>
                                    <td className="px-4 py-2 border font-bold">
                                        {estadoEditandoId === item.id ? (
                                            <div className="flex flex-col gap-2">
                                                <select
                                                    className="border rounded px-2 py-1"
                                                    value={nuevoEstadoId}
                                                    onChange={(e) => setNuevoEstadoId(e.target.value)}
                                                    disabled={loadingEstado}
                                                >
                                                    <option value="">Selecciona estado</option>
                                                    {ESTADOS_ESPECIE.map((e) => (
                                                        <option key={e.id} value={e.id}>
                                                            {e.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="px-2 py-1 bg-green-600 text-white rounded"
                                                        onClick={() => handleSaveEstado(item.id)}
                                                        disabled={loadingEstado || !nuevoEstadoId}
                                                    >
                                                        {loadingEstado ? "Guardando..." : "Guardar"}
                                                    </button>
                                                    <button
                                                        className="px-2 py-1 bg-gray-300 rounded"
                                                        onClick={handleCancelEstadoEdit}
                                                        disabled={loadingEstado}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {getStatusEmoji(item.estado_especie?.code)}
                                                <button
                                                    className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                                                    onClick={() => handleEstadoEditClick(item.id)}
                                                >
                                                    Cambiar estado
                                                </button>
                                            </>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border flex flex-col gap-2">
                                        <button
                                            className="px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                                            onClick={(e) => handleEditClick(e, item)}
                                        >
                                            Revisar especie
                                        </button>
                                        <button
                                            className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition"
                                            onClick={() => handleAssignCatalogClick(item)}
                                        >
                                            Asignar catalogNumber
                                        </button>
                                        <button
                                            className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
                                            onClick={(e) => handleDeleteClick(e, item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
            ) : selectedReference ? (
                <p className="text-gray-500">No hay especies para esta referencia.</p>
            ) : (
                <p className="text-gray-500">Selecciona una referencia para ver los datos.</p>
            )}

            {/* Diálogo para asignar catalogNumber */}
            {showAssignDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px]">
                        <h2 className="text-lg font-bold mb-4">Asignar catalogNumber</h2>
                        {/* Mostrar el último catalogNumber registrado */}
                        <div className="mb-2">
                            <span className="font-semibold text-blue-700">
                                {lastCatalogNumber && species[0]?.reference?.catalogNumber
                                    ? `Este es el último catálogo registrado: ${species[0].reference.catalogNumber}${lastCatalogNumber.toString().padStart(6, "0")}`
                                    : `No hay catálogo registrado aún su catalogo base es : ${species[0]?.reference?.catalogNumber || "MCUB-R-NE-"}`}
                            </span>
                        </div>
                        {assignCatalogSpecies ? (
                            <div className="mb-2">
                                <div className="mb-2">
                                    Catálogo actual:{" "}
                                    <span className="font-semibold">{assignCatalogSpecies.catalogNumber || "Sin catálogo"}</span>
                                </div>
                                <div className="mb-2">
                                    Nombre científico:{" "}
                                    <span className="font-semibold">{assignCatalogSpecies.scientificName}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-2">Selecciona una especie para asignar el catálogo.</div>
                        )}
                        <form onSubmit={handleAssignSubmit}>
                            <input
                                type="text"
                                placeholder="Nuevo catalogNumber"
                                className="border px-2 py-1 rounded w-full mb-4"
                                value={catalogInput}
                                onChange={(e) => setCatalogInput(e.target.value)}
                                disabled={loadingAssign}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded"
                                    onClick={handleCloseAssignDialog}
                                    disabled={loadingAssign}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                    disabled={loadingAssign || !catalogInput}
                                >
                                    {loadingAssign ? "Asignando..." : "Asignar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SpeciesCatalog
