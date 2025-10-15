import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { getUsuarioPorId } from "./apis/usuarios"
import { supabase } from "./supabase/client"
import { useWindowSize } from "./lib/useWindowSize"

const DashboardLayout = ({ userRole }) => {
    const location = useLocation()
    const { breakpoint, width } = useWindowSize()
    const [isSidebarVisible, setIsSidebarVisible] = useState(true)
    const [userName, setUserName] = useState("")

    // Auto-hide sidebar en pantallas pequeñas
    useEffect(() => {
        if (breakpoint === "xs" || breakpoint === "sm") {
            setIsSidebarVisible(false)
        } else {
            setIsSidebarVisible(true)
        }
    }, [breakpoint])

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

    // Determinar si el sidebar debe ser overlay en móvil
    const isMobile = breakpoint === "xs" || breakpoint === "sm"
    const sidebarWidth = isMobile ? "w-64" : "w-64"

    return (
        <div className="flex h-screen w-full max-w-full overflow-hidden ub-container">
            {/* Overlay para móvil cuando sidebar está abierto */}
            {isMobile && isSidebarVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />
            )}

            {isSidebarVisible && (
                <aside
                    className={`ub-sidebar relative ${sidebarWidth} h-full border-r border-green-600 ${
                        isMobile ? "fixed left-0 top-0 z-50" : "relative"
                    } transition-transform duration-300 ease-in-out`}
                >
                    <div className="relative h-full flex flex-col p-4 z-10">
                        <button onClick={toggleSidebar} className="mb-4 ub-button-secondary p-2 rounded-full shadow-md self-end">
                            ←
                        </button>
                        <div className={`font-bold text-center mb-6 text-yellow-400 ${isMobile ? "text-lg" : "text-xl"}`}>
                            UNIVERSIDAD EL BOSQUE
                        </div>
                        <div className="flex flex-col items-center border-t border-b border-green-600 py-4">
                            <img
                                src="./assets/img/avatar.jpg"
                                alt="User Icon"
                                className={`rounded-full mb-2 cursor-pointer border-2 border-yellow-400 ${
                                    isMobile ? "w-16 h-16" : "w-20 h-20"
                                }`}
                                onClick={() => navigate("/perfil")}
                            />
                            <span className={`text-yellow-200 ${isMobile ? "text-xs" : "text-sm"}`}>{userName}</span>
                            <div className="flex space-x-4 mt-3">
                                <a href="#" className="text-yellow-400 text-lg hover:text-yellow-300">
                                    <i className="zmdi zmdi-settings"></i>
                                </a>
                            </div>
                        </div>
                        <nav className="mt-6 flex-1 overflow-y-auto">
                            <ul className="space-y-2">
                                {linksToShow.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className={`block px-4 py-2 rounded-lg transition font-semibold ${
                                                isMobile ? "text-sm" : "text-base"
                                            } ${location.pathname === link.to ? "ub-nav-item-active" : "ub-nav-item text-white"}`}
                                            onClick={isMobile ? toggleSidebar : undefined}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        title="Cerrar sesión"
                                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition bg-transparent focus:outline-none ${
                                            isMobile ? "text-base" : "text-lg"
                                        }`}
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
            <main
                className={`flex-1 h-full bg-gradient-to-br from-green-50 to-yellow-50 overflow-y-auto ${
                    isMobile ? "p-4" : "p-6"
                } ${isMobile && isSidebarVisible ? "blur-sm" : ""}`}
            >
                {!isSidebarVisible && (
                    <button
                        onClick={toggleSidebar}
                        className="mb-4 ub-button-primary p-2 rounded-full shadow-md fixed top-4 left-4 z-30"
                    >
                        →
                    </button>
                )}
                <div className="w-full max-w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout
