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
  { label: "Nombre científico", name: "scientificName" },
  { label: "Autoría del nombre científico", name: "scientificNameAuthorship" },
  { label: "Clasificación superior", name: "higherClassification" },
  { label: "Reino", name: "kingdom" },
  { label: "Filo", name: "phylum" },
  { label: "Clase", name: "class" },
  { label: "Orden", name: "order" },
  { label: "Familia", name: "family" },
  { label: "Subfamilia", name: "subfamily" },
  { label: "Género", name: "genus" },
  { label: "Nombre genérico", name: "genericName" },
  { label: "Subgénero", name: "subgenus" },
  { label: "Epíteto infragenérico", name: "infragenericEpithet" },
  { label: "Epíteto específico", name: "specificEpithet" },
  { label: "Epíteto infragenérico", name: "infraspecificEpithet" },
  { label: "Epíteto cultivar", name: "cultivarEpithet" },
  { label: "Rango del taxón", name: "taxonRank" },
  { label: "Rango del taxón original", name: "verbatimTaxonRank" },
  { label: "Nombre vernáculo", name: "vernacularName" },
  { label: "Estado taxonómico", name: "taxonomicStatus" },
  { label: "Uso del nombre aceptado", name: "acceptedNameUsage" },
  { label: "ID del uso del nombre aceptado", name: "acceptedNameUsageID" },
  { label: "Uso del nombre del padre", name: "parentNameUsage" },
  { label: "ID del uso del nombre del padre", name: "parentNameUsageID" },
  { label: "Uso del nombre original", name: "originalNameUsage" },
  { label: "ID del uso del nombre original", name: "originalNameUsageID" },
  { label: "Nombre según", name: "nameAccordingTo" },
  { label: "ID del nombre según", name: "nameAccordingToID" },
  { label: "Publicado en", name: "namePublishedIn" },
  { label: "ID de publicación", name: "namePublishedInID" },
  { label: "Año de publicación", name: "namePublishedInYear" },
  { label: "ID del concepto del taxón", name: "taxonConceptID" },
  { label: "Código nomenclatural", name: "nomenclaturalCode" },
  { label: "Estado nomenclatural", name: "nomenclaturalStatus" },
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

export default Taxon