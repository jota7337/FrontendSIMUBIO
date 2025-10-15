import { supabase } from "../supabase/client"
export async function getReferencesByUser() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user.id
    const { data, error } = await supabase.from("reference").select("id,  referencia").eq("id_curador", userId)
    if (error) {
        console.error("Error al obtener referencias por usuario:", error)
        return []
    }

    return data
}

export async function getReferencias() {
    const { data, error } = await supabase
        .from("reference")
        .select("id, referencia, id_curador, created_at, profiles(full_name), catalogNumber")
        .order("created_at", { ascending: false })
    if (error) throw error

    return data.map((ref) => ({
        id: ref.id,
        referencia: ref.referencia,
        id_curador: ref.id_curador,
        curador_nombre: ref.profiles?.full_name,
        created_at: ref.created_at,
        catalogNumber: ref.catalogNumber || null,
    }))
}

export async function createReferencia({ id_curador, referencia, catalogNumber }) {
    const { error } = await supabase.from("reference").insert([{ id_curador, referencia, catalogNumber }])
    if (error) throw error
}

export async function updateReferencia(id, { id_curador, referencia, catalogNumber }) {
    const { error } = await supabase.from("reference").update({ id_curador, referencia, catalogNumber }).eq("id", id)
    if (error) throw error
}

export async function deleteReferencia(id) {
    const { error } = await supabase.from("reference").delete().eq("id", id)
    if (error) throw error
}

export async function getReferences() {
    const { data, error } = await supabase.from("reference").select("id, referencia , catalogNumber")
    if (error) {
        console.error("Error al obtener referencias:", error)
        return []
    }

    return data
}
