import Registre from "../components/register";
import React, { useState } from 'react';
import Taxon from "../components/taxon";
import Evento from "../components/evento";
import Others from "../components/others";
import Familia from "../components/familia";
import Datos from "../components/datos";

const Form = () =>  {

    const [activeForm, setActiveForm] = useState(null);

    const handleButtonClick = (formIndex) => {
      setActiveForm(formIndex);
    };
    const handleGoToinicio = () => {
      window.location.href = 'http://localhost:8080/inicio'; // Reemplaza 'ID_DEL_VIDEO' con el ID del video
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        {/* Encabezado */}
        <div className="w-full bg-white shadow-md py-4 flex items-center justify-between px-8">
          <div className="flex items-center">
            <img src="logo.png" alt="Logo Universidad El Bosque" className="w-40 h-20" />
          </div>
          <div className="text-gray-800 font-medium mr-4">Usuario</div>
        </div>
        <div className="w-full h-20 bg-teal-900 shadow-md py-4 flex items-center justify-between px-8"></div>
  
        {/* Imagen de fondo */}
        <div className="w-full h-40 bg-cover bg-center my-4 relative" style={{ backgroundImage: `url(${"fondo.png"})` }}>
          <div className="bg-black bg-opacity-50 h-full flex justify-center items-center">
            <h2 className="text-white text-2xl font-mono  text-left shadow-lg">Ciencias Universidad El Bosque</h2>
          </div>
        </div>
  
       
  
      {/* Formulario */}

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleButtonClick(1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Informacion del evento 
        </button>
        <button
          onClick={() => handleButtonClick(2)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
         Taxon
        </button>
        <button
          onClick={() => handleButtonClick(3)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Informacion de la espceie
        </button>
        <button
          onClick={() => handleButtonClick(4)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
         Ubicacion cordenandas
        </button>
        <button
          onClick={() => handleButtonClick(5)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Lugar del evento
        </button>
        <button
          onClick={() => handleButtonClick(6)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Informacion institucion 
        </button>
        
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 w-11/12 md:w-8/12 lg:w-6/12">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Formulario SIB</h3>
        {activeForm === 1 && <Registre />}
        {activeForm === 2 && <Taxon/>}
        {activeForm === 3 && <Evento/>}
        {activeForm === 4 && <Others/>}
        {activeForm === 5 && <Familia/>}
        {activeForm === 6 && <Datos/>}
        {/* Agrega más condiciones según la cantidad de formularios */}
      
        {/* Agrega más botones según sea necesario */}
  


       {/* Formulario */}

     
   </div>
      
   <button
          onClick={handleGoToinicio}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          volver
        </button>
        
 
      </div>
    );
  }
    


export default Form;