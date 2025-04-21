import React, { useState, useEffect } from "react";
import { crearReporte } from "../services/apiReporte";

/// Pantalla modal
interface ModalProps {
    onToggle: () => void;
    Tipo: string;
    idPublicacion:string | null,
    idUsuario:string
    idComentario:string | null
}

const ModalReporte: React.FC<ModalProps> = ({onToggle, Tipo, idPublicacion, idUsuario, idComentario}) => {

    const [descripcion, setDescripcion] = useState('')
    const handleDescripcion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDescripcion(value);
    };
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            await crearReporte(
                idUsuario,
                descripcion,
                Tipo,
                idPublicacion,
                idComentario
            );
            alert("Reporte exitoso");
            onToggle();

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al reportar");  // Fallback si el error no tiene mensaje específico
            }
        }
    };

    

    return (
        <>
            {/* Fondo oscuro semitransparente */}
            <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 z-50 flex items-center justify-center">
                {/* Contenido del modal */}
                <div className="bg-gray-200 rounded-lg p-6 shadow-md w-full max-w-md mx-4">
                    <p className="text-gray-800 font-semibold text-2xl text-center mb-6">
                        ¿Estás seguro que quieres proceder con esta acción?
                    </p>

                    <form onSubmit={handleSubmit}>
                        <label className="font-bold text-xl ">Razón:</label>
                        <textarea
                            className="bg-white w-full rounded p-2 mt-2 mb-4 border"
                            placeholder="Escribe tu queja aquí..."
                            value={descripcion}
                            onChange={handleDescripcion}
                        />

                        <div className="flex justify-center space-x-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition">
                                Sí, reportar
                            </button>

                            <button onClick={onToggle}
                                type="button"
                                className="px-6 py-2 bg-gray-500 hover:bg-gray-400 text-white font-bold rounded-lg transition">
                                No, regresar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ModalReporte