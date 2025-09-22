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

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session) {
                navigate("/Login")
            }
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [navigate])

    return (
        <div className="App">
            <TaskContextProvider>
                <Routes>
                    {/* Login sin DashboardLayout */}
                    <Route path="/Login" element={<Login />} />

                    {/* Rutas con DashboardLayout */}
                    <Route element={<DashboardLayout />}>
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

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </TaskContextProvider>
        </div>
    )
}

export default App
