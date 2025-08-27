import { useState, useEffect } from "react";
import { getReferencesByUser } from '../../apis/reference';
import { getEspecieByReference } from "../../apis/Especie";



const SpeciesCatalog = () => {
  const [references, setReferences] = useState([]);
  const [selectedReference, setSelectedReference] = useState(null);
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    async function fetchReferences() {
      
 
      const data = await getReferencesByUser();
      setReferences(data);
    }
    fetchReferences();
  }, []);

  useEffect(() => {
    if (!selectedReference) return setSpecies([]);
    async function fetchSpecies() {
      const data = await getEspecieByReference(selectedReference);
      setSpecies(data || []);
    }
    fetchSpecies();
  }, [selectedReference]);

  return (
    <div className="p-4">

      <div className="flex gap-2 mb-4 flex-wrap">
        {references.map((ref) => (
          <button
            key={ref.id}
            onClick={() => setSelectedReference(ref.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border ${
              selectedReference === ref.id
                ? "bg-green-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {ref.referencia}
          </button>
        ))}
      </div>

      {/* Tabla */}
      {selectedReference && species.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-4 py-2 border"># Catálogo</th>
                <th className="px-4 py-2 border">Nombre científico</th>
                <th className="px-4 py-2 border">Área o país</th>
                <th className="px-4 py-2 border">Latitud</th>
                <th className="px-4 py-2 border">Longitud</th>
                <th className="px-4 py-2 border">Año</th>
                <th className="px-4 py-2 border">Base del registro</th>
                <th className="px-4 py-2 border">Conjunto de datos</th>
                <th className="px-4 py-2 border">Publicador</th>
              </tr>
            </thead>
            <tbody>
              {species.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.catalogNumber}</td>
                  <td className="px-4 py-2 border">{item.scientificName}</td>
                  <td className="px-4 py-2 border">{item.country}</td>
                  <td className="px-4 py-2 border">{item.decimalLatitude}</td>
                  <td className="px-4 py-2 border">{item.decimalLongitude}</td>
                  <td className="px-4 py-2 border">{item.year}</td>
                  <td className="px-4 py-2 border">{item.recordBasis}</td>
                  <td className="px-4 py-2 border">{item.datasetName}</td>
                  <td className="px-4 py-2 border">{item.publisher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedReference ? (
        <p className="text-gray-500">No hay especies para esta referencia.</p>
      ) : (
        <p className="text-gray-500">Selecciona una referencia para ver los datos.</p>
      )}
    </div>
  );
};

export default SpeciesCatalog;
