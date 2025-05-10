import React, { useState, useRef, useEffect } from "react";
import { I_Reporte } from "../interfaces/I_Reporte";
import { actualizarReporte, obtenerReporte } from "../services/apiReporte";
import { borrarPublicacion } from "../services/apiPublicacion";
import { borrarComentario } from "../services/apiComentarios";

const Reportes: React.FC = () => {

    const [report, setReport] = useState<I_Reporte[]>([])

    const fetchReport = async () => {
        try {
            const data = await obtenerReporte();
            setReport(data);
        } catch (error) {
            console.error("Error al obtener los administradores:", error);
        }
    }

    useEffect(() => {
        fetchReport();
    }, [])
    return (
        <>
            <h1 className="font-bold text-2xl">Reportes</h1>
            <form action="" className="lg:flex lg:items-center  space-x-4 py-4">
                <div>
                    <label htmlFor="">Correo:</label>
                    <input type="text" className="bg-slate-200  w-full mb-2 rounded p-1 px-2" placeholder="usuario@mail.com" />

                </div>

                <div>

                    <label htmlFor="">Desde:</label>
                    <input type="date" name="" id="" className="bg-slate-200  mb-2 rounded p-1" />
                </div>

                <div>
                    <label htmlFor="">Hasta:</label>
                    <input type="date" name="" id="" className="bg-slate-200 mb-2 rounded p-1" />

                </div>

                <input type="submit" value="Buscar" className="bg-slate-600 mb-2 rounded p-1 px-4 text-white font-bold hover:bg-slate-500 " />
            </form>
            <div className="">
                {report.map((rep, index) => (
                    <Report key={index} reporteP={rep} fetch={fetchReport}></Report>

                ))}
            </div>
        </>
    )
}

export default Reportes;

interface ReporteProps {
    reporteP: I_Reporte
    fetch: () => void;
}
const Report: React.FC<ReporteProps> = ({ reporteP, fetch }) => {
    const formatearFecha = (fechaIso: string): string => {
        const fecha = new Date(fechaIso);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}-${mes}-${anio}`;
    };


    const [respuesta, setRespuesta] = useState('');
    const handleRespuesta = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setRespuesta(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            await actualizarReporte(
                reporteP?._id,
                respuesta,
                true
            );
            alert("Reporte actualizado");
            setRespuesta('')
            fetch();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al actualizar el reporte");  // Fallback si el error no tiene mensaje específico
            }
        }
    };

    const desactivarPublicacion = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await borrarPublicacion(
                reporteP?.REPpublicacion._id,
                false
            )
            alert('Publicacion borradoa')
            fetch();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  
            } else {
                alert("Error inesperado al borrar la publicacion");  }
        }
    };

    const desactivarComentario = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await borrarComentario(
                reporteP?.REPcomentario._id,
                false,
                "Borrar"
            )
            alert('Comentario borradoa')
            fetch();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);   } else {
                alert("Error inesperado al borrar el comentario");   }
        }
    };


    return (
        <>
            <div className="bg-slate-300 p-2 rounded mt-2">
                <div className="flex items-center space-x-2">
                    <img src={reporteP?.REPusuario.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"}
                        alt="" className="size-20" />
                    <div>
                        <p className="font-bold text-xl">{reporteP?.REPusuario.nombre}</p>
                        <p>{reporteP?.REPusuario.email}</p>
                        <div className="flex">
                            <p className="font-semibold mr-2">Fecha de reporte:</p> <p>{formatearFecha(reporteP?.createdAt)}</p>
                        </div>
                    </div>
                </div>
                <p>{reporteP?.REPdescripcion}</p>
                <div>
                    {reporteP?.REPtipo === 'pub' ? (
                        <div className={`${reporteP?.REPpublicacion.PUBestatus ? `bg-red-300` : `bg-green-300`} p-2 m-2 rounded`}>
                            <p><strong>Correo:</strong> {reporteP?.REPpublicacion.PUBusuario.email}</p>
                            <p><strong>Nombre de la publicacion:</strong>  {reporteP?.REPpublicacion.PUBnombre}</p>
                            {reporteP?.REPpublicacion.PUBestatus ? (
                                <button onClick={desactivarPublicacion} className="bg-red-500 hover:bg-red-400 p-2 font-bold text-white rounded">Borrar</button>

                            ): (
                                <p className="flex justify-center font-semibold text-xl">¡Publicación borrada!</p>
                            )}
                        </div>
                    ) : (
                        <div className={`${reporteP?.REPcomentario.COMestatus ? `bg-red-300` : `bg-green-300`} p-2 m-2 rounded`}>
                            <p><strong>Correo:</strong> {reporteP?.REPcomentario.COMusuario.email}</p>
                            <p><strong>Comentario:</strong>  {reporteP?.REPcomentario.COMdescripcion}</p>
                            
                            {reporteP?.REPcomentario.COMestatus ? (
                                <button onClick={desactivarComentario} className="bg-red-500 hover:bg-red-400 p-2 font-bold text-white rounded">Borrar</button>
                            ): (
                                <p className="flex justify-center font-semibold text-xl">¡Comentario borrado!</p>
                            )}
                        </div>
                    )}
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <textarea name="" id="" className="w-full bg-slate-50 rounded border p-2"
                        placeholder="Se ha revisado, gracias por su reporte."
                        value={respuesta} onChange={handleRespuesta}></textarea>
                    <button type="submit" className="bg-blue-800 p-2 rounded text-white font-bold  hover:bg-blue-700">Hecho</button>
                </form>
            </div>
        </>
    )
}