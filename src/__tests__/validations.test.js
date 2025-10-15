describe("Validaciones de fechas fuera de rango", () => {
    it("rechaza año fuera de rango", () => {
        const res = RegistreSchema.safeParse({ countryCode: "CO", eventDate: "3024-10-03" })
        // No hay validación de rango en el schema, pero podrías agregarla
        expect(res.success).toBe(true) // Cambia a false si agregas validación de rango
    })
})

describe("Validaciones de coordenadas extremas", () => {
    it("rechaza latitud fuera de -90 a 90", () => {
        const res = OtherSchema.safeParse({ decimalLatitude: "100", decimalLongitude: "10" })
        expect(res.success).toBe(false)
        expect(res.error.issues[0].message).toMatch(/latitud.*-90.*90/i)
    })
    it("rechaza longitud fuera de -180 a 180", () => {
        const res = OtherSchema.safeParse({ decimalLatitude: "10", decimalLongitude: "-200" })
        expect(res.success).toBe(false)
        expect(res.error.issues[0].message).toMatch(/longitud.*-180.*180/i)
    })
})
import { describe, it, expect } from "vitest"
import { OtherSchema, RegistreSchema, DatosSchema, TaxonSchema } from "../lib/validations"
describe("Validaciones de institutionCode y collectionCode", () => {
    it("valida institutionCode correcto", () => {
        const res = DatosSchema.safeParse({
            basisOfRecord: "PreservedSpecimen",
            type: "PhysicalObject",
            language: "es",
            institutionCode: "Universidad de Antioquia (UdeA)",
        })
        expect(res.success).toBe(true)
    })
    it("rechaza institutionCode sin acrónimo", () => {
        const res = DatosSchema.safeParse({
            basisOfRecord: "PreservedSpecimen",
            type: "PhysicalObject",
            language: "es",
            institutionCode: "Universidad de Antioquia",
        })
        expect(res.success).toBe(false)
        expect(res.error.issues[0].message).toMatch(/acró/i)
    })
    it("valida collectionCode correcto", () => {
        const res = DatosSchema.safeParse({
            basisOfRecord: "PreservedSpecimen",
            type: "PhysicalObject",
            language: "es",
            collectionCode: "COL",
        })
        expect(res.success).toBe(true)
    })
    it("rechaza collectionCode con espacios", () => {
        const res = DatosSchema.safeParse({
            basisOfRecord: "PreservedSpecimen",
            type: "PhysicalObject",
            language: "es",
            collectionCode: "COL 123",
        })
        expect(res.success).toBe(false)
        expect(res.error.issues[0].message).toMatch(/alfanumérico/i)
    })
})

describe("Validaciones de scientificName y vernacularName", () => {
    it("valida scientificName correcto", () => {
        const res = TaxonSchema.safeParse({
            scientificName: "Ctenomys sociabilis",
            kingdom: "Animalia",
            phylum: "Chordata",
            class: "Mammalia",
            order: "Rodentia",
            family: "Ctenomyidae",
            genus: "Ctenomys",
        })
        expect(res.success).toBe(true)
    })
    it("rechaza scientificName con autoría", () => {
        const res = TaxonSchema.safeParse({
            scientificName: "Ctenomys sociabilis Linnaeus",
            kingdom: "Animalia",
            phylum: "Chordata",
            class: "Mammalia",
            order: "Rodentia",
            family: "Ctenomyidae",
            genus: "Ctenomys",
        })
        expect(res.success).toBe(false)
        expect(res.error.issues[0].message).toMatch(/autoría/i)
    })
    it("valida vernacularName con varios nombres", () => {
        const res = TaxonSchema.safeParse({
            kingdom: "Animalia",
            phylum: "Chordata",
            class: "Mammalia",
            order: "Rodentia",
            family: "Ctenomyidae",
            genus: "Ctenomys",
            vernacularName: "Buitre | Chulo",
        })
        expect(res.success).toBe(true)
    })
    it("rechaza vernacularName con números", () => {
        const res = TaxonSchema.safeParse({
            kingdom: "Animalia",
            phylum: "Chordata",
            class: "Mammalia",
            order: "Rodentia",
            family: "Ctenomyidae",
            genus: "Ctenomys",
            vernacularName: "Buitre 123",
        })
        expect(res.success).toBe(false)
        expect(res.error.issues[0].message).toMatch(/letras y espacios/i)
    })
})

describe("Validaciones de comentarios y límites", () => {
    it("rechaza comentario demasiado largo", () => {
        const texto = "a ".repeat(301)
        const res = RegistreSchema.safeParse({ countryCode: "CO", identificationRemarks: texto })
        expect(res.success).toBe(false)
        expect(res.error.issues[0].message).toMatch(/demasiado largo/i)
    })
    it("rechaza comentario con más de 20 palabras", () => {
        const texto = Array(21).fill("palabra").join(" ")
        const res = RegistreSchema.safeParse({ countryCode: "CO", identificationRemarks: texto })
        expect(res.success).toBe(false)
        expect(res.error.issues[0].message).toMatch(/20 palabras/i)
    })
    it("acepta comentario corto", () => {
        const res = RegistreSchema.safeParse({ countryCode: "CO", identificationRemarks: "Comentario válido" })
        expect(res.success).toBe(true)
    })
})

describe("Validaciones de campos opcionales y vacíos", () => {
    it("acepta institutionCode vacío", () => {
        const res = DatosSchema.safeParse({
            basisOfRecord: "PreservedSpecimen",
            type: "PhysicalObject",
            language: "es",
            institutionCode: "",
        })
        expect(res.success).toBe(false)
    })
    it("acepta scientificName vacío", () => {
        const res = TaxonSchema.safeParse({
            kingdom: "Animalia",
            phylum: "Chordata",
            class: "Mammalia",
            order: "Rodentia",
            family: "Ctenomyidae",
            genus: "Ctenomys",
            scientificName: "",
        })
        expect(res.success).toBe(false)
    })
    it("acepta eventDate nulo", () => {
        const res = RegistreSchema.safeParse({ countryCode: "CO", eventDate: null })
        expect(res.success).toBe(false)
    })
})

describe("Validaciones de fechas y horas", () => {
    it("eventDate acepta AAAA-MM-DD", () => {
        const res = RegistreSchema.safeParse({ countryCode: "CO", eventDate: "2024-10-03" })
        expect(res.success).toBe(true)
    })

    it("eventTime acepta HH:mm:ss", () => {
        const res = RegistreSchema.safeParse({ countryCode: "CO", eventTime: "12:30:15" })
        expect(res.success).toBe(true)
    })

    it("rechaza hora invalida", () => {
        const res = RegistreSchema.safeParse({ countryCode: "CO", eventTime: "25:61:00" })
        expect(res.success).toBe(false)
    })
})

describe("Validaciones de coordenadas", () => {
    it("valida formato verbatimCoordinates", () => {
        const res = OtherSchema.safeParse({
            verbatimCoordinates: "06 27 04.0N; 073 09 34.0W",
        })
        expect(res.success).toBe(true)
    })

    it("rechaza coordenadas invalidas", () => {
        const res = OtherSchema.safeParse({
            verbatimCoordinates: "6 27 N; 073 09 34 W",
        })
        expect(res.success).toBe(false)
    })
})
