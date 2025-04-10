import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TaxonSchema } from "../../../lib/validations";

const Taxon = () => {

  const labelCon = "text-gray-600 text-sm mb-1";
  const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";
 

      const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm({
          resolver: zodResolver(TaxonSchema),
        });
      
        const onSubmit = (data) => {
          console.log("Datos válidos:", data);
        };

  const campos = [
    { label: "ID del taxón", name: "taxonID" },
    { label: "ID del nombre científico", name: "scientificNameID" },
    { label: "Reino", name: "kingdom" },
    { label: "Filo", name: "phylum" },
    { label: "Clase", name: "class" },
    { label: "Orden", name: "order" },
    { label: "Familia", name: "family" },
    { label: "Subfamilia", name: "subfamily" },
    { label: "Género", name: "genus" },
    { label: "Nombre genérico", name: "genericName" },
    { label: "Isla", name: "island" },
    { label: "Subgénero", name: "subgenus" },
    { label: "Clasificación superior", name: "infragenericEpithet" },
    { label: "Departamento", name: "stateProvince" },
    { label: "Epíteto específico", name: "specificEpithet" },
    { label: "Epíteto infragenérico", name: "infraspecificEpithet" },
    { label: "Epíteto cultivar", name: "cultivarEpithet" },
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

export default Taxon