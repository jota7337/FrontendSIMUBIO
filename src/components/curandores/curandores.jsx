import { useState } from "react";


const catalogs = [
  { id: "0001", owner: "Carlos" },
  { id: "0002", owner: "Ana" },
  { id: "0003", owner: "Luis" },
];

const speciesData = [
  {
    catalogNumber: "0001",
    scientificName: "Calpodes ethlius",
    attributes: "⚡",
    country: "Colombia",
    coordinates: "6.64N, 73.22W",
    year: 2025,
    recordBasis: "Observación humana",
    dataset: "eButterfly Surveys",
    publisher: "Vermont Center for Ecostudies",
  },
  {
    catalogNumber: "0002",
    scientificName: "Necyria duellona",
    attributes: "⚡",
    country: "Colombia",
    coordinates: "6.64N, 73.22W",
    year: 2025,
    recordBasis: "Observación humana",
    dataset: "eButterfly Surveys",
    publisher: "Vermont Center for Ecostudies",
  },
  {
    catalogNumber: "0003",
    scientificName: "Grallaria quitensis",
    attributes: "⚡",
    country: "Colombia",
    coordinates: "4.97N, 75.38W",
    year: 2025,
    recordBasis: "Observación humana",
    dataset: "Observation.org",
    publisher: "Observation.org",
  },
];

const SpeciesCatalog = () => {
    const [selectedCatalog, setSelectedCatalog] = useState(null);


  const filteredSpecies = selectedCatalog
    ? speciesData.filter((item) => item.catalogNumber === selectedCatalog)
    : [];

  return (
    
    <div className="p-4">
      {/* Botones de catálogo */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {catalogs.map((catalog) => (
          <button
            key={catalog.id}
            onClick={() => setSelectedCatalog(catalog.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border ${
              selectedCatalog === catalog.id
                ? "bg-green-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {catalog.owner} - Catálogo {catalog.id}
          </button>
        ))}
      </div>

      {/* Tabla */}
      {selectedCatalog && filteredSpecies.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-4 py-2 border"># Catálogo</th>
                <th className="px-4 py-2 border">Nombre científico</th>
       
                <th className="px-4 py-2 border">Área o país</th>
                <th className="px-4 py-2 border">Coordenadas</th>
                <th className="px-4 py-2 border">Año</th>
                <th className="px-4 py-2 border">Base del registro</th>
                <th className="px-4 py-2 border">Conjunto de datos</th>
                <th className="px-4 py-2 border">Publicador</th>
              </tr>
            </thead>
            <tbody>
              {filteredSpecies.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.catalogNumber}</td>
                  <td className="px-4 py-2 border">{item.scientificName}</td>
                  <td className="px-4 py-2 border">{item.country}</td>
                  <td className="px-4 py-2 border">{item.coordinates}</td>
                  <td className="px-4 py-2 border">{item.year}</td>
                  <td className="px-4 py-2 border">{item.recordBasis}</td>
                  <td className="px-4 py-2 border">{item.dataset}</td>
                  <td className="px-4 py-2 border">{item.publisher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedCatalog ? (
        <p className="text-gray-500">No hay especies para este catálogo.</p>
      ) : (
        <p className="text-gray-500">Selecciona un catálogo para ver los datos.</p>
      )}
    </div>

  );
};

export default SpeciesCatalog;
