import React, { useEffect, useRef } from "react"

const ComentariosDialog = ({ isOpen, onClose, species, comentarios, onHecho }) => {
    const dialogRef = useRef(null)

    useEffect(() => {
        if (isOpen) dialogRef.current?.showModal()
        else dialogRef.current?.close()
    }, [isOpen])

    if (!species) return null

    return (
        <dialog ref={dialogRef} className="rounded-lg p-0 w-full max-w-lg bg-white shadow-lg" onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-bold mb-4 text-center">Comentarios de la especie</h2>
                <div className="mb-2 text-gray-700 font-semibold text-center">{species?.scientificName || species?.nombre}</div>
                <div className="max-h-96 overflow-y-auto">
                    {comentarios.length > 0 ? (
                        comentarios.map((c) => (
                            <div key={c.id} className="mb-4 p-3 border rounded bg-gray-50">
                                <div className="text-sm text-gray-800 mb-1">{c.cuerpo}</div>
                                <div className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</div>
                                <div className="text-xs text-gray-600">{c.perfiles?.full_name || c.author_id}</div>
                                <div className="mt-1 flex items-center gap-2">
                                    {c.aprobado ? (
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                            Resuelto
                                        </span>
                                    ) : (
                                        <>
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                                                Pendiente
                                            </span>
                                            <button
                                                className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                                                onClick={() => onHecho(c)}
                                            >
                                                Hecho
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">No hay comentarios para esta especie.</div>
                    )}
                </div>
                <button onClick={onClose} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Cerrar
                </button>
            </div>
        </dialog>
    )
}

export default ComentariosDialog
