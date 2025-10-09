import { useEffect, useState } from "react"
import { getUsuarios, deleteUsuario } from "../../apis/admin-users"
import UsuarioDialog from "./UsuarioDialog"

const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState([])
    const [filterName, setFilterName] = useState("")

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

    const filtered = usuarios.filter(u => {
        if (!filterName.trim()) return true
        const target = `${u.full_name || ''} ${u.email || ''}`.toLowerCase()
        return target.includes(filterName.toLowerCase())
    })

    return (
        <>
            <div className="p-6 ub-container min-h-screen">
                <div className="ub-card p-6">
                    <h2 className="ub-title mb-6 text-center">Gestión de Usuarios</h2>
                    <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="w-full md:w-1/2 flex items-center gap-2">
                            <input
                                type="text"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                                placeholder="Filtrar por nombre o email..."
                                className="ub-input w-full"
                            />
                            {filterName && (
                                <button
                                    onClick={() => setFilterName("")}
                                    className="ub-button-outline px-3 py-2"
                                    title="Limpiar filtro"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <div>
                            <button onClick={handleCreateClick} className="ub-button-primary">
                                Crear Usuario
                            </button>
                        </div>
                    </div>

                    {error && <div className="ub-error mb-4">{error}</div>}
                    {success && <div className="ub-success mb-4">{success}</div>}

                    {/* Tabla */}
                    <div className="ub-card overflow-hidden">
                        <table className="w-full">
                            <thead className="ub-table-header">
                                <tr>
                                    <th className="text-left p-3 font-semibold">Nombre</th>
                                    <th className="text-left p-3 font-semibold">Email</th>
                                    <th className="text-left p-3 font-semibold">Rol</th>
                                    <th className="text-left p-3 font-semibold">Numero de recolector </th>
                                    <th className="text-left p-3 font-semibold">ORCID</th>
                                    <th className="text-left p-3 font-semibold">Fecha Creación</th>
                                    <th className="text-left p-3 font-semibold">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center p-6 ub-text-muted">
                                            Cargando usuarios...
                                        </td>
                                    </tr>
                                ) : filtered && filtered.length > 0 ? (
                                    filtered.map((u) => (
                                        <tr key={u.id} className="ub-table-row">
                                            <td className="p-3 ub-text-primary font-medium">{u.full_name || "—"}</td>
                                            <td className="p-3 ub-text-secondary">{u.email}</td>
                                            <td className="p-3">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    u.roles?.name === 'Administrador' ? 'ub-badge-success' :
                                                    u.roles?.name === 'Curador' ? 'ub-badge-warning' :
                                                    'ub-badge-info'
                                                }`}>
                                                    {u.roles?.name || "Usuario"}
                                                </span>
                                            </td>
                                            <td className="p-3 ub-text-secondary">{u.scientific_name || "—"}</td>
                                            <td className="p-3 ub-text-secondary">{u.orcid || "—"}</td>
                                            <td className="p-3 ub-text-secondary text-sm">{new Date(u.created_at).toLocaleString()}</td>
                                            <td className="p-3 flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(u)}
                                                    className="ub-button-secondary text-sm"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(u.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg transition-colors duration-200 shadow-md text-sm"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center p-6 ub-text-muted">
                                            {filterName ? 'No hay coincidencias para el filtro' : 'No hay usuarios registrados'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <UsuarioDialog open={modalOpen} onClose={() => setModalOpen(false)} onSaved={handleSaved} initialData={editingData} />
        </>
    )
}

export default UsuariosAdmin
