import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { obtenerComentarios, editarComentario, borrarComentario } from "../services/apiComentarios";
import { I_Comentario } from "../interfaces/I_comentarip";
import ModalReporte from "./Reporte";

interface ComentarioProps {
    comentario: I_Comentario;
    onActualizar: () => void;
    Fecha: (fechaIso: string) => string;
}

const Comentario: React.FC<ComentarioProps> = ({ comentario, onActualizar, Fecha }) => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [comenta, setComenta] = useState(comentario?.COMdescripcion)
    const [showConfirmDeleteComent, setShowConfirmDeleteComent] = useState(false);
    const [alerts, setAlerts] = useState<{ msg: string, type: 'success' | 'error' }[]>([]);
    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const ids = usuarioInfo.id

    const handleComentario = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setComenta(value);
    };

    const toggleFormulario = () => {
        setMostrarFormulario(!mostrarFormulario);
    }


    const showAlert = (msg: string, type: 'success' | 'error' = 'error') => {
        setAlerts([{ msg, type }]);
        setTimeout(() => setAlerts([]), 3000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await editarComentario(
                comentario?._id,
                comenta,
                "Editar"
            );
            showAlert("Comentario editado exitosamente", "success");
            toggleFormulario();
            onActualizar()
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                showAlert(`❌ ${error.response.data.error}`, "error");
            } else {
                alert("Error inesperado al editar el comentario");
            }
        }
    };

    const handleDeleteClick = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmDeleteComent(true);
    };

    const handleConfirmDelete = async () => {
        setShowConfirmDeleteComent(false);
        try {
            await borrarComentario(
                comentario?._id,
                false,
                "Borrar"
            );
            showAlert("Comentario borrado exitosamente", "success");
            onActualizar();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                showAlert(`❌ ${error.response.data.error}`, "error");
            } else {
                alert("Error inesperado al borrar el comentario");
            }
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmDeleteComent(false);
    };

    const [mostrarFormulario1, setMostrarFormulario1] = useState(false);

    const toggleFormulario1 = () => {
        setMostrarFormulario1(!mostrarFormulario1);

    }

    return (
        <>
            {alerts.map((alert, idx) => (
                <div key={idx} className={`fixed top-5 left-1/2 transform -translate-x-1/2 ${alert.type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white px-6 py-2 rounded-lg shadow-lg z-50`}>
                    {alert.msg}
                </div>
            ))}
            {mostrarFormulario1 && (<ModalReporte onToggle={toggleFormulario1} Tipo="com" idPublicacion={null} idUsuario={String(ids)} idComentario={String(comentario?._id)}></ModalReporte>)}

            <div className="bg-gray-400 mt-4 rounded lg:grid grid-cols-5">
                <div className="p-2 flex col-span-2">
                    <Link to={`/Perfil/${comentario?.COMusuario._id}`}>
                        <img src={comentario?.COMusuario.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"} alt=""
                            className=" size-30 border-4 border-slate-900 border-double" />
                    </Link>
                    <div className="text-white p-2">
                        <Link to={`/Perfil/${comentario?.COMusuario._id}`} className="hover:underline text-xl font-bold">{comentario?.COMusuario.nombre}</Link>

                        <p><strong>Fecha:</strong> {Fecha(comentario?.createdAt)}</p>

                        <button onClick={toggleFormulario1} className=" mt-2 hover:underline text-red-900">Reportar</button>
                    </div>
                </div>
                <div className="p-4 text-white col-span-2">

                    {mostrarFormulario ? (
                        <form action="/Perfil" onSubmit={handleSubmit}>
                            <textarea name="" id=""
                                className="bg-white text-black w-full my-2 rounded p-2"
                                value={comenta}
                                onChange={handleComentario}
                            ></textarea>

                            <button type="submit"
                                className="text-white font-bold  bg-slate-800 px-4 p-2 rounded hover:bg-slate-700 ">
                                Guardar
                            </button>
                        </form>
                    ) : (
                        <p className="text-white">{comentario?.COMdescripcion}</p>
                    )}
                </div>
                <div className="p-4">
                    {comentario?.COMusuario._id === ids && (
                        <>
                            <button onClick={toggleFormulario} className="font-bold hover:bg-slate-600  bg-slate-700 text-white px-4 p-2 rounded">Editar</button>
                            <button onClick={handleDeleteClick} className="font-bold hover:bg-red-600  bg-red-700 text-white px-4 mx-2 p-2 rounded">Borrar</button>
                        </>

                    )}
                </div>
            </div>

            {showConfirmDeleteComent && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/50 z-50">
                    <div className="bg-white/90 p-6 rounded-lg shadow-lg space-y-4 backdrop-blur-sm">
                        <p className="text-lg font-semibold">¿Estás seguro que deseas borrar este comentario?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                Borrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Comentario;