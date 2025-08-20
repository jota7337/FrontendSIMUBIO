
import { useState, useEffect } from "react";
import { Trash, Info, FileText, FileSpreadsheet } from "lucide-react";
import { getEspecies } from '../../apis/Especie';


const ExportEspecie = () => {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getEspecies();
      if (!error && Array.isArray(data)) {
  
        const obs = data.map((item, idx) => ({
          id: item.id || idx,
          category: item.family || item.class || 'Sin categoría',
          name: item.scientificName || item.nombre || '-',
          observation: item.observation || item.occurrenceRemarks || '-',
        }));
        setObservations(obs);
      } else {
        setObservations([]);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setObservations(observations.filter(obs => obs.id !== id));
  };

  const groupedObservations = observations.reduce((acc, obs) => {
    acc[obs.category] = acc[obs.category] || [];
    acc[obs.category].push(obs);
    return acc;
  }, {});

  // Exportar por tabulaciones
  const handleExportTab = (category) => {
    const rows = groupedObservations[category];
    if (!rows || rows.length === 0) return;
    // Encabezado
    let content = 'Nombre\tObservación\n';
    content += rows.map(r => `${r.name}\t${r.observation}`).join('\n');
    // Descargar archivo
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `observaciones_${category}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
  
    <div className="p-6 bg-gray-100 min-h-screen">
    <h2 className="text-xl font-semibold mb-4">Observaciones por Categoría</h2>

    {Object.keys(groupedObservations).map(category => (
      <div key={category} className="mb-6 bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-700">{category}</h3>
          <div className="flex gap-2">
            <button className="flex items-center bg-green-500 text-white px-3 py-1 rounded-lg">
              <FileSpreadsheet className="w-4 h-4 mr-1" /> Exportar Excel
            </button>
            <button className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg" onClick={() => handleExportTab(category)}>
              <FileText className="w-4 h-4 mr-1" /> Exportar Tabulaciones
            </button>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Observación</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {groupedObservations[category].map(obs => (
              <tr key={obs.id} className="border-b">
                <td className="p-2">{obs.name}</td>
                <td className="p-2">{obs.observation}</td>
                <td className="p-2 text-center">
                  <button className="mr-2 text-blue-500 hover:text-blue-700">
                    <Info className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(obs.id)} className="text-red-500 hover:text-red-700">
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
  

);
};
export default ExportEspecie;
