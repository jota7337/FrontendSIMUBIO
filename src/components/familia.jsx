const Familia = () => {

  const labelCon = "text-gray-600 text-sm mb-1";
  const InputCon = "border border-gray-300 rounded-md p-2 mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600";

    return (
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        
              <div  className="flex flex-col">
                <label className={labelCon}>Año</label>
                <input
                  type="text"
                  className={InputCon}
                  name="year"
                />
                </div>
                 <div  className="flex flex-col">
                  <label className={labelCon}>Mes</label>
                <input
                  type="text"
                  className={InputCon}
                  name="month"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Día</label>
                <input
                  type="text"
                  className={InputCon}
                  name="day"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Fecha original del evento</label>
                <input
                  type="text"
                  className={InputCon}
                  name="verbatimEventDate"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Hora del evento</label>
                <input
                  type="text"
                  className={InputCon}
                  name="eventTime"
                />
              </div>  <div  className="flex flex-col">
                  <label className={labelCon}>Hábitat</label>
                <input
                  type="text"
                  className={InputCon}
                  name="habitat"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Comentarios del evento</label>
                <input
                  type="text"
                  className={InputCon}
                  name="eventRemarks"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>ID de la ubicación</label>
                <input
                  type="text"
                  className={InputCon}
                  name="locationID"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Continente</label>
                <input
                  type="text"
                  className={InputCon}
                  name="continent"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Cuerpo de agua</label>
                <input
                  type="text"
                  className={InputCon}
                  name="waterBody"
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
                  <label className={labelCon}>País</label>
                <input
                  type="text"
                  className={InputCon}
                  name="country"
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
                  <label className={labelCon}>Departamento</label>
                <input
                  type="text"
                  className={InputCon}
                  name="stateProvince"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Municipio</label>
                <input
                  type="text"
                  className={InputCon}
                  name="county"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Centro poblado / Cabecera municipal</label>
                <input
                  type="text"
                  className={InputCon}
                  name="municipality"
                />
              </div>
              <div  className="flex flex-col">
                  <label className={labelCon}>Localidad</label>
                <input
                  type="text"
                  className={InputCon}
                  name="locality"
                />
              </div>
           
          </div>
         
          
    );
}


export default Familia