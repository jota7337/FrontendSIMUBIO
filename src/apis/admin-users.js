import { supabase } from "../supabase/client"

export async function deleteUsuario(id) {
    const { data, error } = await supabase.from("profiles").delete().eq("id", id)
    return { data, error }
}

export async function updateUsuarioAdmin(id, { nombre, email, rol, orcid, scientific_name }) {
    // 1. Actualizar profiles
    const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: nombre, email, role_id: rol, orcid, scientific_name })
        .eq("id", id)
    if (profileError) throw "Hubo un error al actualizar el perfil. Verifique que el scientific_name no esté en uso."

    return { success: true }
}

export async function getUsuarios() {
    const { data, error } = await supabase.from("profiles").select(`
      id,
      full_name,
      email,
      created_at,
      scientific_name, 
        orcid,
      roles (
        id,
        name
      )
    `)

    return { data, error }
}

export async function createUsuario({ email, password, full_name, rol, orcid, scientific_name }) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    })

    if (authError) throw authError

    console.log(authData)
    const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        email,
        full_name: full_name,
        role_id: rol,
        orcid,
        scientific_name,
    })
    if (profileError) throw "El usuario se creó, pero no se pudo crear el perfil."
    console.log(profileError)
    return { success: true, authData }
}
