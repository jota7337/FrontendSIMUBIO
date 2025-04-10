
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TaxonRankSchema } from "../../../lib/validations";

const TaxonRank = () => {

    const labelCon = "text-gray-600 text-sm mb-1";
    const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(TaxonRankSchema),
      });
    
      const onSubmit = (data) => {
        console.log("Datos válidos:", data);
      };
    
    const campos = [
      { label: "Categoría del taxón", name: "taxonRank" },
      { label: "Categoría original del taxón", name: "verbatimTaxonRank" },
      { label: "Nombre común", name: "vernacularName" },
      { label: "Estado taxonómico", name: "taxonomicStatus" },
      { label: "Nombre aceptado usado", name: "acceptedNameUsage" },
      { label: "Código nomenclatural", name: "nomenclaturalCode" },
      { label: "Comentarios del taxón", name: "taxonRemarks" },
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
  
  export default TaxonRank