import { useState, useEffect } from "react";
import { Pencil, Trash } from "lucide-react";
import {  updateComentario, deleteComentario, getComentariosByAuthor } from "../../apis/Comentarios";






export default function ObservationsTable() {
  const [observations, setObservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    async function fetchComentarios() {
      const comentarios = await getComentariosByAuthor();
      const mapped = comentarios.map(c => ({
        id: c.id,
        encargado: c.profiles?.full_name || c.author_id,
        department: '',
        observation: c.cuerpo,
        especie : c.especies?.scientificName || 'Desconocida',
        created_at: c.created_at
      }));
      setObservations(mapped);
    }
    fetchComentarios();
  }, []);

  const handleEdit = (id) => {
    const obs = observations.find(o => o.id === id);
    setEditingId(id);
    setEditValue(obs ? obs.observation : "");
  };

  const handleEditSave = async () => {
    await updateComentario(editingId, editValue);
    setObservations(obs => obs.map(o => o.id === editingId ? { ...o, observation: editValue } : o));
    setEditingId(null);
    setEditValue("");
  };

  const handleDelete = async (id) => {
    await deleteComentario(id);
    setObservations(observations.filter((obs) => obs.id !== id));
  };

  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Correcciones de Observaciones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="text-left px-6 py-4">Encargado</th>
              <th className="text-left px-6 py-4">Observación</th>
              <th className="text-left px-6 py-4">Fecha</th>
              <th className="text-left px-6 py-4">Especie</th>
              <th className="text-center px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {observations.map((obs) => (
              <tr key={obs.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{obs.encargado}</td>
                <td className="px-6 py-4 text-gray-800">
                  {editingId === obs.id ? (
                    <>
                      <input
                        type="text"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        className="border p-1 rounded w-full"
                      />
                      <button onClick={handleEditSave} className="ml-2 bg-green-500 text-white px-2 py-1 rounded">Guardar</button>
                      <button onClick={() => { setEditingId(null); setEditValue(""); }} className="ml-2 bg-gray-400 text-white px-2 py-1 rounded">Cancelar</button>
                    </>
                  ) : (
                    obs.observation
                  )}
                </td>
                <td className="px-6 py-4 text-gray-800">{new Date(obs.created_at).toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-800">{obs.especie}</td>
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
                <td colSpan="5" className="px-6 py-6 text-center text-gray-500">
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
