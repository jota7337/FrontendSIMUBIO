
import { supabase } from '../supabase/client';

// Crear especie
export async function createEspecie(data) {
  return await supabase.from('especies').insert([data]);
}

// Actualizar especie
export async function updateEspecie(id, data) {
  return await supabase.from('especies').update(data).eq('id', id);
}


export async function deleteEspecie(id) {
  console.log("Eliminando especie con ID (API):", id);
  return await supabase.from('especies').delete().eq('id', id);
}

// Obtener todas las especies
export async function getEspecies() {
  return await supabase.from('especies').select('*');
}

// Obtener una especie por id
export async function getEspecieById(id) {
  return await supabase.from('especies').select('*').eq('id', id).single();
}

