import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OtherSchema } from "../../../lib/validations";

const Others = () => {
  const labelCon = "text-gray-600 text-sm mb-1";
  const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";
 
  
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(OtherSchema),
    });
  
    const onSubmit = (data) => {
      console.log("Datos válidos:", data);
    };

  const campos = [
  { label: "ID de la ubicación", name: "locationID" },
  { label: "Geografía superior", name: "higherGeography" },
  { label: "ID de la geografía superior", name: "higherGeographyID" },
  { label: "Continente", name: "continent" },
  { label: "Cuerpo de agua", name: "waterBody" },
  { label: "Grupo de islas", name: "islandGroup" },
  { label: "Isla", name: "island" },
  { label: "País", name: "country" },
  { label: "Código del país", name: "countryCode" },
  { label: "Estado/Provincia", name: "stateProvince" },
  { label: "Condado", name: "county" },
  { label: "Municipio", name: "municipality" },
  { label: "Localidad", name: "locality" },
  { label: "Localidad original", name: "verbatimLocality" },
  { label: "Elevación original", name: "verbatimElevation" },
  { label: "Elevación mínima en metros", name: "minimumElevationInMeters" },
  { label: "Elevación máxima en metros", name: "maximumElevationInMeters" },
  { label: "Datum vertical", name: "verticalDatum" },
  { label: "Profundidad original", name: "verbatimDepth" },
  { label: "Profundidad mínima en metros", name: "minimumDepthInMeters" },
  { label: "Profundidad máxima en metros", name: "maximumDepthInMeters" },
  { label: "Distancia mínima sobre la superficie en metros", name: "minimumDistanceAboveSurfaceInMeters" },
  { label: "Distancia máxima sobre la superficie en metros", name: "maximumDistanceAboveSurfaceInMeters" },
  { label: "Ubicación de acuerdo con", name: "locationAccordingTo" },
  { label: "Comentarios de la ubicación", name: "locationRemarks" },
  { label: "Latitud original", name: "verbatimLatitude" },
  { label: "Longitud original", name: "verbatimLongitude" },
  { label: "Coordenadas originales", name: "verbatimCoordinates" },
  { label: "Sistema original de coordenadas", name: "verbatimCoordinateSystem" },
  { label: "SRS original", name: "verbatimSRS" },
  { label: "Latitud decimal", name: "decimalLatitude" },
  { label: "Longitud decimal", name: "decimalLongitude" },
  { label: "Datum geodésico", name: "geodeticDatum" },
  { label: "Incertidumbre de coordenadas en metros", name: "coordinateUncertaintyInMeters" },
  { label: "Precisión de coordenadas", name: "coordinatePrecision" },
  { label: "Ajuste espacial del radio del punto", name: "pointRadiusSpatialFit" },
  { label: "Huella WKT", name: "footprintWKT" },
  { label: "SRS de la huella", name: "footprintSRS" },
  { label: "Ajuste espacial de la huella", name: "footprintSpatialFit" },
  { label: "Georreferenciado por", name: "georeferencedBy" },
  { label: "Fecha de georreferenciación", name: "georeferencedDate" },
  { label: "Protocolo de georreferenciación", name: "georeferenceProtocol" },
  { label: "Fuentes de georreferenciación", name: "georeferenceSources" },
  { label: "Estado de verificación de georreferenciación", name: "georeferenceVerificationStatus" },
  { label: "Comentarios de georreferenciación", name: "georeferenceRemarks" },
]

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


export default Others