import React, { useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import SpeciesDetailsDialog from "./especiedialog";

const initialData = [
  {
    nombre: "Cathorops mapale Betancur-R. & Acero P., 2005",
    pais: "Colombia",
    coordenadas: "10.97N, 74.39W",
    anio: 2007,
    base: "Observación humana",
    conjunto: "Pesquería Artesanal de la Ciénaga Grande de Santa Marta - SIPEIN",
    publicador: "Instituto de Investigaciones Marinas y Costeras - Invemar",
  },
  {
    nombre: "Triticum aestivum subsp. aestivum",
    pais: "Alemania",
    coordenadas: "-",
    anio: "-",
    base: "Registro biológico",
    conjunto: "A global database for the distributions of crop wild relatives",
    publicador: "Centro Internacional de Agricultura Tropical - CIAT",
  },
];

const ListEspecies = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleRowClick = (species) => {
    setSelectedSpecies(species);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSpecies(null);
  };

  const filteredData = data.filter((item) =>
    item.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="w-full p-4"> 
        <h2 className="text-2xl font-bold mb-4">Registros de Especies</h2>
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Buscar por nombre científico..."
            value={search}
            onChange={handleSearch}
            className="border p-2 rounded w-1/3"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => alert("Agregar nuevo registro")}
          >
            Agregar Registro
          </button>
        </div>
        <table className="w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3">Nombre científico</th>
              <th className="text-left p-3">Área o país</th>
              <th className="text-left p-3">Coordenadas</th>
              <th className="text-left p-3">Año</th>
              <th className="text-left p-3">Base del registro</th>
              <th className="text-left p-3">Conjunto de datos</th>
              <th className="text-left p-3">Publicador</th>
              <th className="text-left p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(item)}
                >
                  <td className="p-3">{item.nombre}</td>
                  <td className="p-3">{item.pais}</td>
                  <td className="p-3">{item.coordenadas}</td>
                  <td className="p-3">{item.anio}</td>
                  <td className="p-3">{item.base}</td>
                  <td className="p-3">{item.conjunto}</td>
                  <td className="p-3">{item.publicador}</td>
                  <td className="p-3">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Editar " + item.nombre);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Eliminar " + item.nombre);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <SpeciesDetailsDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        species={selectedSpecies}
      />
    </DashboardLayout>
  );
};

export default ListEspecies;
