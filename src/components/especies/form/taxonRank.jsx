const TaxonRank = () => {

    const labelCon = "text-gray-600 text-sm mb-1";
    const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";
  
      return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          
                <div  className="flex flex-col">
                  <label className={labelCon}>Categoría del taxón</label>
                  <input
                    type="text"
                    className={InputCon}
                    name="taxonRank"
                  />
                  </div>
                   <div  className="flex flex-col">
                    <label className={labelCon}>Categoría original del taxón</label>
                  <input
                    type="text"
                    className={InputCon}
                    name="verbatimTaxonRank"
                  />
                </div>
                <div  className="flex flex-col">
                    <label className={labelCon}>Nombre común</label>
                  <input
                    type="text"
                    className={InputCon}
                    name="vernacularName"
                  />
                </div>
                <div  className="flex flex-col">
                    <label className={labelCon}>Estado taxonómico</label>
                  <input
                    type="text"
                    className={InputCon}
                    name="taxonomicStatus"
                  />
                </div>
                <div  className="flex flex-col">
                    <label className={labelCon}>Nombre aceptado usado</label>
                  <input
                    type="text"
                    className={InputCon}
                    name="acceptedNameUsage"
                  />
                </div>  <div  className="flex flex-col">
                    <label className={labelCon}>Código nomenclatural</label>
                  <input
                    type="text"
                    className={InputCon}
                    name="nomenclaturalCode"
                  />
                </div>
                <div  className="flex flex-col">
                    <label className={labelCon}>Comentarios del taxón</label>
                  <input
                    type="text"
                    className={InputCon}
                    name="taxonRemarks"
                  />
                </div>
            </div>
           
            
      );
  }
  
  export default TaxonRank