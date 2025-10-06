import { supabase } from "../supabase/client"

export async function updateComentario(id, cuerpo, aprobado) {
    const updateObj = aprobado !== undefined ? { cuerpo, aprobado } : { cuerpo }
    const response = await supabase.from("comentarios").update(updateObj).eq("id", id)
    if (response.error) {
        console.error("Error al editar comentario:", response.error)
    }
    return response.data
}

export async function getComentariosByEspecie(especieId) {
    const { data, error } = await supabase
        .from("comentarios")
        .select(`id, cuerpo , aprobado , campo`)
        .eq("especie_id", especieId)
        .order("created_at", { ascending: false })
    if (error) {
        console.error("Error al obtener comentarios por especie:", error)
    }
    return data || []
}

export async function deleteComentario(id) {
    const response = await supabase.from("comentarios").delete().eq("id", id)
    if (response.error) {
        console.error("Error al eliminar comentario:", response.error)
    }
    return response.data
}

export async function getComentariosByAuthor() {
    const { data: userData } = await supabase.auth.getUser()
    const authorId = userData?.user?.id
    const { data, error } = await supabase
        .from("comentarios")
        .select(
            `
      id,
      cuerpo,
      created_at,
      aprobado,
      profiles ( full_name ), 
      campo,
      especies ( scientificName  , id )
    `
        )
        .eq("author_id", authorId)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error al obtener comentarios")
    }

    return data || []
}

export async function createComentario({ especieId, cuerpo, campo }) {
    const { data: userData } = await supabase.auth.getUser()
    const authorId = userData?.user?.id
    const response = await supabase.from("comentarios").insert([{ especie_id: especieId, author_id: authorId, cuerpo, campo }])

    if (response.error) {
        console.error("Error al crear comentario")
    }
    return response
}
