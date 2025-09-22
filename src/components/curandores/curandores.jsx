import { useState, useEffect } from "react"
import { assignCatalogNumber } from "../../apis/curadores"
import { getReferencesByUser } from "../../apis/reference"
import { getEspecieByReference } from "../../apis/Especie"
import { useNavigate } from "react-router-dom"

const SpeciesCatalog = () => {
    const [references, setReferences] = useState([])
    const [selectedReference, setSelectedReference] = useState(null)
    const [species, setSpecies] = useState([])
    const [showAssignDialog, setShowAssignDialog] = useState(false)
    const [assignCatalogSpecies, setAssignCatalogSpecies] = useState(null)
    const [catalogInput, setCatalogInput] = useState("")
    const [loadingAssign, setLoadingAssign] = useState(false)

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
        console.log("Datos enviados al formulario (curador):", { species: { ...speciesData }, mode: "curador" })
        navigate("/form", { state: { species: { ...speciesData }, mode: "curador", fromCatalog: true } })
    }

    async function fetchReferences() {
        const data = await getReferencesByUser()
        setReferences(data)
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
                    <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-4 py-2 border"># Catálogo</th>
                                <th className="px-4 py-2 border">Nombre científico</th>
                                <th className="px-4 py-2 border">Área o país</th>
                                <th className="px-4 py-2 border">Latitud</th>
                                <th className="px-4 py-2 border">Longitud</th>
                                <th className="px-4 py-2 border">Año</th>
                                <th className="px-4 py-2 border">Base del registro</th>
                                <th className="px-4 py-2 border">Conjunto de datos</th>
                                <th className="px-4 py-2 border">Publicador</th>
                                <th className="px-4 py-2 border">Estado</th>
                                <th className="px-4 py-2 border">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {species.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{item.catalogNumber}</td>
                                    <td className="px-4 py-2 border">{item.scientificName}</td>
                                    <td className="px-4 py-2 border">{item.country}</td>
                                    <td className="px-4 py-2 border">{item.decimalLatitude}</td>
                                    <td className="px-4 py-2 border">{item.decimalLongitude}</td>
                                    <td className="px-4 py-2 border">{item.year}</td>
                                    <td className="px-4 py-2 border">{item.recordBasis}</td>
                                    <td className="px-4 py-2 border">{item.datasetName}</td>
                                    <td className="px-4 py-2 border">{item.publisher}</td>
                                    <td className="px-4 py-2 border font-bold">{getStatusEmoji(item.estado_especie?.code)}</td>
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
