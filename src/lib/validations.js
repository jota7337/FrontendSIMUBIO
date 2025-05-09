
import { object , number , string, record } from "zod";

export const DatosSchema = object({
  occurrenceID: string()
  .regex(
    /^[A-Z]{2,10}:[\w\-]+:[\w\-]+$/,
    "Formato inválido. Ejemplos: UCO:RESCATE_FAUNA_MULATOSII:1 o UNIVALLE:CRM-UV:1974-001-1"
  ).optional(),
  basisOfRecord: string().min(1, "Este campo es obligatorio"),
  type: string().min(1, "Este campo es obligatorio"),
  institutionCode: string().regex(
    /^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s]+ \([A-Za-z]{2,10}\)$/,
    "Debe contener el nombre completo seguido del acrónimo entre paréntesis. Ejemplo: Universidad de Antioquia (UdeA)"
  ).optional(),
  institutionID: string().optional(),
  collectionCode: string().regex(
    /^[A-Za-z0-9\-]{2,20}$/,
    "Debe ser un código alfanumérico sin espacios, de 2 a 20 caracteres. Ejemplos: COL, ANDES-E, FMB"
  ).optional(),
  collectionID: string().optional(),
  catalogNumber: string().regex(
    /^[A-Za-z0-9\-]{2,30}$/,
    "Debe ser un identificador alfanumérico sin espacios, puede incluir guiones. Ejemplos: 00001, 1974-001-1, Lepid0784"
  ).optional(),  
  datasetName: string().optional(),
  datasetID: string().regex(
    /^(doi\.org\/[^\s]+|[a-zA-Z0-9\-]{8}-[a-zA-Z0-9\-]{4}-[a-zA-Z0-9\-]{4}-[a-zA-Z0-9\-]{4}-[a-zA-Z0-9\-]{12}|[A-Z]{2,10}:[A-Z0-9\-]+(?::[A-Z0-9\-]+){1,3})$/,
    "Debe ser un UUID, un DOI o un identificador jerárquico como IAvH:CE16-062:8956:2016"
  ).optional(),  
  modified: string().regex(
    /^(?:\d{4}(?:-\d{2})?(?:-\d{2})?)(?:\/(?:\d{4}(?:-\d{2})?(?:-\d{2})?|\d{2}))?$/,
    "Debe tener el formato AAAA, AAAA-MM, AAAA-MM-DD o un intervalo válido como AAAA-MM-DD/AAAA-MM-DD"
  ).optional(),  

  language: string().min(2, "Debe tener al menos 2 caracteres"),
  license: string().optional(),
  rightsHolder: string().optional(),
  accessRights: string().optional(),
  dynamicProperties: string().regex(
    /^\{\s*(?:"[^"]+"\s*:\s*"[^"]+"\s*,\s*)*(?:"[^"]+"\s*:\s*"[^"]+")\s*\}$/,
    'Debe estar en formato JSON con pares "clave":"valor", por ejemplo: {"pesoEnGramos":"120"}'
  )
  .optional(),  
});

export const TaxonSchema = object({ 
  scientificName: string().regex(
    /^[A-Z][a-z]+(?: [a-z]+)*(?: subsp\. [A-Z]?[a-z]+)?$/,
    'Debe ser un nombre científico sin autoría ni abreviaciones como "sp.", comenzando con mayúscula. Ej: "Ctenomys sociabilis", "Coleoptera", "Abrus pulchellus subsp. Tenuiflorus"'
  )
  .optional(),  
    kingdom: string().min(1, "Este campo es obligatorio"),
    phylum: string().min(1, "Este campo es obligatorio"),
    class: string().min(1, "Este campo es obligatorio"),
    order: string().min(1, "Este campo es obligatorio"),
    family: string().min(1, "Este campo es obligatorio"),
    genus: string().min(1, "Este campo es obligatorio"),
    specificEpithet: string().optional(),
    infraspecificEpithet: string().optional(),
    taxonRank: string().optional(),
    scientificNameAuthorship: string().regex(
      /^(\([A-Za-zÀ-ÿ.,\s\d]+\)\s*)?[A-Za-zÀ-ÿ.,\s\d]+$/,
      'Debe incluir la autoría en formato válido, como: "(Torr.) J.T. Howell", "(Györfi, 1952)" o "Linnaeus"'
    )
    .optional(),
    vernacularName: string().regex(
      /^([A-Za-zÁÉÍÓÚÜáéíóúüñÑ\s]+)(\s?\|\s?[A-Za-zÁÉÍÓÚÜáéíóúüñÑ\s]+)*$/,
      'Debe contener solo letras y espacios. Si hay varios nombres, sepáralos con " | ", por ejemplo: "Buitre | Chulo"'
    )
    .optional(),    
    });


