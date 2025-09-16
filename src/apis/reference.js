// ...existing code...

export async function getReferencesByUser() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user.id
    const { data, error } = await supabase.from("reference").select("id,  referencia").eq("id_curador", userId)
    if (error) {
        console.error("Error al obtener referencias por usuario:", error)
        return []
    }
    console.log("Datos traídos de referencia:", data)
    console.log("Datos traídos de referencia iddd:", userId)
    return data
}

import { supabase } from "../supabase/client"

export async function getReferencias() {
    const { data, error } = await supabase
        .from("reference")
        .select("id, referencia, id_curador, created_at, profiles(full_name)")
        .order("created_at", { ascending: false })
    if (error) throw error
    return data.map((ref) => ({
        id: ref.id,
        referencia: ref.referencia,
        id_curador: ref.id_curador,
        curador_nombre: ref.profiles?.full_name,
        created_at: ref.created_at,
    }))
}

export async function createReferencia({ id_curador, referencia }) {
    const { error } = await supabase.from("reference").insert([{ id_curador, referencia }])
    if (error) throw error
}

export async function updateReferencia(id, { id_curador, referencia }) {
    const { error } = await supabase.from("reference").update({ id_curador, referencia }).eq("id", id)
    if (error) throw error
}

export async function deleteReferencia(id) {
    const { error } = await supabase.from("reference").delete().eq("id", id)
    if (error) throw error
}

export async function getReferences() {
    const { data, error } = await supabase.from("reference").select("id, referencia")
    if (error) {
        console.error("Error al obtener referencias:", error)
        return []
    }
    console.log("Datos traídos de referencia:", data)
    return data
}
