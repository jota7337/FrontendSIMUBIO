import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { Outlet } from 'react-router-dom';
import Taxon from '../components/especies/form/taxon';
import Evento from '../components/especies/form/evento';
import Others from '../components/especies/form/others';
import Familia from '../components/especies/form/familia';
import Datos from '../components/especies/form/datos';
import Registre from '../components/especies/form/register';


const Form = () => {
  const [activeForm, setActiveForm] = useState(null);
  const location = useLocation(); // Access location state
  const [receivedData, setReceivedData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.species) {
      console.log("Received data from listaespecies:", location.state.species); // Log received data
      setReceivedData(location.state.species); // Store received data
    } else {
      console.log("No data received from listaespecies."); // Fallback log
    }
  }, [location.state]);

  const handleButtonClick = (formIndex) => {
    console.log("Selected Form Index:", formIndex); // Debugging line
    setActiveForm(formIndex);
  };

  const handleGoToInicio = () => {
    window.location.href = 'http://localhost:8080/inicio';
  };

  const handleGoToDashboard = () => {
    window.location.href = '/';  };

  
  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Encabezado */}
      <div className="w-full bg-white shadow-md py-4 flex items-center justify-between px-8">
        <div className="flex items-center">
          <img src="logo.png" alt="Logo Universidad El Bosque" className="w-40 h-20" />
        </div>
        <div className="text-gray-800 font-medium mr-4">Usuario</div>
      </div>
      <div className="w-full h-20 bg-teal-900 shadow-md py-4 flex items-center justify-between px-8"></div>

      <div className="w-full h-40 bg-cover bg-center my-4 relative" style={{ backgroundImage: `url(${"fondo.png"})` }}>
        <div className="bg-black bg-opacity-50 h-full flex justify-center items-center">
          <h2 className="text-white text-2xl font-mono text-left shadow-lg">Ciencias Universidad El Bosque</h2>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleButtonClick(1)}
          className={`px-4 py-2 rounded ${
            activeForm === 1 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Informacion del evento
        </button>
        <button
          onClick={() => handleButtonClick(2)}
          className={`px-4 py-2 rounded ${
            activeForm === 2 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Taxonomia
        </button>
        <button
          onClick={() => handleButtonClick(3)}
          className={`px-4 py-2 rounded ${
            activeForm === 3 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Informacion de la especie
        </button>
        <button
          onClick={() => handleButtonClick(4)}
          className={`px-4 py-2 rounded ${
            activeForm === 4 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Ubicacion coordenadas
        </button>
        <button
          onClick={() => handleButtonClick(5)}
          className={`px-4 py-2 rounded ${
            activeForm === 5 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Lugar del evento
        </button>
        <button
          onClick={() => handleButtonClick(6)}
          className={`px-4 py-2 rounded ${
            activeForm === 6 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Informacion institucion
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 w-11/12 md:w-8/12 lg:w-6/12">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Formulario SIB</h3>
        {activeForm === 1 && <Registre initialData={receivedData} />}
        {activeForm === 2 && <Taxon initialData={receivedData} />}
        {activeForm === 3 && <Evento initialData={receivedData} />}
        {activeForm === 4 && <Others initialData={receivedData} />}
        {activeForm === 5 && <Familia initialData={receivedData} />}
        {activeForm === 6 && <Datos initialData={receivedData} />}
      </div>

      <button
         onClick={handleGoToDashboard} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Volver
      </button>

  
    </div>
    </DashboardLayout>
  );
};

export default Form;