const Others = () => {
  const labelCon = "text-gray-600 text-sm mb-1";
  const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";

    return (
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        
              <div  className="flex flex-col">
                <label className={labelCon}>Elevación original</label>
                <input
                  type="text"
                  className={InputCon}
                  name="verbatimElevation"
                />
                </div>
                 <div  className="flex flex-col">
                  <label className={labelCon}>Elevación mínima en metros</label>
                <input
                  type="text"
                  className={InputCon}
                  name="minimumElevationInMeters"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Elevación máxima en metros</label>
                <input
                  type="text"
                  className={InputCon}
                  name="maximumElevationInMeters"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Datum vertical</label>
                <input
                  type="text"
                  className={InputCon}
                  name="verticalDatum"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Profundidad original</label>
                <input
                  type="text"
                  className={InputCon}
                  name="verbatimDepth"
                />
              </div>  <div  className="flex flex-col">
                  <label className={labelCon}>Profundidad mínima en metros</label>
                <input
                  type="text"
                  className={InputCon}
                  name="minimumDepthInMeters"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Profundidad máxima en metros</label>
                <input
                  type="text"
                  className={InputCon}
                  name="maximumDepthInMeters"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Ubicación de acuerdo con</label>
                <input
                  type="text"
                  className={InputCon}
                  name="locationAccordingTo"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Comentarios de la ubicación</label>
                <input
                  type="text"
                  className={InputCon}
                  name="locationRemarks"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Latitud original</label>
                <input
                  type="text"
                  className={InputCon}
                  name="verbatimLatitude"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Longitud original</label>
                <input
                  type="text"
                  className={InputCon}
                  name="verbatimLongitude"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Coordenadas originales</label>
                <input
                  type="text"
                  className={InputCon}
                  name="verbatimCoordinates"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Sistema original de coordenadas</label>
                <input
                  type="text"
                  className={InputCon}
                  name="verbatimCoordinateSystem"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>SRS original</label>
                <input
                  type="text"
                  className={InputCon}
                  name="verbatimSRS"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Latitud decimal</label>
                <input
                  type="text"
                  className={InputCon}
                  name="decimalLatitude"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Longitud decimal</label>
                <input
                  type="text"
                  className={InputCon}
                  name="decimalLongitude"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Datum geodésico</label>
                <input
                  type="text"
                  className={InputCon}
                  name="geodeticDatum"
                />
              </div>
           
          </div>
         
          
    );
}


export default Others