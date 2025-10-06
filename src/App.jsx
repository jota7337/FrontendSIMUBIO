import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import "./index.css"
import Form from "./pages/form"
import { useEffect } from "react"
import Login from "./pages/login"
import NotFound from "./pages/NotFound"
import { supabase } from "./supabase/client"
import { TaskContextProvider } from "./context/TaskContext"
import Home from "./pages/home"
import ListEspecies from "./components/especies/listaespecies"
import ObservationsTable from "./components/correciones/observationsTable"
import ExportEspecie from "./components/exportacion/exportacion"
import ContractsList from "./components/nfts/listNfts"
import SpeciesCatalog from "./components/curandores/curandores"
import UsuariosAdmin from "./components/usuarios/UsuariosAdmin"
import DashboardLayout from "./DashboardLayout"
import ReferenciasPage from "./pages/referencias"
import PerfilUsuario from "./pages/PerfilUsuario"
import { useState } from "react"
import { getUsuarioPorId } from "./apis/usuarios"

function App() {
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session) {
                navigate("/login")
            }
        })

        async function fetchRole() {
            const { data } = await getUsuarioPorId()
            setUserRole(data?.roles?.name || null)
            setLoading(false)
        }
        fetchRole()

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [navigate])

    // Define allowed routes per role
    const getRoutesForRole = (role) => {
        if (role === "Administrador") {
            return (
                <Route element={<DashboardLayout userRole={role} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/Form" element={<Form />} />
                    <Route path="/Especies" element={<ListEspecies />} />
                    <Route path="/Correciones" element={<ObservationsTable />} />
                    <Route path="/Exportacion" element={<ExportEspecie />} />
                    <Route path="/Nfts" element={<ContractsList />} />
                    <Route path="/curandores" element={<SpeciesCatalog />} />
                    <Route path="/usuarios" element={<UsuariosAdmin />} />
                    <Route path="/referencias" element={<ReferenciasPage />} />
                    <Route path="/perfil" element={<PerfilUsuario />} />
                </Route>
            )
        } else if (role === "Recolector") {
            return (
                <Route element={<DashboardLayout userRole={role} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/Form" element={<Form />} />
                    <Route path="/Especies" element={<ListEspecies />} />
                    <Route path="/perfil" element={<PerfilUsuario />} />
                </Route>
            )
        } else if (role === "Curador") {
            return (
                <Route element={<DashboardLayout userRole={role} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/Form" element={<Form />} />
                    <Route path="/Especies" element={<ListEspecies />} />
                    <Route path="/Correciones" element={<ObservationsTable />} />
                    <Route path="/Nfts" element={<ContractsList />} />
                    <Route path="/curandores" element={<SpeciesCatalog />} />
                    <Route path="/perfil" element={<PerfilUsuario />} />
                </Route>
            )
        } else {
            // Si no hay rol, no renderiza rutas protegidas
            return null
        }
    }

    // if (loading) return <div>Cargando...</div>

    return (
        <div className="App">
            <TaskContextProvider>
                <Routes>
                    {/* Login sin DashboardLayout */}
                    <Route path="/login" element={<Login />} />
                    {getRoutesForRole(userRole)}
                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </TaskContextProvider>
        </div>
    )
}

export default App
