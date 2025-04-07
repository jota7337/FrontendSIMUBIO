const Registre = () => {

  const labelCon = "text-gray-600 text-sm mb-1";
  const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";

    return (
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        
              <div  className="flex flex-col">
                <label className={labelCon}>Georreferenciado por</label>
                <input
                  type="text"
                  className={InputCon}
                  name="georeferencedBy"
                />
                </div>
                 <div  className="flex flex-col">
                  <label className={labelCon}>Fecha de georreferenciación</label>
                <input
                  type="text"
                  className={InputCon}
                  name="georeferencedDate"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Protocolo de georreferenciación</label>
                <input
                  type="text"
                  className={InputCon}
                  name="georeferenceProtocol"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>ID de la identificación</label>
                <input
                  type="text"
                  className={InputCon}
                  name="identificationID"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Identificado por</label>
                <input
                  type="text"
                  className={InputCon}
                  name="identifiedBy"
                />
              </div>  <div  className="flex flex-col">
                  <label className={labelCon}>ID de la identificación</label>
                <input
                  type="text"
                  className={InputCon}
                  name="identifiedByID"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Fecha de identificación</label>
                <input
                  type="text"
                  className={InputCon}
                  name="dateIdentified"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Referencias de la identificación</label>
                <input
                  type="text"
                  className={InputCon}
                  name="identificationReferences"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Estado de la verificación de la identificación</label>
                <input
                  type="text"
                  className={InputCon}
                  name="identificationVerificationStatus"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Identificación original</label>
                <input
                  type="text"
                  className={InputCon}
                  name="verbatimIdentification"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Comentarios de la Identificación</label>
                <input
                  type="text"
                  className={InputCon}
                  name="identificationRemarks"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Calificador de la identificación</label>
                <input
                  type="text"
                  className={InputCon}
                  name="identificationQualifier"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Código del país</label>
                <input
                  type="text"
                  className={InputCon}
                  name="countryCode"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Nombre científico</label>
                <input
                  type="text"
                  className={InputCon}
                  name="scientificName"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Autoría del nombre científico</label>
                <input
                  type="text"
                  className={InputCon}
                  name="scientificNameAuthorship"
                />
              </div>
          </div>
         
          
    );
}

export default Registre