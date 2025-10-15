describe("excel-especies-logic casos límite y errores", () => {
    it("devuelve [] si la hoja está vacía", async () => {
        const headers = ["eventDate"]
        const rows = []
        const buf = makeSheet(headers, rows)
        const res = await parseExcelToEspeciesRows(buf)
        expect(res).toEqual([])
    })

    it("deja valores nulos si la celda está vacía", async () => {
        const headers = ["eventDate", "eventTime"]
        const rows = [[null, null]]
        const buf = makeSheet(headers, rows)
        const res = await parseExcelToEspeciesRows(buf)
        expect(res[0].eventDate).toBeNull()
        expect(res[0].eventTime).toBeNull()
    })

    it("devuelve el valor original si la fecha es inválida", async () => {
        const headers = ["eventDate"]
        const rows = [["no-fecha"]] // string no fecha
        const buf = makeSheet(headers, rows)
        const res = await parseExcelToEspeciesRows(buf)
        expect(res[0].eventDate).toBe("no-fecha")
    })
})
import { describe, it, expect } from "vitest"
import { parseExcelToEspeciesRows } from "../lib/excel-especies-logic"
import * as XLSX from "xlsx"

function makeSheet(headers, rows) {
    const data = [headers, [], ...rows]
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "plantilla")
    return XLSX.write(wb, { bookType: "xlsx", type: "array" })
}

// Convierte una fecha UTC (Y-M-D) a número serial Excel (sistema 1900)
function dateToExcelSerial(y, m, d) {
    const msPerDay = 86400000
    const excelEpoch = Date.UTC(1899, 11, 30)
    const target = Date.UTC(y, m - 1, d)
    return Math.floor((target - excelEpoch) / msPerDay)
}

describe("excel-especies-logic fechas/horas", () => {
    it("convierte numero Excel a fecha YYYY-MM-DD", async () => {
        const headers = ["eventDate"]
        const serial = dateToExcelSerial(2024, 10, 9)
        const rows = [[serial]]
        const buf = makeSheet(headers, rows)
        const res = await parseExcelToEspeciesRows(buf)
        expect(res[0].eventDate).toBe("2024-10-09")
    })

    it("convierte numero Excel a hora HH:mm:ss para eventTime", async () => {
        const headers = ["eventTime"]
        const rows = [[0.5]] // 12:00:00
        const buf = makeSheet(headers, rows)
        const res = await parseExcelToEspeciesRows(buf)
        expect(res[0].eventTime).toBe("12:00:00")
    })

    it("respeta strings tal cual", async () => {
        const headers = ["eventDate", "eventTime"]
        const rows = [["2024-10-09", "08:30"]]
        const buf = makeSheet(headers, rows)
        const res = await parseExcelToEspeciesRows(buf)
        expect(res[0].eventDate).toBe("2024-10-09")
        expect(res[0].eventTime).toBe("08:30")
    })
})
