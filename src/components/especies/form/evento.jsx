import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EventoSchema } from "../../../lib/validations";

const labelCon = "text-gray-600 text-sm mb-1";
const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";

function Evento() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EventoSchema),
  });

  const onSubmit = (data) => {
    console.log("Datos válidos:", data);
  };
  const campos = [
    { label: "Número de registro", name: "recordNumber" },
    { label: "Registrado por", name: "recordedBy" },
    { label: "ID del registrado por", name: "recordedByID" },
    { label: "ID del organismo", name: "organismID" },
    { label: "Número de individuos", name: "individualCount" },
    { label: "Cantidad del organismo", name: "organismQuantity" },
    { label: "Tipo de cantidad del organismo", name: "organismQuantityType" },
    { label: "Nombre del organismo", name: "organismName" },
    { label: "Alcance del organismo", name: "organismScope" },
    { label: "Organismos asociados", name: "associatedOrganisms" },
    { label: "Identificaciones previas", name: "previousIdentifications" },
    { label: "Comentarios del organismo", name: "organismRemarks" },
    { label: "Sexo", name: "sex" },
    { label: "Etapa de vida", name: "lifeStage" },
    { label: "Condición reproductiva", name: "reproductiveCondition" },
    { label: "Comportamiento", name: "behavior" },
    { label: "Medios de establecimiento", name: "establishmentMeans" },
    { label: "Grado de establecimiento", name: "degreeOfEstablishment" },
    { label: "Ruta", name: "pathway" },
    { label: "Estado del registro biológico", name: "occurrenceStatus" },
    { label: "Preparaciones", name: "preparations" },
    { label: "Disposición", name: "disposition" },
    { label: "Otros números de catálogo", name: "otherCatalogNumbers" },
    { label: "Medios asociados", name: "associatedMedia" },
    { label: "Registros asociados", name: "associatedOccurrences" },
    { label: "Referencias asociadas", name: "associatedReferences" },
    { label: "Secuencias asociadas", name: "associatedSequences" },
    { label: "Taxones asociados", name: "associatedTaxa" },
    { label: "Comentarios del registro biológico", name: "occurrenceRemarks" },
    { label: "ID de la muestra material", name: "materialSampleID" },
  ];

    return (
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {campos.map(({ label, name, type, options }) => (
        <div key={name} className="flex flex-col">
          <label className={labelCon}>{label}</label>
          {type === "select" ? (
            <select className={InputCon} {...register(name)}>
              <option value="">Seleccione una opción</option>
              {options.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          ) : (
            <input type="text" className={InputCon} {...register(name)} />
          )}
          {errors[name] && (
            <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>
          )}
        </div>
      ))}

      <div className="col-span-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Enviar
        </button>
      </div>
    </form>

         
          
    );
}


export default Evento