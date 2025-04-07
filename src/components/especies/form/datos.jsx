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
    { label: "Base del registro", name: "basisOfRecord" },
    { label: "Tipo", name: "type" },
    { label: "Código de la institución", name: "institutionCode" },
    { label: "ID de la institución", name: "institutionID" },
    { label: "Código de la colección", name: "collectionCode" },
    { label: "ID de la colección", name: "collectionID" },
    { label: "Número de catálogo", name: "catalogNumber" },
    { label: "Nombre del conjunto de datos", name: "datasetName" },
    { label: "ID del conjunto de datos", name: "datasetID" },
    { label: "Modificado", name: "modified" },
    { label: "Idioma", name: "language" },
    { label: "Licencia", name: "license" },
    { label: "Titular de los derechos", name: "rightsHolder" },
    { label: "Derechos de acceso", name: "accessRights" },
    { label: "Propiedades dinámicas", name: "dynamicProperties" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {campos.map(({ label, name }) => (
        <div key={name} className="flex flex-col">
          <label className={labelCon}>{label}</label>
          <input type="text" className={InputCon} {...register(name)} />
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
