import { useState } from "react";
import { Pencil, Trash } from "lucide-react";


const initialObservations = [
  { id: 1, alias: "Especie1", department: "Mamíferos", observation: "El jaguar es un felino de gran tamaño que habita en..." },
  { id: 2, alias: "Especie2", department: "Aves", observation: "El cóndor de los Andes es el ave voladora más grande..." },
  { id: 3, alias: "Especie3", department: "Reptiles", observation: "La boa constrictora se encuentra en zonas tropicales..." },
];

export default function ObservationsTable() {
  const [observations, setObservations] = useState(initialObservations);

  const handleEdit = (id) => {
    alert(`Editar observación con ID: ${id}`);
  };

  const handleDelete = (id) => {
    setObservations(observations.filter((obs) => obs.id !== id));
  };

  return (
  
      <div className=" w-full  p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Correcciones de Observaciones</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="text-left px-6 py-4">Alias</th>
                <th className="text-left px-6 py-4">Departamento</th>
                <th className="text-left px-6 py-4">Observación</th>
                <th className="text-center px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((obs) => (
                <tr key={obs.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{obs.alias}</td>
                  <td className="px-6 py-4 text-gray-800">{obs.department}</td>
                  <td className="px-6 py-4 text-gray-800">{obs.observation}</td>
                  <td className="px-6 py-4 flex justify-center space-x-4">
                    <button
                      onClick={() => handleEdit(obs.id)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(obs.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {observations.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-6 text-center text-gray-500">
                    No hay observaciones disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

  );
}
