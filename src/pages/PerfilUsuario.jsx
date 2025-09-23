import { useEffect, useState } from "react"
import { getUsuarioPorId, updateUsuario } from "../apis/usuarios"

const PerfilUsuario = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editData, setEditData] = useState({ full_name: "" })
    const [editMode, setEditMode] = useState(false)
    const [saving, setSaving] = useState(false)
    async function fetchUser() {
        const { data } = await getUsuarioPorId()

        setUser(data)
        setEditData({
            full_name: data?.full_name || "",
        })
        setLoading(false)
    }
    useEffect(() => {
        fetchUser()
    }, [])

    if (loading) return <div className="p-8">Cargando...</div>
    if (!user) return <div className="p-8">No hay usuario logeado.</div>

    const handleEdit = () => setEditMode(true)
    const handleCancel = () => setEditMode(false)

    const handleChange = (e) => {
        setEditData({ full_name: e.target.value })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setSaving(true)
        const { error } = await updateUsuario(user.id, editData.full_name)
        setSaving(false)
        if (!error) {
            setUser((prev) => ({
                ...prev,
                full_name: editData.full_name,
                rol: editData.rol,
            }))
            setEditMode(false)
        } else {
            alert("Error al actualizar el perfil")
        }
    }

    return (
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Perfil de Usuario</h2>
            <div className="flex flex-col items-center mb-6">
                <img src="/assets/img/avatar.jpg" alt="Avatar" className="w-24 h-24 rounded-full mb-2" />
                <span className="text-lg font-semibold">{user.full_name || user.email}</span>
                <span className="text-gray-500">{user.email}</span>
            </div>
            <div className="space-y-2 mb-4">
                <div>
                    <strong>ID:</strong> {user.id}
                </div>
                <div>
                    <strong>Nombre:</strong> {user.full_name || "No definido"}
                </div>
                <div>
                    <strong>Email:</strong> {user.email}
                </div>
                <div>
                    <strong>Rol:</strong> {user.rol || user.roles?.name || "No definido"}
                </div>
            </div>
            {editMode ? (
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="full_name"
                            value={editData.full_name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            disabled={saving}
                        >
                            {saving ? "Guardando..." : "Guardar"}
                        </button>
                        <button
                            type="button"
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            ) : (
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleEdit}>
                    Editar perfil
                </button>
            )}
        </div>
    )
}

export default PerfilUsuario
