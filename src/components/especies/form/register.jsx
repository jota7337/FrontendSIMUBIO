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
  { label: "ID del contexto geológico", name: "geologicalContextID" },
  { label: "Eón más antiguo o eonotema más bajo", name: "earliestEonOrLowestEonothem" },
  { label: "Eón más reciente o eonotema más alto", name: "latestEonOrHighestEonothem" },
  { label: "Era más antigua o eratema más bajo", name: "earliestEraOrLowestErathem" },
  { label: "Era más reciente o eratema más alto", name: "latestEraOrHighestErathem" },
  { label: "Período más antiguo o sistema más bajo", name: "earliestPeriodOrLowestSystem" },
  { label: "Período más reciente o sistema más alto", name: "latestPeriodOrHighestSystem" },
  { label: "Época más antigua o serie más baja", name: "earliestEpochOrLowestSeries" },
  { label: "Época más reciente o serie más alta", name: "latestEpochOrHighestSeries" },
  { label: "Edad más antigua o etapa más baja", name: "earliestAgeOrLowestStage" },
  { label: "Edad más reciente o etapa más alta", name: "latestAgeOrHighestStage" },
  { label: "Zona bioestratigráfica más baja", name: "lowestBiostratigraphicZone" },
  { label: "Zona bioestratigráfica más alta", name: "highestBiostratigraphicZone" },
  { label: "Términos litoestratigráficos", name: "lithostratigraphicTerms" },
  { label: "Grupo", name: "group" },
  { label: "Formación", name: "formation" },
  { label: "Miembro", name: "member" },
  { label: "Capa", name: "bed" },
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