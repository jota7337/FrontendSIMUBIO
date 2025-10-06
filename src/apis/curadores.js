import { supabase } from "../supabase/client"
export async function getCuradores() {
    const { data, error } = await supabase.from("profiles").select("*, roles(name)").in("role_id", [2, 3])
    if (error) throw error
    return data
}

// Asignar catalogNumber a una especie
export async function assignCatalogNumber(especieId, catalogNumber) {
    const { data, error } = await supabase.from("especies").update({ catalogNumber }).eq("id", especieId).select()

    if (error) {
        console.error("Error al asignar catalogNumber:", error)
        return null
    }
    return data?.[0] || null
}
export async function getSpeciesByCurador(curadorId) {
    const { data, error } = await supabase
        .from("especies")
        .select(
            "id, catalogNumber, scientificName, country, decimalLatitude, decimalLongitude, year, recordBasis, datasetName, publisher"
        )
        .eq("reference_by", curadorId)

    if (error) {
        console.error("Error al obtener especies:", error)
        return []
    }
    return data
}

export async function getCuradoresByUser(userId) {
    const { data, error } = await supabase.from("reference").select("id, nombre").eq("curador_id", userId)
    if (error) {
        console.error("Error al obtener referencias por curador:", error)
        return []
    }
    return data
}
