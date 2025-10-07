import { useState, useEffect } from "react"
import { supabase } from "../supabase/client"
import { useNotifications } from "../context/NotificationsContext"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
            // Obtener el usuario y su rol
            const { user } = data

            // Suponiendo que el rol está en user.user_metadata.rol
            const rol = user?.user_metadata?.rol
            if (rol === "admin") {
                navigate("/admin")
            } else if (rol === "curador") {
                navigate("/curador")
            } else {
                navigate("/")
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
                navigate("/") // Redirigir a la página de inicio si ya hay una sesión activa
            }
        }
        checkUser()
    }, [navigate])

    return (
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

                <p className="text-center text-sm mt-6 ub-text-muted">
                    Al hacer clic en "Iniciar Sesión" aceptas nuestros{" "}
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
    )
}

export default Login
