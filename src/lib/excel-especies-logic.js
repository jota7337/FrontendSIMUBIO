// excel-especies-logic.js
// Lógica pura para leer Excel, transformar y cargar en public.especies (Supabase).

import * as XLSX from "xlsx"

/** ------------------ Config: columnas válidas ------------------ **/
const ESPECIES_COLUMNS = new Set([
    "occurrenceID",
    "basisOfRecord",
    "type",
    "institutionCode",
    "institutionID",
    "collectionCode",
    "collectionID",
    "catalogNumber",
    "datasetName",
    "datasetID",
    "modified",
    "language",
    "license",
    "rightsHolder",
    "accessRights",
    "bibliographicCitation",
    "references",
    "ownerInstitutionCode",
    "informationWithheld",
    "dataGeneralizations",
    "dynamicProperties",
    "recordNumber",
    "recordedBy",
    "recordedByID",
    "organismID",
    "individualCount",
    "organismQuantity",
    "organismQuantityType",
    "organismName",
    "organismScope",
    "associatedOrganisms",
    "previousIdentifications",
    "organismRemarks",
    "sex",
    "lifeStage",
    "reproductiveCondition",
    "behavior",
    "establishmentMeans",
    "degreeOfEstablishment",
    "pathway",
    "occurrenceStatus",
    "preparations",
    "disposition",
    "otherCatalogNumbers",
    "associatedMedia",
    "associatedOccurrences",
    "associatedReferences",
    "associatedSequences",
    "associatedTaxa",
    "occurrenceRemarks",
    "materialSampleID",
    "parentEventID",
    "eventID",
    "samplingProtocol",
    "sampleSizeValue",
    "sampleSizeUnit",
    "samplingEffort",
    "eventDate",
    "startDayOfYear",
    "endDayOfYear",
    "year",
    "month",
    "day",
    "verbatimEventDate",
    "eventTime",
    "habitat",
    "fieldNumber",
    "fieldNotes",
    "eventRemarks",
    "locationID",
    "higherGeography",
    "higherGeographyID",
    "continent",
    "waterBody",
    "islandGroup",
    "island",
    "country",
    "countryCode",
    "stateProvince",
    "county",
    "municipality",
    "locality",
    "verbatimLocality",
    "verbatimElevation",
    "minimumElevationInMeters",
    "maximumElevationInMeters",
    "verticalDatum",
    "verbatimDepth",
    "minimumDepthInMeters",
    "maximumDepthInMeters",
    "minimumDistanceAboveSurfaceInMeters",
    "maximumDistanceAboveSurfaceInMeters",
    "locationAccordingTo",
    "locationRemarks",
    "verbatimLatitude",
    "verbatimLongitude",
    "verbatimCoordinates",
    "verbatimCoordinateSystem",
    "verbatimSRS",
    "decimalLatitude",
    "decimalLongitude",
    "geodeticDatum",
    "coordinateUncertaintyInMeters",
    "coordinatePrecision",
    "pointRadiusSpatialFit",
    "footprintWKT",
    "footprintSRS",
    "footprintSpatialFit",
    "georeferencedBy",
    "georeferencedDate",
    "georeferenceProtocol",
    "georeferenceSources",
    "georeferenceVerificationStatus",
    "georeferenceRemarks",
    "geologicalContextID",
    "earliestEonOrLowestEonothem",
    "latestEonOrHighestEonothem",
    "earliestEraOrLowestErathem",
    "latestEraOrHighestErathem",
    "earliestPeriodOrLowestSystem",
    "latestPeriodOrHighestSystem",
    "earliestEpochOrLowestSeries",
    "latestEpochOrHighestSeries",
    "earliestAgeOrLowestStage",
    "latestAgeOrHighestStage",
    "lowestBiostratigraphicZone",
    "highestBiostratigraphicZone",
    "lithostratigraphicTerms",
    "group",
    "formation",
    "member",
    "bed",
    "identificationID",
    "identifiedBy",
    "identifiedByID",
    "dateIdentified",
    "identificationReferences",
    "identificationVerificationStatus",
    "typeStatus",
    "verbatimIdentification",
    "identificationRemarks",
    "identificationQualifier",
    "scientificName",
    "scientificNameAuthorship",
    "taxonID",
    "scientificNameID",
    "higherClassification",
    "kingdom",
    "phylum",
    "class",
    "order",
    "family",
    "subfamily",
    "genus",
    "genericName",
    "subgenus",
    "infragenericEpithet",
    "specificEpithet",
    "infraspecificEpithet",
    "cultivarEpithet",
    "taxonRank",
    "verbatimTaxonRank",
    "vernacularName",
    "taxonomicStatus",
    "acceptedNameUsage",
    "acceptedNameUsageID",
    "parentNameUsage",
    "parentNameUsageID",
    "originalNameUsage",
    "originalNameUsageID",
    "nameAccordingTo",
    "nameAccordingToID",
    "namePublishedIn",
    "namePublishedInID",
    "namePublishedInYear",
    "taxonConceptID",
    "nomenclaturalCode",
    "nomenclaturalStatus",
    "taxonRemarks",
])

/** ------------------ Diccionario de mapeo flexible ES/EN ------------------ **/
const MAP = {
    // IDs & básicos
    occurrenceid: "occurrenceID",
    basisofrecord: "basisOfRecord",
    tipo: "type",
    // Institución / colección
    institutioncode: "institutionCode",
    institutionid: "institutionID",
    collectioncode: "collectionCode",
    collectionid: "collectionID",
    catalognumber: "catalogNumber",
    datasetname: "datasetName",
    datasetid: "datasetID",
    // Temporal y licencias
    modified: "modified",
    language: "language",
    license: "license",
    rightsholder: "rightsHolder",
    accessrights: "accessRights",
    bibliographiccitation: "bibliographicCitation",
    references: "references",
    // Registro/organismo
    recordnumber: "recordNumber",
    recordedby: "recordedBy",
    recordedbyid: "recordedByID",
    organismid: "organismID",
    individualcount: "individualCount",
    organismquantity: "organismQuantity",
    organismquantitytype: "organismQuantityType",
    organismname: "organismName",
    organismscope: "organismScope",
    associatedorganisms: "associatedOrganisms",
    previousidentifications: "previousIdentifications",
    organismremarks: "organismRemarks",
    sexo: "sex",
    sex: "sex",
    lifestage: "lifeStage",
    reproductivecondition: "reproductiveCondition",
    behavior: "behavior",
    establishmentmeans: "establishmentMeans",
    degreeofestablishment: "degreeOfEstablishment",
    pathway: "pathway",
    occurrencestatus: "occurrenceStatus",
    preparations: "preparations",
    disposition: "disposition",
    othercatalognumbers: "otherCatalogNumbers",
    associatedmedia: "associatedMedia",
    associatedoccurrences: "associatedOccurrences",
    associatedreferences: "associatedReferences",
    associatedsequences: "associatedSequences",
    associatedtaxa: "associatedTaxa",
    occurrenceremarks: "occurrenceRemarks",
    // Evento/muestreo
    materialsampleid: "materialSampleID",
    parenteventid: "parentEventID",
    eventid: "eventID",
    samplingprotocol: "samplingProtocol",
    samplesizevalue: "sampleSizeValue",
    samplesizeunit: "sampleSizeUnit",
    samplingeffort: "samplingEffort",
    eventdate: "eventDate",
    startdayofyear: "startDayOfYear",
    enddayofyear: "endDayOfYear",
    año: "year",
    ano: "year",
    year: "year",
    mes: "month",
    month: "month",
    dia: "day",
    day: "day",
    verbatimeventdate: "verbatimEventDate",
    eventtime: "eventTime",
    habitat: "habitat",
    fieldnumber: "fieldNumber",
    fieldnotes: "fieldNotes",
    eventremarks: "eventRemarks",
    // Localización
    locationid: "locationID",
    highergeography: "higherGeography",
    highergeographyid: "higherGeographyID",
    continent: "continent",
    waterbody: "waterBody",
    islandgroup: "islandGroup",
    island: "island",
    pais: "country",
    country: "country",
    countrycode: "countryCode",
    departamento: "stateProvince",
    stateprovince: "stateProvince",
    county: "county",
    municipio: "municipality",
    municipality: "municipality",
    localidad: "locality",
    locality: "locality",
    verbatimlocality: "verbatimLocality",
    verbatimelevation: "verbatimElevation",
    minimumelevationinmeters: "minimumElevationInMeters",
    maximumelevationinmeters: "maximumElevationInMeters",
    verticaldatum: "verticalDatum",
    verbatimdepth: "verbatimDepth",
    minimumdepthinmeters: "minimumDepthInMeters",
    maximumdepthinmeters: "maximumDepthInMeters",
    minimumdistanceabovesurfaceinmeters: "minimumDistanceAboveSurfaceInMeters",
    maximumdistanceabovesurfaceinmeters: "maximumDistanceAboveSurfaceInMeters",
    locationaccordingto: "locationAccordingTo",
    locationremarks: "locationRemarks",
    verbatimlatitude: "verbatimLatitude",
    verbatimlongitude: "verbatimLongitude",
    verbatimcoordinates: "verbatimCoordinates",
    verbatimcoordinatesystem: "verbatimCoordinateSystem",
    verbatimsrs: "verbatimSRS",
    lat: "decimalLatitude",
    latitude: "decimalLatitude",
    decimallatitude: "decimalLatitude",
    lon: "decimalLongitude",
    longitud: "decimalLongitude",
    longitude: "decimalLongitude",
    decimallongitude: "decimalLongitude",
    geodeticdatum: "geodeticDatum",
    coordinateuncertaintyinmeters: "coordinateUncertaintyInMeters",
    coordinateprecision: "coordinatePrecision",
    pointradiusspatialfit: "pointRadiusSpatialFit",
    footprintwkt: "footprintWKT",
    footprintsrs: "footprintSRS",
    footprintspatialfit: "footprintSpatialFit",
    georeferencedby: "georeferencedBy",
    georeferenceddate: "georeferencedDate",
    georeferenceprotocol: "georeferenceProtocol",
    georeferencesources: "georeferenceSources",
    georeferenceverificationstatus: "georeferenceVerificationStatus",
    georeferenceremarks: "georeferenceRemarks",
    // Identificación / taxonomía
    identificationid: "identificationID",
    identifiedby: "identifiedBy",
    identifiedbyid: "identifiedByID",
    dateidentified: "dateIdentified",
    identificationreferences: "identificationReferences",
    identificationverificationstatus: "identificationVerificationStatus",
    typestatus: "typeStatus",
    verbatimidentification: "verbatimIdentification",
    identificationremarks: "identificationRemarks",
    identificationqualifier: "identificationQualifier",
    scientificname: "scientificName",
    scientificnameauthorship: "scientificNameAuthorship",
    taxonid: "taxonID",
    scientificnameid: "scientificNameID",
    higherclassification: "higherClassification",
    kingdom: "kingdom",
    phylum: "phylum",
    class: "class",
    order: "order",
    family: "family",
    subfamily: "subfamily",
    genus: "genus",
    genericname: "genericName",
    subgenus: "subgenus",
    infragenericepithet: "infragenericEpithet",
    specificepithet: "specificEpithet",
    infraspecificepithet: "infraspecificEpithet",
    cultivarepithet: "cultivarEpithet",
    taxonrank: "taxonRank",
    verbatimtaxonrank: "verbatimTaxonRank",
    vernacularname: "vernacularName",
    taxonomicstatus: "taxonomicStatus",
    acceptednameusage: "acceptedNameUsage",
    acceptednameusageid: "acceptedNameUsageID",
    parentnameusage: "parentNameUsage",
    parentnameusageid: "parentNameUsageID",
    originalnameusage: "originalNameUsage",
    originalnameusageid: "originalNameUsageID",
    nameaccordingto: "nameAccordingTo",
    nameaccordingtoid: "nameAccordingToID",
    namepublishedin: "namePublishedIn",
    namepublishedinid: "namePublishedInID",
    namepublishedinyear: "namePublishedInYear",
    taxonconceptid: "taxonConceptID",
    nomenclaturalcode: "nomenclaturalCode",
    nomenclaturalstatus: "nomenclaturalStatus",
    taxonremarks: "taxonRemarks",
}

