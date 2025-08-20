import { supabase } from '../supabase/client';

// Consultar usuarios desde auth.users
export async function getUsuarios() {
    // Solo consulta básica, puedes ajustar los campos
    const { data, error } = await supabase
        .from('users')
        .select('id, email, created_at, role');
    return { data, error };
}

// Consultar roles desde la vista v_mis_roles
export async function getRoles() {
    const { data, error } = await supabase
        .from('v_mis_roles')
        .select('*');
    return { data, error };
}

// Actualizar datos del usuario (solo campos custom, no email/password)
export async function updateUsuario(id, usuario) {
    // Solo puedes actualizar campos custom si tienes permisos
    const { data, error } = await supabase
        .from('auth.users')
        .update(usuario)
        .eq('id', id);
    return { data, error };
}

// Eliminar usuario (solo si tienes permisos)
export async function deleteUsuario(id) {
    const { data, error } = await supabase
        .from('auth.users')
        .delete()
        .eq('id', id);
    return { data, error };
}