export const EventoSchema = object({ 
  recordNumber: string().optional(),
  recordedBy: string().optional(),
  individualCount: number().optional(),
  organismQuantity: number().optional(),
  organismQuantityType: string().optional(),
  sex: string().optional(),
  lifeStage: string().optional(),
  behavior: string().optional(),
  establishmentMeans: string().optional(),
  occurrenceStatus: string().optional(),
  preparations: string().regex(
    /^([A-Za-zÁÉÍÓÚÜáéíóúüñÑ\s():]+)(\s?\|\s?[A-Za-zÁÉÍÓÚÜáéíóúüñÑ\s():]+)*$/,
    'Debe contener solo letras, espacios, paréntesis y dos puntos. Separe múltiples preparaciones con " | ", por ejemplo: "Piel | Cráneo | Esqueleto"'
  )
  .optional(),  
  disposition: string().optional(),
  license: string().optional(),
  otherCatalogNumbers: string().regex(
    /^([\wÁÉÍÓÚÜáéíóúüñÑ\s:,\-]+)(\s?\|\s?[\wÁÉÍÓÚÜáéíóúüñÑ\s:,\-]+)*$/,
    'Debe contener letras, números, espacios, dos puntos, comas o guiones. Separe múltiples entradas con " | ", por ejemplo: "NPS YELLO6778 | MBG 33424"'
  )
  .optional(),  
  occurrenceRemarks: string().optional(),
  eventID: string().regex(
    /^([\wÁÉÍÓÚÜáéíóúüñÑ\-:]+)(\s?\|\s?[\wÁÉÍÓÚÜáéíóúüñÑ\-:]+)*$/,
    'Debe ser un identificador compuesto por letras, números, guiones o dos puntos. Puede separar varios con " | ", por ejemplo: "A1:1 | A1:2"'
  )
  .optional(),  
  });

  export const RegistreSchema = object({
    georeferencedBy: string().regex(
      /^([\p{L}\d .()ÁÉÍÓÚÜáéíóúüñÑ'-]+)(\s?\|\s?[\p{L}\d .()ÁÉÍÓÚÜáéíóúüñÑ'-]+)*$/u,
      'Debe contener nombres válidos (letras, espacios, paréntesis, puntos, guiones o apóstrofos), separados por " | " si hay más de uno. Ej: "Kristina Yamamoto (MVZ) | María Isabel H."'
    )
    .optional(),    
    georeferencedDate: string().regex(
      /^(?:\d{4}(?:-\d{2})?(?:-\d{2})?(?:\/(?:\d{2}|\d{4}(?:-\d{2})?(?:-\d{2})?))?)$/,
      'Debe ingresar una fecha válida en formato ISO 8601 (AAAA, AAAA-MM, AAAA-MM-DD) o un intervalo como AAAA-MM-DD/AAAA-MM-DD o 2009/2010.'
    )
    .optional(),    
    georeferenceProtocol: string().optional(),
    identificationID: string().optional(),
    identifiedBy: string().optional(),
    identifiedByID: string().optional(),
    dateIdentified: string().regex(
      /^(?:\d{4}(?:-\d{2})?(?:-\d{2})?(?:\/(?:\d{2}|\d{4}(?:-\d{2})?(?:-\d{2})?))?)$/,
      'Debe ingresar una fecha válida en formato ISO 8601 (AAAA, AAAA-MM, AAAA-MM-DD) o un intervalo como AAAA-MM-DD/AAAA-MM-DD o 2009/2010.'
    )
    .optional(),    
    identificationReferences: string().optional(),
    identificationVerificationStatus: string().optional(),
    verbatimIdentification: string().optional(),
    identificationRemarks: string()
  .max(300, 'El comentario es demasiado largo') // límite de caracteres razonable
  .refine(val => val.trim().split(/\s+/).length <= 20, {
    message: 'El comentario no debe superar las 20 palabras',
  })
  .optional(),
    identificationQualifier: string().optional(),
    countryCode: string().min(1, "Este campo es obligatorio"),
  });

  export const familySchema = object({
    year: string().optional(),
    mes : string().optional(),
    dia : string().optional(),
    verbatimIdentification: string().optional(),
    eventTime: string()
  .regex(
    /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?(?:\/(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?)?$/,
    'Debe ser una hora válida (HH:mm, HH:mm:ss o un rango HH:mm:ss/HH:mm:ss)'
  )
  .optional(),
    habitat: string().optional(),
    eventRemarks: string().optional(),
    locationID: string().optional(),
    continent: string().optional(),
    waterBody: string().optional(),
    island: string().optional(),
    country: string().optional(),
    countryCode: string().optional(),
    stateProvince: string().optional(),
    county: string().optional(),
    municipality: string().optional(),
    locality: string().optional(),
  });

  export const OtherSchema = object({
    verbatimElevation: string().optional(),
    minimumElevationInMeters: string().optional(),
    maximumElevationInMeters: string().optional(),
    verticalDatum: string().optional(),
    verbatimDepth: string().optional(),
    minimumDepthInMeters: string().optional(),
    maximumDepthInMeters: string().optional(),
    locationAccordingTo: string().optional(),
    locationRemarks: string().optional(),
    verbatimLatitude: string().optional(),
    verbatimLongitude: string().optional(),
    verbatimCoordinates: string().optional(),
    verbatimCoordinateSystem: string().optional(),
    verbatimSRS: string().optional(),
    decimalLatitude: number({
      required_error: 'La latitud es obligatoria',
      invalid_type_error: 'La latitud debe ser un número decimal',
    })
    .min(-90, { message: 'La latitud no puede ser menor a -90' })
    .max(90, { message: 'La latitud no puede ser mayor a 90' })
    .optional(),
    decimalLongitude: number({
      required_error: 'La longitud es obligatoria',
      invalid_type_error: 'La longitud debe ser un número decimal',
    })
    .min(-180, { message: 'La longitud no puede ser menor a -180' })
    .max(180, { message: 'La longitud no puede ser mayor a 180' })
    .optional(),
    geodeticDatum: string().optional(),

  });

  export const TaxonRankSchema = object({
    taxonRank: string().optional(),
    scientificNameAuthorship: string().optional(),
    vernacularName: string().optional(),
    kingdom: string().optional(),
    phylum: string().optional(),
    class: string().optional(),
    order: string().optional(),
    family: string().optional(),
    genus: string().optional(),
    specificEpithet: string().optional(),
    infraspecificEpithet: string().optional(),

  });

