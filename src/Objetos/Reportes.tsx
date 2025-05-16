import React, { useState, useEffect } from "react";
import { I_Reporte } from "../interfaces/I_Reporte";
import { actualizarReporte, obtenerReporte } from "../services/apiReporte";
import { borrarPublicacion } from "../services/apiPublicacion";
import { borrarComentario } from "../services/apiComentarios";

const Reportes: React.FC = () => {
    const [reports, setReports] = useState<I_Reporte[]>([]);
    const [filteredReports, setFilteredReports] = useState<I_Reporte[]>([]);
    const [emailFilter, setEmailFilter] = useState<string>("");
    const [startDateFilter, setStartDateFilter] = useState<string>("");
    const [endDateFilter, setEndDateFilter] = useState<string>("");

<<<<<<< HEAD
    const fetchReports = async () => {
=======
    const [report, setReport] = useState<I_Reporte[]>([])


    const fetchReport = async () => {
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
        try {
            const data = await obtenerReporte();
            setReports(data);
            setFilteredReports(data); // Inicialmente, los reportes filtrados son todos los reportes
        } catch (error) {
            console.error("Error al obtener los reportes:", error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    useEffect(() => {
        // Lógica de filtrado en tiempo real
        let currentFilteredReports = reports;

        // Filtrar por correo
        if (emailFilter) {
            currentFilteredReports = currentFilteredReports.filter(report =>
                report.REPusuario.email.toLowerCase().includes(emailFilter.toLowerCase())
            );
        }

        // Filtrar por fecha
        if (startDateFilter || endDateFilter) {
            currentFilteredReports = currentFilteredReports.filter(report => {
                const reportDate = new Date(report.createdAt);
                reportDate.setHours(0, 0, 0, 0); // Normalizar a inicio del día

                const start = startDateFilter ? new Date(startDateFilter) : null;
                if (start) start.setHours(0, 0, 0, 0);

                const end = endDateFilter ? new Date(endDateFilter) : null;
                if (end) end.setHours(23, 59, 59, 999); // Normalizar a fin del día

                const isAfterStartDate = start ? reportDate >= start : true;
                const isBeforeEndDate = end ? reportDate <= end : true;

                return isAfterStartDate && isBeforeEndDate;
            });
        }

        setFilteredReports(currentFilteredReports);
    }, [reports, emailFilter, startDateFilter, endDateFilter]);

    return (
        <>
            <h1 className="font-bold text-2xl">Reportes</h1>
            <div className="lg:flex lg:items-center space-x-4 py-4">
                <div>
                    <label htmlFor="email">Correo:</label>
                    <input
                        type="text"
                        id="email"
                        className="bg-slate-200 w-full mb-2 rounded p-1 px-2"
                        placeholder="usuario@mail.com"
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="startDate">Desde:</label>
                    <input
                        type="date"
                        id="startDate"
                        className="bg-slate-200 mb-2 rounded p-1"
                        value={startDateFilter}
                        onChange={(e) => setStartDateFilter(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="endDate">Hasta:</label>
                    <input
                        type="date"
                        id="endDate"
                        className="bg-slate-200 mb-2 rounded p-1"
                        value={endDateFilter}
                        onChange={(e) => setEndDateFilter(e.target.value)}
                    />
                </div>
            </div>
            <div className="">
                {filteredReports.length > 0 ? (
                    filteredReports.map((rep, index) => (
                        <Report key={index} reporteP={rep} fetch={fetchReports} />
                    ))
                ) : (
                    <p>No se encontraron reportes que coincidan con los filtros.</p>
                )}
            </div>
        </>
    );
};

export default Reportes;

interface ReporteProps {
    reporteP: I_Reporte;
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

<<<<<<< HEAD
=======
    const [alerts, setAlerts] = useState<{msg: string, type: 'success' | 'error'}[]>([]);

    const showAlert = (msg: string, type: 'success' | 'error' = 'error') => {
        setAlerts([{msg, type}]);
        setTimeout(() => setAlerts([]), 3000);
    };
    

>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
    const [respuesta, setRespuesta] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [actionToDelete, setActionToDelete] = useState<'publicacion' | 'comentario' | null>(null);

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
<<<<<<< HEAD
            alert("Reporte actualizado");
            setRespuesta('');
            fetch();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert("Error inesperado al actualizar el reporte");
=======
            showAlert("¡Reporte actualizado!", "success");
            setRespuesta('')
            fetch();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                showAlert(`❌ ${error.response.data.error}`, "error");  // Muestra el mensaje del backend
            } else {
                console.log("Error inesperado al actualizar el reporte");  // Fallback si el error no tiene mensaje específico
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
            }
        }
    };

    const handleShowDeleteConfirm = (type: 'publicacion' | 'comentario') => {
        setActionToDelete(type);
        setShowDeleteConfirm(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
        setActionToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (actionToDelete === 'publicacion') {
            await confirmDesactivarPublicacion();
        } else if (actionToDelete === 'comentario') {
            await confirmDesactivarComentario();
        }
        setShowDeleteConfirm(false);
        setActionToDelete(null);
    };

    const confirmDesactivarPublicacion = async () => {
        try {
            await borrarPublicacion(
                reporteP?.REPpublicacion._id,
                false
<<<<<<< HEAD
            );
            alert('Publicación borrada');
            fetch();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert("Error inesperado al borrar la publicación");
=======
            )
            showAlert('Publicacion borradoa', "success")
            fetch();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
               showAlert(`❌ ${error.response.data.error}`, "error");
            } else {
                console.log("Error inesperado al borrar la publicacion");
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
            }
        }
    };

    const confirmDesactivarComentario = async () => {
        try {
            await borrarComentario(
                reporteP?.REPcomentario._id,
                false,
                "Borrar"
<<<<<<< HEAD
            );
            alert('Comentario borrado');
            fetch();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert("Error inesperado al borrar el comentario");
=======
            )
            showAlert(' Comentario borrado', "success")
            fetch();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                showAlert(`❌ ${error.response.data.error}`, "error");
            } else {
                console.log("Error inesperado al borrar el comentario");
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
            }
        }
    };

    return (
        <>
            {alerts.map((alert, idx) => (
                <div key={idx} className={`fixed top-5 left-1/2 transform -translate-x-1/2 ${alert.type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white px-6 py-2 rounded-lg shadow-lg z-50`}>
                    {alert.msg}
                </div>
            ))}
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
                            <p><strong>Nombre de la publicación:</strong> {reporteP?.REPpublicacion.PUBnombre}</p>
                            {reporteP?.REPpublicacion.PUBestatus ? (
<<<<<<< HEAD
                                <button onClick={() => handleShowDeleteConfirm('publicacion')} className="bg-red-500 hover:bg-red-400 p-2 font-bold text-white rounded">Borrar Publicación</button>
=======
                                <button onClick={desactivarPublicacion} className="bg-red-500 hover:bg-red-400 p-2 font-bold text-white rounded">Borrar</button>

>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
                            ) : (
                                <p className="flex justify-center font-semibold text-xl">¡Publicación borrada!</p>
                            )}
                        </div>
                    ) : (
                        <div className={`${reporteP?.REPcomentario.COMestatus ? `bg-red-300` : `bg-green-300`} p-2 m-2 rounded`}>
                            <p><strong>Correo:</strong> {reporteP?.REPcomentario.COMusuario.email}</p>
<<<<<<< HEAD
                            <p><strong>Comentario:</strong> {reporteP?.REPcomentario.COMdescripcion}</p>
                            {reporteP?.REPcomentario.COMestatus ? (
                                <button onClick={() => handleShowDeleteConfirm('comentario')} className="bg-red-500 hover:bg-red-400 p-2 font-bold text-white rounded">Borrar Comentario</button>
=======
                            <p><strong>Comentario:</strong>  {reporteP?.REPcomentario.COMdescripcion}</p>

                            {reporteP?.REPcomentario.COMestatus ? (
                                <button onClick={desactivarComentario} className="bg-red-500 hover:bg-red-400 p-2 font-bold text-white rounded">Borrar</button>
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
                            ) : (
                                <p className="flex justify-center font-semibold text-xl">¡Comentario borrado!</p>
                            )}
                        </div>
                    )}
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <textarea name="" id="" className="w-full bg-slate-50 rounded border p-2"
                        placeholder="Se ha revisado, gracias por su reporte."
                        value={respuesta} onChange={handleRespuesta}></textarea>
                    <button type="submit" className="bg-blue-800 p-2 rounded text-white font-bold hover:bg-blue-700">Hecho</button>
                </form>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/50 z-50">
                    <div className="bg-white/90 p-6 rounded-lg shadow-lg space-y-4 backdrop-blur-sm">
                        <p className="text-lg font-semibold">
                            ¿Estás seguro de que deseas eliminar {actionToDelete === 'publicacion' ? 'esta publicación' : 'este comentario'}?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};