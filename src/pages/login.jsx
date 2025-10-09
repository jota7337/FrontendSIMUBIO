import { useState, useEffect } from "react"
import UsuarioDialog from "../components/usuarios/UsuarioDialog"
import PasswordChangeDialog from "./PasswordChangeDialog"
import { getUsuarioPorId } from "../apis/usuarios"
import { supabase } from "../supabase/client"
import { useNotifications } from "../context/NotificationsContext"
import { useNavigate } from "react-router-dom"


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showProfileDialog, setShowProfileDialog] = useState(false)
    const [showPasswordDialog, setShowPasswordDialog] = useState(false)
    const [userId, setUserId] = useState(null)
    const navigate = useNavigate()
    const notifications = useNotifications()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) {
                notifications.error("Credenciales incorrectas")
                return
            } else {
                notifications.success("Inicio de sesión exitoso")
            }
            const { user } = data
            setUserId(user.id)
            // Verificar si es primer login (created_at === last_sign_in_at)
            if (user.created_at === user.last_sign_in_at) {
                setShowPasswordDialog(false)
            }
            // Consultar si tiene perfil
            const { data: profileData } = await getUsuarioPorId()
     
            if (!profileData) {
                setShowProfileDialog(true)
            } else {
                // Redirigir según rol si todo está ok
                const rol = user?.user_metadata?.rol
                if (rol === "admin") {
                    navigate("/admin")
                } else if (rol === "curador") {
                    navigate("/curador")
                } else {
                    navigate("/")
                }
            }
        } catch (error) {
            console.error(error)
            notifications.error("Error al iniciar sesión")
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (user) {
                setUserId(user.id)
                // Verificar si es primer login (created_at === last_sign_in_at)
                if (user.created_at === user.last_sign_in_at) {
                    setShowPasswordDialog(true)
                }
                // Consultar si tiene perfil
                const { data: profileData } = await getUsuarioPorId()
                if (!profileData) {
                    setShowProfileDialog(true)
                } else {
                    navigate("/")
                }
            }
        }
        checkUser()
    }, [navigate])

    // Iniciar sesión con Microsoft
    const handleMicrosoftLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({ provider: "azure" })
        if (error) notifications.error("Error con Microsoft: " + error.message)
    }

    return (
        <>
            {showProfileDialog && (
                <UsuarioDialog open={showProfileDialog} onClose={() => setShowProfileDialog(false)} onSaved={() => { setShowProfileDialog(false); navigate("/"); }} initialData={null} />
            )}
            {/* Modal para cambio de contraseña */}
            {showPasswordDialog && (
                <PasswordChangeDialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)} userId={userId} />
            )}
            <div className="flex h-screen items-center justify-center ub-container">
                <div className="ub-card p-8 w-96">
                    <div className="text-center mb-6">
                        <img 
                            src="/universidad.png" 
                            alt="Universidad El Bosque" 
                            className="mx-auto h-20 w-20 rounded-full border-2 border-green-700 mb-4"
                        />
                        <h2 className="ub-title mb-2">Iniciar Sesión</h2>
                        <p className="ub-text-secondary">Sistema SIMUBIO - Universidad El Bosque</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium ub-text-primary mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Ingresa tu correo electrónico"
                                className="ub-input w-full"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium ub-text-primary mb-2">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                className="ub-input w-full"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        <button className="ub-button-primary w-full py-3 text-lg">
                            Iniciar Sesión
                        </button>
                    </form>

                    <div className="my-4 flex items-center justify-center">
                        <span className="text-gray-400 mx-2">o</span>
                    </div>
                    <button
                        className="ub-button-primary w-full py-3 text-lg bg-blue-700 hover:bg-blue-800 flex items-center justify-center gap-2"
                        type="button"
                        onClick={handleMicrosoftLogin}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24"><rect fill="#F35325" x="2" y="2" width="13" height="13"/><rect fill="#81BC06" x="17" y="2" width="13" height="13"/><rect fill="#05A6F0" x="2" y="17" width="13" height="13"/><rect fill="#FFBA08" x="17" y="17" width="13" height="13"/></svg>
                        Iniciar sesión con Microsoft
                    </button>

                    <p className="text-center text-sm mt-6 ub-text-muted">
                        Al hacer clic en &quot;Iniciar Sesión&quot; aceptas nuestros{" "}
                        <a href="#" className="text-green-600 underline hover:text-green-800">
                            Términos de Servicio
                        </a>{" "}
                        y{" "}
                        <a href="#" className="text-green-600 underline hover:text-green-800">
                            Política de Privacidad
                        </a>
                        .
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login
