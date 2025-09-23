import { supabase } from "../supabase/client"

export async function deleteUsuario(id) {
    const { data, error } = await supabase.from("profiles").delete().eq("id", id)
    return { data, error }
}

export async function updateUsuarioAdmin(id, { nombre, email, rol }) {
    // 1. Actualizar profiles
    const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: nombre, email, role_id: rol })
        .eq("id", id)
    if (profileError) throw profileError

    return { success: true }
}

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

    return { data, error }
}

export async function createUsuario({ email, password }) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    })

    if (authError) throw authError

    return { success: true, authData }
}
