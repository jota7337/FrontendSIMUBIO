import { object , number , string } from "zod";

export const DatosSchema = object({
  occurrenceID: string().min(1, "Este campo es obligatorio"),
  basisOfRecord: string().min(1, "Este campo es obligatorio"),
  type: string().min(1, "Este campo es obligatorio"),
  institutionCode: string().regex(/^[A-Z]{2,10}$/, "Solo letras mayúsculas (2 a 10)"),
  institutionID: string().optional(),
  collectionCode: string().optional(),
  collectionID: string().optional(),
  catalogNumber: string().optional(),
  datasetName: string().optional(),
  datasetID: string().optional(),
  modified: string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato válido: AAAA-MM-DD"),
  language: string().min(2, "Debe tener al menos 2 caracteres"),
  license: string().optional(),
  rightsHolder: string().optional(),
  accessRights: string().optional(),
  dynamicProperties: string().optional(),
});

export const TaxonSchema = object({ 
    scientificName: string().min(1, "Este campo es obligatorio"),
    kingdom: string().min(1, "Este campo es obligatorio"),
    phylum: string().min(1, "Este campo es obligatorio"),
    class: string().min(1, "Este campo es obligatorio"),
    order: string().min(1, "Este campo es obligatorio"),
    family: string().min(1, "Este campo es obligatorio"),
    genus: string().min(1, "Este campo es obligatorio"),
    specificEpithet: string().optional(),
    infraspecificEpithet: string().optional(),
    taxonRank: string().optional(),
    scientificNameAuthorship: string().optional(),
    vernacularName: string().optional(),
    });