import { useEffect, useState } from "react"
import { getUsuarios, deleteUsuario } from "../../apis/admin-users"
import UsuarioDialog from "./UsuarioDialog"

const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [editingData, setEditingData] = useState(null)

    // Modal propio simple

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

    const handleEdit = (usuario) => {
        setEditingData(usuario)
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

    const handleCreateClick = () => {
        setEditingData(null)
        setModalOpen(true)
    }

    const handleSaved = async () => {
        setSuccess("Guardado correctamente")
        fetchUsuarios()
    }

    return (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>

                <div className="mb-4">
                    <button onClick={handleCreateClick} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        Crear usuario
                    </button>
                </div>

                {error && <div className="mb-4 text-red-600">{error}</div>}
                {success && <div className="mb-4 text-green-600">{success}</div>}

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="text-left p-3">Nombre</th>
                                <th className="text-left p-3">Email</th>
                                <th className="text-left p-3">Rol</th>
                                <th className="text-left p-3">Nombre científico</th>
                                <th className="text-left p-3">ORCID</th>
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
                                        <td className="p-3">{u.scientific_name || "—"}</td>
                                        <td className="p-3">{u.orcid || "—"}</td>
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
            <UsuarioDialog open={modalOpen} onClose={() => setModalOpen(false)} onSaved={handleSaved} initialData={editingData} />
        </>
    )
}

export default UsuariosAdmin
