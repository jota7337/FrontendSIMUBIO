
const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full bg-teal-800 py-8 flex justify-center">
        <img
          src="/universidad.png"
          alt="Logo Universidad El Bosque"
          className="h-25"
        />
      </div>
      <div className="bg-white p-8 mt-4 shadow-lg rounded-md w-80">
        <h2 className="text-center text-lg font-bold text-gray-800 mb-4">ADMINISTRADOR</h2>
        <form>
          <label htmlFor="username" className="block text-left font-semibold text-gray-700 mb-1">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          
          <label htmlFor="password" className="block text-left font-semibold text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
 

export default Login;