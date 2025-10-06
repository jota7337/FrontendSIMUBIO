import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { getUsuarioPorId } from "./apis/usuarios"
import { supabase } from "./supabase/client"

const DashboardLayout = ({ userRole }) => {
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
        <div className="flex h-screen w-screen">
            {isSidebarVisible && (
                <aside
                    className="relative w-64 h-full text-white border-r border-white/40 
          before:absolute before:inset-0 before:bg-[url('../assets/img/sideBar-font.jpg')] 
          before:bg-cover before:bg-center before:brightness-50 before:content-['']"
                >
                    <div className="relative h-full flex flex-col p-4 z-10">
                        <button
                            onClick={toggleSidebar}
                            className="mb-4 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 self-end"
                        >
                            ←
                        </button>
                        <div className="text-xl font-bold text-center mb-6">UNIVERSIDAD EL BOSQUE</div>
                        <div className="flex flex-col items-center border-t border-b border-white border-opacity-30 py-4">
                            <img
                                src="./assets/img/avatar.jpg"
                                alt="User Icon"
                                className="w-20 h-20 rounded-full mb-2 cursor-pointer"
                                onClick={() => navigate("/perfil")}
                            />
                            <span className="text-sm">{userName}</span>
                            <div className="flex space-x-4 mt-3">
                                <a href="#" className="text-white text-lg hover:text-orange-500">
                                    <i className="zmdi zmdi-settings"></i>
                                </a>
                                <button
                                    onClick={handleLogout}
                                    title="Cerrar sesión"
                                    className="bg-transparent text-white text-lg hover:text-orange-500 focus:outline-none"
                                >
                                    <i className="zmdi zmdi-door-locked"> aqui esyo</i>
                                </button>
                            </div>
                        </div>
                        <nav className="mt-6">
                            <ul className="space-y-2">
                                {linksToShow.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="block px-4 py-2 rounded text-white hover:bg-white hover:bg-opacity-20 transition"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </aside>
            )}
            <main className="flex-1 p-6 overflow-y-auto h-full">
                {!isSidebarVisible && (
                    <button
                        onClick={toggleSidebar}
                        className="mb-4 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
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