/** ------------------ Utilidades ------------------ **/
function normalizeHeader(h) {
    if (!h && h !== 0) return ""
    return String(h)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Za-z0-9_ ]+/g, " ")
        .replace(/\s+/g, "")
        .toLowerCase()
}

function excelDateToISO(value) {
    // Maneja fechas Excel (número serial) y Date objects
    try {
        if (value instanceof Date) {
            if (isNaN(value.getTime())) return null
            return value.toISOString()
        }
        if (typeof value === "number") {
            // XLSX utils: desde 1899-12-30
            const utc_days = Math.floor(value - 25569)
            const utc_value = utc_days * 86400 // seg
            const date_info = new Date(utc_value * 1000)
            // Agrega fracción del día
            const fractional_day = value - Math.floor(value) + 1e-8
            const totalSeconds = Math.floor(86400 * fractional_day)
            date_info.setSeconds(date_info.getSeconds() + totalSeconds)
            if (isNaN(date_info.getTime())) return null
            return date_info.toISOString()
        }
        // Si es string, intenta parsear como fecha, si falla, regresa como string
        if (typeof value === "string") {
            const d = new Date(value)
            if (!isNaN(d.getTime())) return d.toISOString()
            return value
        }
        return String(value)
    } catch {
        return null
    }
}

function coerceToText(v) {
    if (v === undefined || v === null) return null // será NULL en DB
    if (v instanceof Date || typeof v === "number") return excelDateToISO(v)
    return String(v)
}

function buildHeaderMap(sampleRow) {
    const headerMap = {}
    Object.keys(sampleRow).forEach((hdr) => {
        const norm = normalizeHeader(hdr)
        const mapped = MAP[norm]
        if (mapped && ESPECIES_COLUMNS.has(mapped)) headerMap[hdr] = mapped
        else if (ESPECIES_COLUMNS.has(hdr)) headerMap[hdr] = hdr // coincide exacto
    })
    return headerMap
}

function transformRows(rowsRaw, headerMap) {
    return rowsRaw
        .map((r) => {
            const out = {}
            for (const [hdr, val] of Object.entries(r)) {
                const targetKey = headerMap[hdr]
                if (!targetKey) continue
                out[targetKey] = coerceToText(val)
            }
            return out
        })
        .filter((r) => Object.keys(r).length > 0)
}

function chunk(arr, size) {
    const out = []
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
    return out
}

/** ------------------ API principal ------------------ **/

/**
 * Lee el archivo Excel y devuelve filas ya transformadas (sin insertar).
 * @param {File|ArrayBuffer|Buffer} fileOrBuffer
 * @param {string} [sheetName="plantilla"]
 * @returns {Array<Object>} filas listas para insert (sin created_by)
 */
export async function parseExcelToEspeciesRows(fileOrBuffer, sheetName = "plantilla") {
    const data = fileOrBuffer.arrayBuffer ? await fileOrBuffer.arrayBuffer() : fileOrBuffer
    const wb = XLSX.read(data, { type: "array" })
    const ws = wb.Sheets[sheetName] || wb.Sheets[wb.SheetNames[0]]
    if (!ws) throw new Error(`No se encontró la hoja "${sheetName}" ni la primera hoja.`)

    // Leer headers de la primera fila (índice 0), datos desde la tercera fila (índice 2)
    // Usar header: 1 (primera fila como headers), range: 2 (empieza a leer datos desde la fila 3)
    const rowsRaw = XLSX.utils.sheet_to_json(ws, { defval: null, header: 1 })
    // rowsRaw es un array de arrays: [ [header1, header2, ...], [v1, v2, ...], ... ]
    if (rowsRaw.length < 3) return []
    const headers = rowsRaw[0]
    const dataRows = rowsRaw.slice(2) // desde la fila 3 (índice 2)
    // Convertir a array de objetos
    const objects = dataRows.map(rowArr => {
        const obj = {}
        headers.forEach((h, i) => {
            obj[h] = rowArr[i]
        })
        return obj
    })
    const headerMap = buildHeaderMap(objects[0] || {})
    const transformed = transformRows(objects, headerMap)
    return transformed
}

/**
 * Inserta en lotes en Supabase la lista de filas transformadas.
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {Array<Object>} rows
 * @param {string} userId - auth.uid() del usuario (requerido para created_by)
 * @param {number} [batchSize=200]
 */
export async function insertRowsIntoEspecies(supabase, rows, userId, batchSize = 200 , referenceId) {
    if (!userId) throw new Error("userId (auth.uid()) es requerido para created_by.")
    if (!rows?.length) return { inserted: 0 }

    // Filtra a columnas válidas e inyecta created_by
    const ready = rows.map((row) => {
        const filtered = {}
        for (const k of Object.keys(row)) {
            if (ESPECIES_COLUMNS.has(k)) filtered[k] = row[k]
        }
        return { ...filtered, created_by: userId , reference_by: referenceId}
    })

    const batches = chunk(ready, batchSize)
    let total = 0

    for (let i = 0; i < batches.length; i++) {
        const batch = batches[i]
        const { error } = await supabase.from("especies").insert(batch, { count: "exact" })
    
        if (error) throw error
        console.log("error", error  )
        total += batch.length
    }

    return { inserted: total }
}

/**
 * Flujo completo: lee Excel -> transforma -> inserta.
 * @param {File|ArrayBuffer|Buffer} fileOrBuffer
 * @param {{ supabase: import('@supabase/supabase-js').SupabaseClient, sheetName?: string, batchSize?: number, getUserId?: ()=>Promise<string> }} opts
 */
export async function processAndInsertEspecies(
    fileOrBuffer,
    { supabase, sheetName = "plantilla", batchSize = 200, getUserId, referenceId } = {}
) {
    if (!supabase) throw new Error("Supabase client requerido.")
    let rows = await parseExcelToEspeciesRows(fileOrBuffer, sheetName)
    // Agregar reference_by si se provee
 
     
    console.log("referenceId", referenceId)
    let userId = null
    if (getUserId) userId = await getUserId()
    else {
        const { data, error } = await supabase.auth.getUser()
        if (error) throw error
        userId = data.user?.id
    }

    const res = await insertRowsIntoEspecies(supabase, rows, userId, batchSize , referenceId)
    return { ...res, previewSample: rows.slice(0, 10) }
}
