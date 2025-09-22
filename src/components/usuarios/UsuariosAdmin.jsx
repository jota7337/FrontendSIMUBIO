import { useEffect, useState } from "react"
import { getUsuarios, updateUsuario, deleteUsuario } from "../../apis/usuarios"
import { exportEspeciesWithTemplate } from "../../lib/table-especie-logic"

const initialForm = { nombre: "", email: "", password: "", rol: "usuario" }

const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState([])
    const [form, setForm] = useState(initialForm)
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchUsuarios()
    }, [])

    const fetchUsuarios = async () => {
        setLoading(true)
        const { data } = await getUsuarios()
        setUsuarios(data || [])
        setLoading(false)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editingId) {
            // No se actualiza password aquí
            const { password, ...rest } = form
            await updateUsuario(editingId, rest)
        } else {
            await createUsuario(form)
        }
        setForm(initialForm)
        setEditingId(null)
        fetchUsuarios()
    }

    const handleEdit = (usuario) => {
        setForm({
            nombre: usuario.nombre || "",
            email: usuario.email || "",
            password: "", // No se muestra el password
            rol: usuario.rol || "usuario",
        })
        setEditingId(usuario.id)
    }

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar usuario?")) {
            await deleteUsuario(id)
            fetchUsuarios()
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>

            <form onSubmit={handleSubmit} className="mb-6 flex gap-2 items-center">
                <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="border p-2 rounded"
                    required
                />
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 rounded"
                    required
                />
                <select name="rol" value={form.rol} onChange={handleChange} className="border p-2 rounded">
                    <option value="usuario">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {editingId ? "Actualizar" : "Crear"}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setForm(initialForm)
                            setEditingId(null)
                        }}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                )}
            </form>
            <table className="w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="text-left p-3">Nombre</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Rol</th>
                        <th className="text-left p-3">Fecha Creación</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                Cargando...
                            </td>
                        </tr>
                    ) : usuarios && usuarios.length > 0 ? (
                        usuarios.map((u) => (
                            <tr key={u.id} className="border-b">
                                <td className="p-3">{u.full_name || "—"}</td>
                                <td className="p-3">{u.email}</td>
                                <td className="p-3">{u.roles?.name || "usuario"}</td>
                                <td className="p-3">{new Date(u.created_at).toLocaleString()}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(u)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No hay usuarios
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UsuariosAdmin
