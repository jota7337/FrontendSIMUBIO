import React, { useEffect, useRef } from "react";

const SpeciesDetailsDialog = ({ isOpen, onClose, species }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [isOpen]);

  if (!species) return null;

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg p-0 w-full max-w-3xl bg-white shadow-lg"
      onClose={onClose}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 italic">{species.nombre}</h2>
        <p className="text-gray-600">{species.autor}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Registro</h3>
          <p><span className="font-semibold">Base del registro: </span>{species.base}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Taxón</h3>
          <p><span className="font-semibold">Reino: </span>{species.reino}</p>
          <p><span className="font-semibold">Orden: </span>{species.orden}</p>
          <p><span className="font-semibold">Familia: </span>{species.familia}</p>
          <p><span className="font-semibold">Género: </span>{species.genero}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Localización</h3>
          <p><span className="font-semibold">País o área: </span>{species.pais}</p>
          <p><span className="font-semibold">Coordenadas: </span>{species.coordenadas}</p>
          <p><span className="font-semibold">Departamento: </span>{species.departamento}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Cerrar
        </button>
      </div>
    </dialog>
  );
};

export default SpeciesDetailsDialog;
