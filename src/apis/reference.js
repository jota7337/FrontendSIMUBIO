import { supabase } from '../supabase/client';

export async function getReferencesByUser() {
    
const { data: userData} = await supabase.auth.getUser();
const userId = userData.user.id;
  const { data, error } = await supabase
    .from('reference')
    .select('id,  referencia')
    .eq('id_curador', userId);
  if (error) {
    console.error('Error al obtener referencias por usuario:', error);
    return [];
  }
  console.log('Datos traídos de referencia:', data);
    console.log('Datos traídos de referencia iddd:', userId);
  return data;
}
