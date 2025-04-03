
import { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

function Login(){

const [email, setEmail] = useState("");
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try{
    const result = await supabase.auth.signInWithOtp({ email });

    console.log(result);

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate('/'); // Redirigir a la página de inicio si ya hay una sesión activa
    }
  };
  checkUser();
}, [navigate]);

return(
  <div>

    <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          onChange={(e) => setEmail(e.target.value)}
        
        />

        <button>Enviar</button>

    </form>


  </div>



);}
 

export default Login;