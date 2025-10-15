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
    // Guardar la sesión actual (admin) antes de crear el nuevo usuario
    const { data: adminSessionData } = await supabase.auth.getSession()
    const adminAccessToken = adminSessionData?.session?.access_token
    const adminRefreshToken = adminSessionData?.session?.refresh_token

    // Validación de campos requeridos
    if (!email || !password || !full_name || !rol || !orcid || !scientific_name) {
        throw new Error("Todos los campos son obligatorios: email, password, nombre, rol, orcid y scientific_name")
    }
    // Validación estricta de dominio institucional
    const domainRegex = /^[^@\s]+@unbosque\.edu\.co$/i
    if (!domainRegex.test(email)) {
        throw new Error("El correo debe pertenecer al dominio @unbosque.edu.co")
    }

    // Validar que email, scientific_name y orcid no estén repetidos
    const { data: existing, error: checkError } = await supabase
        .from("profiles")
        .select("id")
        .or(`email.eq.${email},scientific_name.eq.${scientific_name},orcid.eq.${orcid}`)
    if (checkError) throw checkError
    if (existing && existing.length > 0) {
        // Determinar cuál campo está repetido
        const { data: emailExists } = await supabase.from("profiles").select("id").eq("email", email)
        if (emailExists && emailExists.length > 0) throw new Error("El correo ya está registrado")
        const { data: sciExists } = await supabase.from("profiles").select("id").eq("scientific_name", scientific_name)
        if (sciExists && sciExists.length > 0) throw new Error("El número recolector (scientific_name) ya está registrado")
        const { data: orcidExists } = await supabase.from("profiles").select("id").eq("orcid", orcid)
        if (orcidExists && orcidExists.length > 0) throw new Error("El ORCID ya está registrado")
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })

    if (authError) throw authError

    const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        email,
        full_name: full_name,
        role_id: rol,
        orcid,
        scientific_name,
    })

    if (profileError) throw "El usuario se creó, pero no se pudo crear el perfil."

    // Restaurar la sesión del admin para que no quede autenticado como el nuevo usuario
    if (adminAccessToken && adminRefreshToken) {
        try {
            const { error: restoreError } = await supabase.auth.setSession({
                access_token: adminAccessToken,
                refresh_token: adminRefreshToken,
            })
            if (restoreError) {
                console.warn("No se pudo restaurar la sesión del admin automáticamente:", restoreError.message)
            }
        } catch (e) {
            console.warn("Excepción restaurando sesión admin:", e)
        }
    } else {
        console.warn("Tokens de sesión del admin no disponibles para restaurar.")
    }

    return { success: true, authData }
}
