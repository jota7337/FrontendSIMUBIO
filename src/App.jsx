import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import Form from './pages/form';
import { useEffect } from 'react';
import Login from './pages/login';
import NotFound from './pages/NotFound';
import { supabase } from './supabase/client';
import {TaskContextProvider} from './context/TaskContext';
import Home from './pages/home';
import ListEspecies from './components/especies/listaespecies';
import ObservationsTable from './components/correciones/observationsTable';
import ExportEspecie from './components/exportacion/exportacion';
import ContractsList from './components/nfts/listNfts';
import SpeciesCatalog from './components/curandores/curandores';
import UsuariosAdmin from './components/usuarios/UsuariosAdmin';
import DashboardLayout from './DashboardLayout';



function App() {

  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/Login'); 
      } else{
        navigate('/'); 
      }
    });
    
  }, []);


  return (

    <DashboardLayout>
    <div className="App">
    <TaskContextProvider>
    <Routes>

<Route path="/" element={<Home />} />
<Route path="/Login" element={<Login />} />
<Route path="/Form" element={<Form />} />
<Route path="/Especies" element={<ListEspecies />} />
<Route path="/Correciones" element={<ObservationsTable />} />
<Route path="/Exportacion" element={<ExportEspecie />} />
<Route path="/Nfts" element={<ContractsList />} />
<Route path="/curandores" element={<SpeciesCatalog/>} />
<Route path="/usuarios" element={<UsuariosAdmin />} />


<Route path="*" element={<NotFound />} />

    </Routes>
    </TaskContextProvider>
  </div>
  </DashboardLayout>
  );
}

export default App;