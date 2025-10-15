import { useState } from "react"
import PropTypes from "prop-types"
import { supabase } from "../supabase/client"
import Alert from "../components/ui/Alert"

const PasswordChangeDialog = ({ open, onClose, userId }) => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    if (!open) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        if (!password || !confirmPassword) {
            setError("Ambos campos son obligatorios")
            setLoading(false)
            return
        }
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden")
            setLoading(false)
            return
        }
        try {
            const { error } = await supabase.auth.updateUser({ password })
            if (error) throw error
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                onClose()
            }, 1500)
        } catch (err) {
            setError(err.message || "Error al cambiar la contraseña")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h3 className="text-xl font-bold mb-4">Cambiar contraseña</h3>
                {error && (
                    <Alert variant="error" title="Error" className="mb-4">
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert variant="success" title="Éxito" className="mb-4">
                        Contraseña cambiada correctamente
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium">Nueva contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded px-2 py-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Confirmar contraseña</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

PasswordChangeDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    userId: PropTypes.string,
}

export default PasswordChangeDialog
