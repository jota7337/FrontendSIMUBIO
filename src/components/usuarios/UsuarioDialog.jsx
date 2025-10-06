import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { createUsuario, updateUsuarioAdmin as updateUsuario } from "../../apis/admin-users"

const UsuarioDialog = ({ open, onClose, onSaved, initialData }) => {
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: "",
        rol: "2",
        scientificName: "",
        ocid: "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (initialData) {
            setForm({
                nombre: initialData.full_name || "",
                email: initialData.email || "",
                password: "",
                rol: initialData.roles?.id ? String(initialData.roles.id) : "2",
                scientificName: initialData.scientific_name || "",
                ocid: initialData.orcid || "",
            })
            // Clear previous errors when loading initial data
            setError(null)
        } else {
            setForm({
                nombre: "",
                email: "",
                password: "",
                rol: "usuario",
                scientificName: "",
                ocid: "",
            })
            // Clear previous errors when opening empty form
            setError(null)
        }
    }, [initialData, open])

    if (!open) return null

    const handleChange = (e) => {
        // Clear any shown error as soon as the user edits a field
        setError(null)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            if (initialData) {
                // Edit mode: call updateUsuario
                await updateUsuario(initialData.id, {
                    nombre: form.nombre,
                    email: form.email,
                    rol: parseInt(form.rol, 10),
                    orcid: form.ocid,
                    scientific_name: form.scientificName,
                })
                onSaved && onSaved({ success: true })
            } else {
                if (!form.password) throw new Error("La contraseña es requerida para crear usuario")
                await createUsuario({
                    email: form.email,
                    password: form.password,
                    full_name: form.nombre,
                    rol: parseInt(form.rol, 10),
                    orcid: form.ocid,
                    scientific_name: form.scientificName,
                })
                onSaved && onSaved({ success: true })
            }
            onClose()
        } catch (err) {
            setError(err.message || "Error al guardar usuari verifica que scientific_name no esté en uso ")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
                <h3 className="text-xl font-bold mb-4">{initialData ? "Editar Usuario" : "Crear Usuario"}</h3>
                {error && <div className="mb-3 text-red-600">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    {!initialData && (
                        <div>
                            <label className="block text-sm font-medium">Contraseña</label>
                            <input
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                type="password"
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium">Rol</label>
                        <select name="rol" value={form.rol} onChange={handleChange} className="w-full border rounded px-2 py-1">
                            <option value="3">Administrador</option>
                            <option value="1">Recolector</option>
                            <option value="2">Curador</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Nombre científico</label>
                        <input
                            name="scientificName"
                            value={form.scientificName}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">ORCID</label>
                        <input
                            name="ocid"
                            value={form.ocid}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose} className="px-3 py-1 border rounded">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-60"
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

UsuarioDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSaved: PropTypes.func,
    initialData: PropTypes.object,
}

export default UsuarioDialog
