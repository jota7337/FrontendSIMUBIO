import { supabase } from "../supabase/client";

export async function updateComentario(id, cuerpo) {
  const response = await supabase
    .from('comentarios')
    .update({ cuerpo })
    .eq('id', id);
  if (response.error) {
    console.error('Error al editar comentario:', response.error);
  }
  return response.data;
}

export async function deleteComentario(id) {
  const response = await supabase
    .from('comentarios')
    .delete()
    .eq('id', id);
  if (response.error) {
    console.error('Error al eliminar comentario:', response.error);
  }
  return response.data;
}


const { data: userData } = await supabase.auth.getUser();
const authorId = userData?.user?.id;
export async function getComentariosByAuthor() {
  const { data, error } = await supabase
    .from('comentarios')
    .select(`
      id,
      cuerpo,
      created_at,
      profiles ( full_name ), 
      especies ( scientificName  )
    `)
    .eq('author_id', authorId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener comentarios:', error);
  }
  console.log('Datos traídos de comentarios:', data);
    console.log('Datos traídos de comentarios iddd:', authorId);
  return data || [];
}


export async function createComentario({ especieId, authorId, cuerpo }) {
  const response = await supabase
    .from('comentarios')
    .insert([{ especie_id: especieId, author_id: authorId, cuerpo }]);
  if (response.error) {
    console.error('Error al crear comentario:', response.error);
  }
  return response.data;
}
