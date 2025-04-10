
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegistreSchema } from "../../../lib/validations";
import React from "react";

const Registre = () => {

  const labelCon = "text-gray-600 text-sm mb-1";
  const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";

const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistreSchema),
  });

  const onSubmit = (data) => {
    console.log("Datos válidos:", data);
  };

  const campos = [
    {label : "Georreferenciado por", name: "georeferencedBy"},
    {label : "Fecha de georreferenciación", name: "georeferencedDate"},
    {label : "Protocolo de georreferenciación", name: "georeferenceProtocol"},
    {label : "ID de la identificación", name: "identificationID"},
    {label : "Identificado por", name: "identifiedBy"},
    {label : "ID de la identificación", name: "identifiedByID"},
    {label : "Fecha de identificación", name: "dateIdentified"},
    {label : "Referencias de la identificación", name: "identificationReferences"},
    {label : "Estado de la verificación de la identificación", name: "identificationVerificationStatus"},
    {label : "Identificación original", name: "verbatimIdentification"},
    {label : "Comentarios de la Identificación", name: "identificationRemarks"},
    {label : "Calificador de la identificación", name: "identificationQualifier"},
    {label : "Código del país", name: "countryCode"},
    {label : "Nombre científico", name: "scientificName"},
    {label : "Autoría del nombre científico", name: "scientificNameAuthorship"},


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

export default Registre