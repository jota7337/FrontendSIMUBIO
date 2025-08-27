import { supabase } from '../supabase/client';


export async function getUsuarios() {
   
    const { data, error } = await supabase
        .from('users')
        .select('id, email, created_at, role');
    return { data, error };
}


export async function getRoles() {
    const { data, error } = await supabase
        .from('v_mis_roles')
        .select('*');
    return { data, error };
}


export async function updateUsuario(id, usuario) {
    
    const { data, error } = await supabase
        .from('auth.users')
        .update(usuario)
        .eq('id', id);
    return { data, error };
}


export async function deleteUsuario(id) {
    const { data, error } = await supabase
        .from('auth.users')
        .delete()
        .eq('id', id);
    return { data, error };
}