import { useState, useEffect } from "react"
import { supabase } from "../supabase/client"
import { useLocation, useNavigate } from "react-router-dom"
import { createEspecie, updateEspecie, deleteEspecie } from "../apis/Especie"
import { createComentario } from "../apis/Comentarios"
import EspeciesForm from "../components/especies/form/especiesForm"
import { DatosSchema, EventoSchema, FamilySchema, OtherSchema, RegistreSchema, TaxonSchema } from "../lib/validations"
import { camposDatos, camposEvento, camposFamilia, camposOtros, camposRegsitre, camposTaxon } from "../lib/fields"

const Form = () => {
    const navigate = useNavigate()
    const [activeForm, setActiveForm] = useState(null)
    const location = useLocation()
    const [formData, setFormData] = useState({})
    const [editingId, setEditingId] = useState(null)
    const [comentario, setComentario] = useState("")
    const [campoComentario, setCampoComentario] = useState("")
    const [showComentarioModal, setShowComentarioModal] = useState(false)
    // Detectar modo curador
    const isCuradorMode = location.state?.mode === "curador"

    // Obtener campos según sección activa
    const camposPorSeccion = {
        1: camposRegsitre,
        2: camposTaxon,
        3: camposEvento,
        4: camposOtros,
        5: camposFamilia,
        6: camposDatos,
    }
    const camposActuales = camposPorSeccion[activeForm] || []

    useEffect(() => {
        if (location.state && location.state.species) {
            setFormData(location.state.species)
            setEditingId(location.state.species.id || null)
        }
    }, [location.state])

    const handleButtonClick = (formIndex) => {
        setActiveForm(formIndex)
    }

    const handleSectionChange = (sectionData) => {
        setFormData((prev) => ({ ...prev, ...sectionData }))
    }

    const handleCreate = async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData?.user?.id) {
            alert("No se pudo obtener el usuario actual")
            return
        }
        const userId = userData.user.id
        const { data, error } = await createEspecie(formData, userId)
        if (error) alert("Error al crear especie")
        else {
            alert("Especie creada")
            navigate("/especies")
        }
    }

    // Función para enviar comentario a Supabase
    const handleEnviarComentario = async () => {
        if (!editingId || !comentario.trim() || !campoComentario) {
            alert("Debes escribir un comentario y seleccionar el campo")
            return
        }
        try {
            const { data, error } = await createComentario({ especieId: editingId, cuerpo: comentario, campo: campoComentario })
            if (error) alert("Error al crear comentario")
            else {
                alert("Comentario enviado")
                setComentario("")
                setCampoComentario("")
                setShowComentarioModal(false)
            }
        } catch (error) {
            alert("Error al enviar comentario")
            console.error(error)
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return alert("No hay especie para actualizar")

        const { data, error } = await updateEspecie(editingId, formData)

        if (error) alert("Error al actualizar especie")
        else {
            alert("Especie actualizada")
            navigate("/especies")
        }
    }

    const handleDelete = async () => {
        if (!editingId) return alert("No hay especie para eliminar")

        const { data, error } = await deleteEspecie(editingId)
        if (error) alert("Error al eliminar especie")
        else alert("Especie eliminada")
    }

    const handleGoToDashboard = () => {
        window.location.href = "/"
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
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
                    className={`px-4 py-2 rounded ${activeForm === 1 ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                    Información del evento
                </button>
                <button
                    onClick={() => handleButtonClick(2)}
                    className={`px-4 py-2 rounded ${activeForm === 2 ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                    Taxonomía
                </button>
                <button
                    onClick={() => handleButtonClick(3)}
                    className={`px-4 py-2 rounded ${activeForm === 3 ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                    Información del espécimen
                </button>
                <button
                    onClick={() => handleButtonClick(4)}
                    className={`px-4 py-2 rounded ${activeForm === 4 ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                    Georreferenciación
                </button>
                <button
                    onClick={() => handleButtonClick(5)}
                    className={`px-4 py-2 rounded ${activeForm === 5 ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                    Lugar del evento
                </button>
                <button
                    onClick={() => handleButtonClick(6)}
                    className={`px-4 py-2 rounded ${activeForm === 6 ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                    Información del registro
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 w-11/12 md:w-8/12 lg:w-6/12">
                <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Formulario SIB</h3>
                {activeForm === 1 && (
                    <EspeciesForm
                        initialData={formData}
                        onChange={handleSectionChange}
                        zodSchema={RegistreSchema}
                        fields={camposRegsitre}
                    />
                )}
                {activeForm === 2 && (
                    <EspeciesForm
                        initialData={formData}
                        onChange={handleSectionChange}
                        zodSchema={TaxonSchema}
                        fields={camposTaxon}
                    />
                )}
                {activeForm === 3 && (
                    <EspeciesForm
                        initialData={formData}
                        onChange={handleSectionChange}
                        zodSchema={EventoSchema}
                        fields={camposEvento}
                    />
                )}
                {activeForm === 4 && (
                    <EspeciesForm
                        initialData={formData}
                        onChange={handleSectionChange}
                        zodSchema={OtherSchema}
                        fields={camposOtros}
                    />
                )}
                {activeForm === 5 && (
                    <EspeciesForm
                        initialData={formData}
                        onChange={handleSectionChange}
                        zodSchema={FamilySchema}
                        fields={camposFamilia}
                    />
                )}
                {activeForm === 6 && (
                    <EspeciesForm
                        initialData={formData}
                        onChange={handleSectionChange}
                        zodSchema={DatosSchema}
                        fields={camposDatos}
                    />
                )}
            </div>

            <div className="flex space-x-2 mt-4">
                {!editingId ? (
                    <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Crear
                    </button>
                ) : (
                    <button onClick={handleUpdate} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                        Actualizar
                    </button>
                )}
            </div>

            {/* Espacio para dejar comentario solo en modo curador */}
            {isCuradorMode && (
                <div className="mt-6 w-full flex flex-col items-center">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => setShowComentarioModal(true)}
                    >
                        Dejar comentario
                    </button>
                </div>
            )}

            {/* Modal para dejar comentario */}
            {showComentarioModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                            onClick={() => setShowComentarioModal(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4 text-center">Deja un comentario como curador</h2>
                        <label className="block mb-2 font-medium">Selecciona el campo:</label>
                        <select
                            className="w-full p-2 border rounded mb-4"
                            value={campoComentario}
                            onChange={(e) => setCampoComentario(e.target.value)}
                        >
                            <option value="">-- Selecciona campo --</option>
                            {camposActuales.map((campo, idx) => (
                                <option key={idx} value={campo.name || campo.label || campo}>
                                    {campo.label || campo.name || campo}
                                </option>
                            ))}
                        </select>
                        <textarea
                            className="w-full p-2 border rounded mb-4"
                            rows={4}
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Escribe tu comentario aquí..."
                        />
                        <div className="flex justify-center">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={handleEnviarComentario}
                            >
                                Enviar comentario
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={handleGoToDashboard} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
                Volver
            </button>
        </div>
    )
}

export default Form
