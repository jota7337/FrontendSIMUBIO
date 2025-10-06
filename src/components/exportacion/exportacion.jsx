import { useState, useEffect } from "react"
import { FileText, FileSpreadsheet, Upload } from "lucide-react"
import { getReferences } from "../../apis/reference"
import { createEspeciesBatch, getEspecieByReference } from "../../apis/Especie"
import { parseExcelToEspeciesRows } from "../../lib/excel-especies-logic"
import { supabase } from "../../supabase/client"
import { exportEspeciesWithTemplate } from "../../lib/table-especie-logic"
import { exportDarwinCoreTSV } from "../../lib/export_tab_logic"

const ExportEspecie = () => {
    const [referenceObservations, setReferenceObservations] = useState([])
    const [uploadLog, setUploadLog] = useState("")
    const [uploading, setUploading] = useState(false)
    const [dateRanges, setDateRanges] = useState({})

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
        try {
            setUploading(true)
            setUploadLog("Selecciona un archivo Excel...")

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
                    setUploadLog("Leyendo y transformando archivo...")
                    // 1) Parsear a filas con columnas válidas
                    const rows = await parseExcelToEspeciesRows(file, "Plantilla")
                    // 2) Obtener userId con tu supabase
                    const { data, error } = await supabase.auth.getUser()
                    if (error) throw error
                    const userId = data?.user?.id
                    if (!userId) throw new Error("No hay usuario autenticado.")

                    // 3) Insertar en lote usando tu API (sin crear cliente aquí)
                    const { count } = await createEspeciesBatch(rows, userId)

                    setUploadLog(`Insertadas ${count} filas en public.especies.`)
                    // 4) Refrescar la lista para que se vea actualizado
                    await fetchAllObservations()
                } catch (err) {
                    setUploadLog("✖ Error: " + err.message)
                } finally {
                    setUploading(false)
                }
            }

            input.click()
        } catch (err) {
            setUploadLog("✖ Error: " + err.message)
            setUploading(false)
        }
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

            {uploadLog && <pre className="mb-6 p-3 bg-white rounded-lg border text-sm whitespace-pre-wrap">{uploadLog}</pre>}

            {referenceObservations.map((ref) => (
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
        </div>
    )
}

export default ExportEspecie
