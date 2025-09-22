import { supabase } from "../supabase/client"

export async function getUsuarios() {
    const { data, error } = await supabase.from("profiles").select(`
      id,
      full_name,
      email,
      created_at,
      roles (
        id,
        name
      )
    `)
    console.log("Datos traídos de usuarios:", data)
    console.log("Error traídos de usuarios:", error)
    return { data, error }
}
export async function getUsuarioPorId(id) {
    const { data, error } = await supabase
        .from("profiles")
        .select(
            `
      id, 
      full_name,
      email,
      created_at,
      roles (
        id,
        name
      )
    `
        )
        .eq("id", id)
        .single()
    console.log("Datos traídos de usuario por ID:", data)
    console.log("Error traídos de usuario por ID:", error)
    return { data, error }
}
export async function getRoles() {
    const { data, error } = await supabase.from("roles").select("*")
    return { data, error }
}

export async function updateUsuario(id, nombre) {
    console.log("Actualizando usuario con ID:", id, "con datos:", nombre)
    const { data, error } = await supabase.from("profiles").update({ full_name: nombre }).eq("id", id)
    console.log("Datos actualizados de usuario:", data)
    console.log("Error al actualizar usuario:", error)
    return { data, error }
}

export async function deleteUsuario(id) {
    const { data, error } = await supabase.from("auth.users").delete().eq("id", id)
    return { data, error }
}
