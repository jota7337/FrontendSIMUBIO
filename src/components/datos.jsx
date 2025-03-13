const Datos = () => {
  const labelCon = "text-gray-600 text-sm mb-1";
  const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";

    return (
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        
              <div  className="flex flex-col">
                <label className={labelCon}>ID del registro biológico</label>
                <input
                  type="text"
                  className={InputCon}
                  name="occurrenceID"
                />
                </div>
                 <div  className="flex flex-col">
                  <label className={labelCon}>Base del registro</label>
                <input
                  type="text"
                  className={InputCon}
                  name="basisOfRecord"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Tipo</label>
                <input
                  type="text"
                  className={InputCon}
                  name="type"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Código de la institución</label>
                <input
                  type="text"
                  className={InputCon}
                  name="institutionCode"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>ID de la institución</label>
                <input
                  type="text"
                  className={InputCon}
                  name="institutionID"
                />
              </div>  <div  className="flex flex-col">
                  <label className={labelCon}>Código de la colección</label>
                <input
                  type="text"
                  className={InputCon}
                  name="collectionCode"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>ID de la colección</label>
                <input
                  type="text"
                  className={InputCon}
                  name="collectionID"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Número de catálogo</label>
                <input
                  type="text"
                  className={InputCon}
                  name="catalogNumber"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Nombre del conjunto de datos</label>
                <input
                  type="text"
                  className={InputCon}
                  name="datasetName"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>ID del conjunto de datos</label>
                <input
                  type="text"
                  className={InputCon}
                  name="datasetID"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Modificado</label>
                <input
                  type="text"
                  className={InputCon}
                  name="modified"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Idioma</label>
                <input
                  type="text"
                  className={InputCon}
                  name="language"
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
                  <label className={labelCon}>Titular de los derechos</label>
                <input
                  type="text"
                  className={InputCon}
                  name="rightsHolder"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Derechos de acceso</label>
                <input
                  type="text"
                  className={InputCon}
                  name="accessRights"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Propiedades dinámicas</label>
                <input
                  type="text"
                  className={InputCon}
                  name="dynamicProperties"
                />
              </div>
           
          </div>
         
          
    );
}

export default Datos