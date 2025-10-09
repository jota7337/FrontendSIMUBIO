// Actualizar el número de colector (recordNumber) de una especie
export async function updateRecordNumber(especieId, recordNumber) {
    const response = await supabase.from("especies").update({ recordNumber }).eq("id", especieId)
    if (response.error) {
        console.error("Error al actualizar recordNumber de especie:", response.error)
    }
    return response
}
import { supabase } from "../supabase/client"
// Modificar el estado de la especie
export async function updateEstadoEspecie(especieId, estadoId) {
    // Asume que el campo en la tabla es 'estado_especie' y se actualiza con el id del estado
    const response = await supabase.from("especies").update({ estado: estadoId }).eq("id", especieId)

    if (response.error) {
        console.error("Error al actualizar estado de especie:", response.error)
    }
    return response
}

export async function createEspecie(data, userId) {
    const dataWithUser = { ...data, created_by: userId }
    const response = await supabase.from("especies").insert([dataWithUser])
    if (response.error) {
        console.error("Error al crear especie:", response.error)
    }
    return response
}

export async function updateEspecie(id, data) {
    return await supabase.from("especies").update(data).eq("id", id)
}

export async function deleteEspecie(id) {
    const response = await supabase.from("especies").delete().eq("id", id)

    if (response.error) {
        console.error("Error al eliminar especie:", response.error)
    }
    return response
}

export async function getEspecies() {
    const response = await supabase.from("especies").select("*")

    if (response.error) {
        console.error("Error al eliminar especie:", response.error)
    }
    return response
}

export async function getEspecieById(id) {
    const { data, error } = await supabase
        .from("especies")
        .select(
            `
      *,
      estado_especie (
        id,
        code,
        name
       
      )
    `
        )
        .eq("id", id)
        .single()

    return { data, error }
}

export async function getEspecieByReference(reference_id) {
        const response = await supabase
                .from("especies")
                .select(
                        `
            *,
            estado_especie (
                id,
                code,
                name
            ),
            reference (*)
        `
                )
                .eq("reference_by", reference_id)

        return response.data
}

export async function createEspeciesBatch(rows, userId) {
    const payload = rows.map((r) => ({ ...r, created_by: userId }))

    const { data, error, count } = await supabase.from("especies").insert(payload, { count: "exact" })

    if (error) {
        console.error("Error al crear especies (batch):", error)
        throw error
    }
    return { data, count: count ?? payload.length }
}

export async function getEspecieByUser() {
             const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData?.user?.id) {
            alert("No se pudo obtener el usuario actual")
            return
        }
        const userId = userData.user.id
    const response = await supabase.from("especies").select("* , reference (*)").eq("created_by", userId)

    if (response.error) {
        console.error("Error al eliminar especie:", response.error)
    }

    return response
}

export async function getEspecieByReferenceUser(reference_id) {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user?.id) {
        alert("No se pudo obtener el usuario actual")
        return
    }
    const userId = userData.user.id
    const response = await supabase
        .from("especies")
        .select(
            `
      *,
      estado_especie (
        id,
        code,
        name
       
      )
    `
        )
        .eq("reference_by", reference_id)
        .eq("created_by", userId)

    return response.data
}