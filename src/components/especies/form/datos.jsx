import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatosSchema } from "../../../lib/validations";



const labelCon = "text-gray-600 text-sm mb-1";
const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";

function Datos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DatosSchema),
  });

  const onSubmit = (data) => {
    console.log("Datos válidos:", data);
  };

  const campos = [
    { label: "ID del registro biológico", name: "occurrenceID" },
    {
      label: "Base del registro",
      name: "basisOfRecord",
      type: "select",
      options: [
        "PreservedSpecimen",
        "LivingSpecimen",
        "HumanObservation",
        "MachineObservation",
        "MaterialSample",
        "FossilSpecimen",
      ],
    },
    {
      label: "Tipo",
      name: "type",
      type: "select",
      options: [
        "PhysicalObject",
        "Event",
        "StillImage",
        "MovingImage",
        "Sound",
      ],
    },
    { label: "Idioma", name: "language" },
    { label: "Código de la institución", name: "institutionCode" },
    { label: "ID de la institución", name: "institutionID" },
    { label: "Código de la colección", name: "collectionCode" },
    { label: "ID de la colección", name: "collectionID" },
    { label: "Número de catálogo", name: "catalogNumber" },
    { label: "Nombre del conjunto de datos", name: "datasetName" },
    { label: "ID del conjunto de datos", name: "datasetID" },
    { label: "Modificado", name: "modified" },
    { label: "Licencia", name: "license" },
    { label: "Titular de los derechos", name: "rightsHolder" },
    { label: "Derechos de acceso", name: "accessRights" },
    { label: "Código de la institución propietaria", name: "ownerInstitutionCode" },
    { label: "Información retenida", name: "informationWithheld" },
    { label: "Generalizaciones de datos", name: "dataGeneralizations" },
    { label: "Propiedades dinámicas", name: "dynamicProperties" },
    { label: "Cita bibliográfica", name: "bibliographicCitation" },
    { label: "Referencias", name: "references" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {campos.map(({ label, name, type, options }) => (
        <div key={name} className="flex flex-col">
          <label className={labelCon}>{label}</label>
          {type === "select" ? (
            <select className={InputCon} {...register(name)}>
              <option value="">Seleccione una opción</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
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

export default Datos;
