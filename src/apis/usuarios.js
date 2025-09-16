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

export async function getRoles() {
    const { data, error } = await supabase.from("roles").select("*")
    return { data, error }
}

export async function updateUsuario(id, usuario) {
    const { data, error } = await supabase.from("auth.users").update(usuario).eq("id", id)
    return { data, error }
}

export async function deleteUsuario(id) {
    const { data, error } = await supabase.from("auth.users").delete().eq("id", id)
    return { data, error }
}
