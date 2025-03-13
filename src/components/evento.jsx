const Evento = () => {
  const labelCon = "text-gray-600 text-sm mb-1";
  const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";

    return (
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        
              <div  className="flex flex-col">
                <label className={labelCon}>Número de registro</label>
                <input
                  type="text"
                  className={InputCon}
                  name="recordNumber"
                />
                </div>
                 <div  className="flex flex-col">
                  <label className={labelCon}>Registrado por</label>
                <input
                  type="text"
                  className={InputCon}
                  name="recordedBy"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Número de individuos</label>
                <input
                  type="text"
                  className={InputCon}
                  name="individualCount"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Cantidad del organismo</label>
                <input
                  type="text"
                  className={InputCon}
                  name="organismQuantity"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Tipo de cantidad del organismo</label>
                <input
                  type="text"
                  className={InputCon}
                  name="organismQuantityType"
                />
              </div>  <div  className="flex flex-col">
                  <label className={labelCon}>Sexo</label>
                <input
                  type="text"
                  className={InputCon}
                  name="sex"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Etapa de vida</label>
                <input
                  type="text"
                  className={InputCon}
                  name="lifeStage"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Comportamiento</label>
                <input
                  type="text"
                  className={InputCon}
                  name="behavior"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Medios de establecimiento</label>
                <input
                  type="text"
                  className={InputCon}
                  name="establishmentMeans"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Estado del registro biológico</label>
                <input
                  type="text"
                  className={InputCon}
                  name="occurrenceStatus"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Preparaciones</label>
                <input
                  type="text"
                  className={InputCon}
                  name="preparations"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Disposición</label>
                <input
                  type="text"
                  className={InputCon}
                  name="disposition"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Derechos</label>
                <input
                  type="text"
                  className={InputCon}
                  name="license"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Otros números de catálogo</label>
                <input
                  type="text"
                  className={InputCon}
                  name="otherCatalogNumbers"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Comentarios del registro biológico</label>
                <input
                  type="text"
                  className={InputCon}
                  name="occurrenceRemarks"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>ID del evento</label>
                <input
                  type="text"
                  className={InputCon}
                  name="eventID"
                />
              </div>
           
          </div>
         
          
    );
}


export default Evento