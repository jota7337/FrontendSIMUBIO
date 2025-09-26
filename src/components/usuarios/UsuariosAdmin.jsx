import { useEffect, useState } from "react"
import { getUsuarios, createUsuario, updateUsuarioAdmin as updateUsuario, deleteUsuario } from "../../apis/admin-users"

const initialForm = { nombre: "", email: "", password: "", rol: "usuario", scientificName: "", ocid: "" }

const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState([])
    const [form, setForm] = useState(initialForm)
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    // Modal propio simple
    function Modal({ open, onClose, children }) {
        if (!open) return null
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] relative">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
                        ×
                    </button>
                    {children}
                </div>
            </div>
        )
    }

    useEffect(() => {
        fetchUsuarios()
    }, [])

    const fetchUsuarios = async () => {
        setLoading(true)
        setError(null)
        try {
            const { data, error } = await getUsuarios()
            if (error) throw error
            setUsuarios(data || [])
        } catch (err) {
            setError("No se pudieron cargar los usuarios.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        try {
            if (editingId) {
                const { password, ...rest } = form
                await updateUsuario(editingId, rest)
                setSuccess("Usuario actualizado correctamente ")
            } else {
                await createUsuario(form)
                setSuccess("Usuario creado correctamente ")
            }
            setForm(initialForm)
            setEditingId(null)
            fetchUsuarios()
        } catch (err) {
            setError("Hubo un error al guardar el usuario.")
            console.error(err)
        }
    }

    const handleEdit = (usuario) => {
        setForm({
            nombre: usuario.full_name || "",
            email: usuario.email || "",
            password: "",
            rol: usuario.roles?.name || "usuario",
            scientificName: usuario.scientificName || "",
            ocid: usuario.ocid || "",
        })
        setEditingId(usuario.id)
        setModalOpen(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar usuario?")) return
        setError(null)
        setSuccess(null)

        try {
            await deleteUsuario(id)
            setSuccess("Usuario eliminado correctamente ")
            fetchUsuarios()
        } catch (err) {
            setError("No se pudo eliminar el usuario.")
            console.error(err)
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>

            {error && <div className="mb-4 text-red-600">{error}</div>}
            {success && <div className="mb-4 text-green-600">{success}</div>}

            <button
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                    setForm(initialForm)
                    setEditingId(null)
                    setModalOpen(true)
                }}
            >
                Crear usuario
            </button>

            <Modal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    setForm(initialForm)
                    setEditingId(null)
                }}
            >
                <form
                    onSubmit={(e) => {
                        handleSubmit(e)
                        setModalOpen(false)
                    }}
                    className="flex flex-col gap-3"
                >
                    <h3 className="text-lg font-semibold mb-2">{editingId ? "Editar usuario" : "Crear usuario"}</h3>
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
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        name="scientificName"
                        value={form.scientificName}
                        onChange={handleChange}
                        placeholder="Nombre científico"
                        className="border p-2 rounded"
                    />
                    <input
                        name="ocid"
                        value={form.ocid}
                        onChange={handleChange}
                        placeholder="OCID"
                        className="border p-2 rounded"
                    />
                    {!editingId && (
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Contraseña"
                            className="border p-2 rounded"
                            required
                        />
                    )}
                    <select name="rol" value={form.rol} onChange={handleChange} className="border p-2 rounded">
                        <option value="1">Recolector</option>
                        <option value="2">Curador</option>
                        <option value="3">Administrador</option>
                    </select>
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            {editingId ? "Actualizar" : "Crear"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setModalOpen(false)
                                setForm(initialForm)
                                setEditingId(null)
                            }}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100 border-b">

                        <tr>
                            <th className="text-left p-3">Nombre</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Rol</th>
                            <th className="text-left p-3">Nombre científico</th>
                            <th className="text-left p-3">OCID</th>
                            <th className="text-left p-3">Fecha Creación</th>
                            <th className="text-left p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center p-4">
                                    Cargando...
                                </td>
                            </tr>
                        ) : usuarios && usuarios.length > 0 ? (
                            usuarios.map((u) => (
                                <tr key={u.id} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="p-3">{u.full_name || "—"}</td>
                                    <td className="p-3">{u.email}</td>
                                    <td className="p-3">{u.roles?.name || "usuario"}</td>
                                    <td className="p-3">{u.scientificName || "—"}</td>
                                    <td className="p-3">{u.ocid || "—"}</td>
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
                                <td colSpan="7" className="text-center p-4">
                                    No hay usuarios
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsuariosAdmin
