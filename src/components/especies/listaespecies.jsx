import { useNavigate } from "react-router-dom"; 


import SpeciesDetailsDialog from "./especiedialog";
import { getEspecies, deleteEspecie } from '../../apis/Especie';
import { useEffect, useState } from "react";




const ListEspecies = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: especies, error } = await getEspecies();
      if (!error && Array.isArray(especies)) {
        setData(especies);
      } else {
        setData([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleRowClick = (species) => {
    console.log("Datos enviados al formulario (view):", { species, mode: "view" });
    navigate("/form", { state: { species, mode: "view" } });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSpecies(null);
  };

  const handleAddClick = () => {
    console.log("Datos enviados al formulario (add):", { species: null, mode: "add" });
    navigate("/form", { state: { species: null, mode: "add" } });
  };

  const handleEditClick = (e, species) => {
    e.stopPropagation();
    console.log("Datos enviados al formulario (edit):", { species: { ...species }, mode: "edit" });
    navigate("/form", { state: { species: { ...species }, mode: "edit" } });
  };

  const handleDeleteClick = async (e, species) => {
    e.stopPropagation();
    if (window.confirm(`¿Seguro que deseas eliminar ${species.scientificName || species.nombre}?`)) {
      console.log("Eliminando especie con ID:", species.id);
      await deleteEspecie(species.id);
      setData((prev) => prev.filter((item) => item.id !== species.id));
    }
  };

  const handleViewDetailsClick = (e, species) => {
    e.stopPropagation();
    setSelectedSpecies(species);
    setIsDialogOpen(true);
  };

  const filteredData = data.filter((item) =>
    (item.scientificName || item.nombre || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
     <div>
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
            onClick={handleAddClick} // Use handleAddClick
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
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">Cargando...</td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(item)}
                >
                  <td className="p-3">{item.scientificName || item.nombre}</td>
                  <td className="p-3">{item.country || item.pais}</td>
                  <td className="p-3">{item.coordenadas || item.decimalLatitude + ', ' + item.decimalLongitude || '-'}</td>
                  <td className="p-3">{item.year || item.anio || '-'}</td>
                  <td className="p-3">{item.basisOfRecord || item.base}</td>
                  <td className="p-3">{item.datasetName || item.conjunto}</td>
                  <td className="p-3">{item.rightsHolder || item.publicador}</td>
                  <td className="p-3 flex gap-2">
                
                    <span
                      title="Ver Detalles"
                      className="cursor-pointer text-blue-500 text-xl hover:text-blue-700"
                      onClick={(e) => handleViewDetailsClick(e, item)}
                    >
                      🛈
                    </span>
                
                    <span
                      title="Editar"
                      className="cursor-pointer text-green-500 text-xl hover:text-green-700"
                      onClick={(e) => handleEditClick(e, item)}
                    >
                      ✏️
                    </span>
                 
                    <span
                      title="Eliminar"
                      className="cursor-pointer text-red-500 text-xl hover:text-red-700"
                      onClick={(e) => handleDeleteClick(e, item)}
                    >
                      🗑️
                    </span>
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
</div>
  );
};

export default ListEspecies;
