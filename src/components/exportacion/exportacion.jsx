import { useState, useEffect } from "react"
import { useWindowSize } from "../../lib/useWindowSize"
import { FileText, FileSpreadsheet, Upload } from "lucide-react"
import { getReferences } from "../../apis/reference"
import { createEspeciesBatch, getEspecieByReference } from "../../apis/Especie"
import { processAndInsertEspecies } from "../../lib/excel-especies-logic"
import { supabase } from "../../supabase/client"
import { exportEspeciesWithTemplate } from "../../lib/table-especie-logic"
import { exportDarwinCoreTSV } from "../../lib/export_tab_logic"

const ExportEspecie = () => {
    const [referenceObservations, setReferenceObservations] = useState([])
    // Paginación responsiva
    const { breakpoint } = useWindowSize()
    let itemsPerPage = 20
    if (breakpoint === "xs") itemsPerPage = 5
    else if (breakpoint === "sm") itemsPerPage = 8
    else if (breakpoint === "md") itemsPerPage = 12
    else if (breakpoint === "lg") itemsPerPage = 16
    // xl = 20
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(referenceObservations.length / itemsPerPage)
    const paginatedReferences = referenceObservations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    useEffect(() => {
        setCurrentPage(1)
    }, [itemsPerPage])
    const [uploadLog, setUploadLog] = useState("")
    const [uploading, setUploading] = useState(false)
    const [dateRanges, setDateRanges] = useState({})
    const [showRefDialog, setShowRefDialog] = useState(false)
    const [references, setReferences] = useState([])
    const [selectedRefId, setSelectedRefId] = useState("")

    const handleDateChange = (referencia, type, value) => {
        setDateRanges((prev) => ({
            ...prev,
            [referencia]: {
                ...prev[referencia],
                [type]: value,
            },
        }))
    }

    const handleExport = (id, referencia) => {
        const startDate = dateRanges[referencia]?.startDate || null
        const endDate = dateRanges[referencia]?.endDate || null
        if (!startDate && !endDate) {
            exportEspeciesWithTemplate(id)
            return
        }

        exportEspeciesWithTemplate(id, startDate, endDate)
    }

    const handleUploadExcel = async () => {
        // Mostrar el diálogo de selección de referencia antes de abrir el input
        setShowRefDialog(true)
        if (references.length === 0) {
            const refs = await getReferences()
            setReferences(refs)
        }
    }

    // Lógica para abrir el input de archivo después de seleccionar la referencia
    const handleSelectReference = () => {
        if (!selectedRefId) return
        setShowRefDialog(false)
        setTimeout(() => {
            openFileInputWithReference(selectedRefId)
        }, 200)
    }

    // Nueva lógica: usa processAndInsertEspecies y agrega reference_by a cada fila
    const openFileInputWithReference = (refId) => {
        setUploading(true)
        setUploadLog("📂 Selecciona un archivo Excel...")
        const input = document.createElement("input")
        input.type = "file"
        input.accept = ".xlsx,.xls,.csv"
        input.onchange = async (e) => {
            const file = e.target.files?.[0]
            if (!file) {
                setUploadLog("Operación cancelada.")
                setUploading(false)
                return
            }
            try {
                setUploadLog("⏳ Procesando archivo...")
                // Usar processAndInsertEspecies, agregando reference_by a cada fila
                const result = await processAndInsertEspecies(file, {
                    supabase,
                    sheetName: "Plantilla", // nombre de la hoja, minúscula
                    batchSize: 200,
                    getUserId: async () => {
                        const { data, error } = await supabase.auth.getUser()
                        if (error) throw error
                        const userId = data?.user?.id
                        if (!userId) throw new Error("No hay usuario autenticado.")
                        return userId
                    },
                    referenceId: refId,
                })

                // Agregar reference_by a cada fila antes de insertar (esto requiere modificar excel-especies-logic.js si quieres hacerlo dentro de la función)
                // Aquí, como processAndInsertEspecies ya inserta, solo mostramos el log y ejemplo
                setUploadLog(
                    `✔ Insertadas ${result.inserted} filas en public.especies.\nEjemplo:\n${JSON.stringify(
                        result.previewSample.map((r) => ({ ...r, reference_by: refId })),
                        null,
                        2
                    )}`
                )
                await fetchAllObservations()
            } catch (err) {
                setUploadLog("✖ Error: " + err.message)
            } finally {
                setUploading(false)
            }
        }
        input.click()
    }

    async function fetchAllObservations() {
        const references = await getReferences()
        const allData = []
        for (const ref of references) {
            const especies = await getEspecieByReference(ref.id)
            if (Array.isArray(especies) && especies.length > 0) {
                const obs = especies.map((item, idx) => ({
                    id: item.id || idx,
                    reference: ref.referencia,
                    name: item.scientificName || item.nombre || "-",
                    observation: item.observation || item.occurrenceRemarks || "-",
                }))
                allData.push({ referencia: ref.referencia, observations: obs, reference_by: ref.id })
            }
        }
        setReferenceObservations(allData)
    }

    useEffect(() => {
        fetchAllObservations()
    }, [])

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold mb-4">Exportar Observaciones por colección</h2>
                <button
                    className="flex items-center bg-indigo-600 text-white px-3 py-1 rounded-lg disabled:opacity-50"
                    onClick={handleUploadExcel}
                    disabled={uploading}
                    title="Subir Excel a public.especies"
                >
                    <Upload className="w-4 h-4 mr-1" />
                    {uploading ? "Procesando..." : "Cargar Excel a especies"}
                </button>
            </div>

            {/* Diálogo para seleccionar referencia antes de abrir el input de archivo */}
            {showRefDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg min-w-[350px]">
                        <h2 className="text-lg font-bold mb-4">Selecciona una referencia</h2>
                        <select
                            className="w-full border px-2 py-2 rounded mb-4"
                            value={selectedRefId}
                            onChange={(e) => setSelectedRefId(e.target.value)}
                        >
                            <option value="">Selecciona una referencia...</option>
                            {references.map((ref) => (
                                <option key={ref.id} value={ref.id}>
                                    {ref.referencia} {ref.catalogNumber ? `(${ref.catalogNumber})` : ""}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => {
                                    setShowRefDialog(false)
                                    setSelectedRefId("")
                                }}
                                disabled={uploading}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded"
                                onClick={handleSelectReference}
                                disabled={!selectedRefId || uploading}
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {uploadLog && <pre className="mb-6 p-3 bg-white rounded-lg border text-sm whitespace-pre-wrap">{uploadLog}</pre>}

            {paginatedReferences.map((ref) => (
                <div key={ref.referencia} className="mb-6 bg-white shadow-md rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-700">{ref.referencia}</h3>
                        <div className="flex gap-2">
                            <button
                                className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg"
                                onClick={() => exportDarwinCoreTSV(ref.reference_by)}
                            >
                                <FileText className="w-4 h-4 mr-1" /> Exportar Tabulaciones
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <input
                            type="date"
                            value={dateRanges[ref.referencia]?.startDate || ""}
                            onChange={(e) => handleDateChange(ref.referencia, "startDate", e.target.value)}
                            className="border p-2"
                        />
                        <input
                            type="date"
                            value={dateRanges[ref.referencia]?.endDate || ""}
                            onChange={(e) => handleDateChange(ref.referencia, "endDate", e.target.value)}
                            className="border p-2"
                        />

                        <button
                            onClick={() => handleExport(ref.reference_by)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                        >
                            <FileSpreadsheet className="w-5 h-5" />
                            <span>Exportar Excel</span>
                        </button>
                    </div>
                </div>
            ))}

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

export default ExportEspecie
