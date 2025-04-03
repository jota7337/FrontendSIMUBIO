import { supabase } from '../supabase/client';
import DashboardLayout from '../DashboardLayout';
import Form from '../pages/form';


function Home() {


    return (
        <div>
            Home
            <button onClick={() => supabase.auth.signOut()}>
                Cerrar Sesion
            </button>
            <DashboardLayout />
            <div id="form-section">
            <Form />
            </div>
        </div>
    );
}

export default Home;