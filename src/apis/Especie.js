import { supabase } from '../supabase/client';


export async function createEspecie(data, userId) {
  const dataWithUser = { ...data, created_by: userId };
  const response = await supabase.from('especies').insert([dataWithUser]);
  if (response.error) {
    console.error('Error al crear especie:', response.error);
  }
  return response;
}


export async function updateEspecie(id, data) {
  return await supabase.from('especies').update(data).eq('id', id);
}


export async function deleteEspecie(id) {
  console.log("Eliminando especie con ID (API):", id);
  const response = await supabase.from('especies').delete().eq('id', id);
  console.log('Respuesta completa de deleteEspecie:', response);
  if (response.error) {
    console.error('Error al eliminar especie:', response.error);
  }
  return response;
}


export async function getEspecies() {
   const response =await supabase.from('especies').select('*');
  console.log('Respuesta completa de deleteEspecie:', response);
  if (response.error) {
    console.error('Error al eliminar especie:', response.error);
  }
  return response;
}


export async function getEspecieById(id) {
  return await supabase.from('especies').select('*').eq('id', id).single();
}

export async function getEspecieByReference(reference_id) {
  const response = await supabase.from('especies').select('*').eq('reference_by', reference_id);
  console.log('Datos traídos por referencia:', reference_id, response.data);
  return response.data;
}

