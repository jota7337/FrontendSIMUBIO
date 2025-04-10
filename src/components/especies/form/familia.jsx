import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { familySchema } from "../../../lib/validations";

const Familia = () => {

  const labelCon = "text-gray-600 text-sm mb-1";
  const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(familySchema),
    });
  
    const onSubmit = (data) => {
      console.log("Datos válidos:", data);
    };
  

  const campos = [
    { label: "Año", name: "year" },
    { label: "Mes", name: "month" },
    { label: "Día", name: "day" },
    { label: "Fecha original del evento", name: "verbatimEventDate" },
    { label: "Hora del evento", name: "eventTime" },
    { label: "Hábitat", name: "habitat" },
    { label: "Comentarios del evento", name: "eventRemarks" },
    { label: "ID de la ubicación", name: "locationID" },
    {
      label: "Continente",
      name: "continent",
      type: "select",
      options: [
        "América del Sur",
        "América del Norte",
        "África",
        "Asia",
        "Europa",
        "Oceanía",
        "Antártida",
      ],
    },
    { label: "Cuerpo de agua", name: "waterBody" },
    { label: "Isla", name: "island" },
    { label: "País", name: "country" },
    { label: "Código del país", name: "countryCode" },
    { label: "Departamento", name: "stateProvince" },
    { label: "Municipio", name: "county" },
    { label: "Centro poblado / Cabecera municipal", name: "municipality" },
    { label: "Localidad", name: "locality" },
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


export default Familia