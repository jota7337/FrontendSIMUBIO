import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { getUsuarioPorId } from "./apis/usuarios"
import { supabase } from "./supabase/client"

const DashboardLayout = ({ userRole }) => {
    const location = useLocation()
    const [isSidebarVisible, setIsSidebarVisible] = useState(true)
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [userName, setUserName] = useState("")
    async function fetchUser() {
        const { data } = await getUsuarioPorId()
        setUserName(data?.full_name || data?.email || "Usuario")
    }
    const navigate = useNavigate()

    useEffect(() => {
        fetchUser()
    }, [])

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible)
    }

    // const toggleDropdown = () => {
    //     setIsDropdownOpen(!isDropdownOpen)
    // }
DashboardLayout.propTypes = {
    userRole: PropTypes.string,
}

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Error logging out:", error.message)
        } else {
            window.location.href = "/"
        }
    }

    // Links por rol
    const sidebarLinks = {
        Administrador: [
            { to: "/", label: "Dashboard" },
            { to: "/Especies", label: "Espécimen en consulta" },
            { to: "/curandores", label: "Espécimenes a cargo" },
            { to: "/Correciones", label: "Correciones" },
            { to: "/Exportacion", label: "Acciones" },
            // { to: "/Nfts", label: "Nfts" },
            { to: "/referencias", label: "Colección" },
            { to: "/usuarios", label: "Usuarios" },
            // { to: "/perfil", label: "Perfil" },
        ],
        Recolector: [
            { to: "/", label: "Dashboard" },
            // { to: "/Form", label: "Formulario" },
            { to: "/Especies", label: "Espécimen en consulta" },
            { to: "/perfil", label: "Perfil" },
        ],
        Curador: [
            { to: "/", label: "Dashboard" },
            // { to: "/Form", label: "Formulario" },
            { to: "/Especies", label: "Espécimen en consulta" },
            { to: "/Correciones", label: "Correciones" },
            // { to: "/Nfts", label: "Nfts" },
            { to: "/curandores", label: "Espécimenes a cargo" },
            { to: "/perfil", label: "Perfil" },
        ],
    }

    const linksToShow = sidebarLinks[userRole] || []

    return (
        <div className="flex h-screen w-screen ub-container">
            {isSidebarVisible && (
                <aside className="ub-sidebar relative w-64 h-full border-r border-green-600">
                    <div className="relative h-full flex flex-col p-4 z-10">
                        <button
                            onClick={toggleSidebar}
                            className="mb-4 ub-button-secondary p-2 rounded-full shadow-md self-end"
                        >
                            ←
                        </button>
                        <div className="text-xl font-bold text-center mb-6 text-yellow-400">UNIVERSIDAD EL BOSQUE</div>
                        <div className="flex flex-col items-center border-t border-b border-green-600 py-4">
                            <img
                                src="./assets/img/avatar.jpg"
                                alt="User Icon"
                                className="w-20 h-20 rounded-full mb-2 cursor-pointer border-2 border-yellow-400"
                                onClick={() => navigate("/perfil")}
                            />
                            <span className="text-sm text-yellow-200">{userName}</span>
                            <div className="flex space-x-4 mt-3">
                                <a href="#" className="text-yellow-400 text-lg hover:text-yellow-300">
                                    <i className="zmdi zmdi-settings"></i>
                                </a>
                            </div>
                        </div>
                        <nav className="mt-6">
                            <ul className="space-y-2">
                                {linksToShow.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className={`block px-4 py-2 rounded-lg transition font-semibold ${
                                                location.pathname === link.to 
                                                    ? 'ub-nav-item-active' 
                                                    : 'ub-nav-item text-white'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        title="Cerrar sesión"
                                        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition text-lg bg-transparent focus:outline-none"
                                    >
                                        <i className="zmdi zmdi-door-locked"></i>
                                        <span>Cerrar sesión</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
            )}
            <main className="flex-1 p-6 overflow-y-auto h-full bg-gradient-to-br from-green-50 to-yellow-50">
                {!isSidebarVisible && (
                    <button
                        onClick={toggleSidebar}
                        className="mb-4 ub-button-primary p-2 rounded-full shadow-md"
                    >
                        →
                    </button>
                )}
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
