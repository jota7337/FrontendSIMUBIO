import { supabase } from '../supabase/client';

export async function getCuradores() {
  const { data, error } = await supabase.from('reference').select('id, referencia');
  if (error) {
    console.error('Error al obtener curadores:', error);
    return [];
  }
  return data;
}

export async function getSpeciesByCurador(curadorId) {
  const { data, error } = await supabase
    .from('especies')
    .select('id, catalogNumber, scientificName, country, decimalLatitude, decimalLongitude, year, recordBasis, datasetName, publisher')
    .eq('reference_by', curadorId);
  if (error) {
    console.error('Error al obtener especies:', error);
    return [];
  }
  return data;
}

export async function getCuradoresByUser(userId) {
  const { data, error } = await supabase
    .from('reference')
    .select('id, nombre')
    .eq('curador_id', userId);
  if (error) {
    console.error('Error al obtener referencias por curador:', error);
    return [];
  }
  return data;
}
