import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import { supabase } from "../supabase/client"

export async function exportEspeciesWithTemplate(id, startDate, endDate) {
    let query = supabase.from("especies").select("*").eq("reference_by", id).eq("estado", 1)
    if (startDate && endDate) {
        query = query.gte("created_at", startDate).lte("created_at", endDate)
    }

    const { data, error } = await query

    if (error) {
        console.error("Error consultando especies:", error)
        alert("Error al consultar datos en Supabase")
        return
    }

    if (!data || data.length === 0) {
        alert("No hay registros en la tabla especies para el rango dado.")
        return
    }

    // 2. Cargar la plantilla original desde /public
    const response = await fetch("/plantillla.xlsx")
    const arrayBuffer = await response.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { type: "array", cellStyles: true })

    // 3. Seleccionar la hoja Plantilla
    const worksheet = workbook.Sheets["Plantilla"]
    if (!worksheet) {
        alert("No existe la hoja 'Plantilla' en el archivo.")
        return
    }

    // 4. Leer encabezados de la fila 1 (para ordenar columnas según la plantilla)
    const headers = []
    const range = XLSX.utils.decode_range(worksheet["!ref"])
    const firstRow = range.s.r

    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: firstRow, c: C })]
        headers.push(cell ? cell.v : null)
    }

    // 5. Reordenar datos de Supabase en base a los encabezados de la plantilla
    const formattedData = data.map((row) => {
        const orderedRow = {}
        headers.forEach((h) => {
            orderedRow[h] = row[h] ?? "" // si no existe la columna en Supabase, deja vacío
        })
        return orderedRow
    })

    // 6. Insertar los datos empezando desde la fila 3 (A3)
    XLSX.utils.sheet_add_json(worksheet, formattedData, {
        skipHeader: true,
        origin: "A3",
    })

    // 7. Guardar el archivo resultante como copia
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
        cellStyles: true,
    })

    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "Especies_Plantilla_SIMUBIO.xlsx")
}
