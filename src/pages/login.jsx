import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
        navigate("/"); // Redirigir a la página de inicio si ya hay una sesión activa
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-center bg-[url('/ruta-de-la-imagen.jpg')]">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
            Sign in now
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          By clicking "Sign in now" you agree to our{" "}
          <a href="#" className="text-blue-500 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Login;
