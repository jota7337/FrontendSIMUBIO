const Taxon = () => {

  const labelCon = "text-gray-600 text-sm mb-1";
  const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";

    return (
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        
              <div  className="flex flex-col">
                <label className={labelCon}>ID del taxón</label>
                <input
                  type="text"
                  className={InputCon}
                  name="taxonID"
                />
                </div>
                 <div  className="flex flex-col">
                  <label className={labelCon}>ID del nombre científico</label>
                <input
                  type="text"
                  className={InputCon}
                  name="scientificNameID"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Reino</label>
                <input
                  type="text"
                  className={InputCon}
                  name="kingdom"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Filo</label>
                <input
                  type="text"
                  className={InputCon}
                  name="phylum"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Clase</label>
                <input
                  type="text"
                  className={InputCon}
                  name="class"
                />
              </div>  <div  className="flex flex-col">
                  <label className={labelCon}>Orden</label>
                <input
                  type="text"
                  className={InputCon}
                  name="order"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Familia</label>
                <input
                  type="text"
                  className={InputCon}
                  name="family"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Subfamilia</label>
                <input
                  type="text"
                  className={InputCon}
                  name="subfamily"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Género</label>
                <input
                  type="text"
                  className={InputCon}
                  name="genus"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Nombre genérico</label>
                <input
                  type="text"
                  className={InputCon}
                  name="genericName"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Isla</label>
                <input
                  type="text"
                  className={InputCon}
                  name="island"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Subgénero</label>
                <input
                  type="text"
                  className={InputCon}
                  name="subgenus"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Clasificación superior</label>
                <input
                  type="text"
                  className={InputCon}
                  name="infragenericEpithet"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Departamento</label>
                <input
                  type="text"
                  className={InputCon}
                  name="stateProvince"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Epíteto específico</label>
                <input
                  type="text"
                  className={InputCon}
                  name="specificEpithet"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Epíteto infragenérico</label>
                <input
                  type="text"
                  className={InputCon}
                  name="infraspecificEpithet"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Epíteto cultivar</label>
                <input
                  type="text"
                  className={InputCon}
                  name="cultivarEpithet"
                />
              </div>
           
          </div>
         
          
    );
}

export default Taxon