import { supabase } from "../supabase/client"

export async function getUsuarioPorId() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user.id
    console.log("User ID:", userId) // Verificar el ID del usuario
        const { data, error } = await supabase
                .from("profiles")
                .select(
                        `
            id, 
            full_name,
            email,
            scientific_name,
            created_at,
            roles (
                id,
                name
            )
        `
                )
                .eq("id", userId)
                .single()
        console.log("Profile Fetch Error:", error) // Verificar si hay un error
    return { data, error }
}

export async function getRoles() {
    const { data, error } = await supabase.from("roles").select("*")
    return { data, error }
}

export async function updateUsuario(id, nombre) {
    const { data, error } = await supabase.from("profiles").update({ full_name: nombre }).eq("id", id)

    return { data, error }
}
