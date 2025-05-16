import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { I_Usuario } from "../interfaces/usuario";
import { getDataAdmins, desactivarUsu } from "../services/api";

const Administradores: React.FC = () => {
    const [admins, setAdmins] = useState<I_Usuario[]>([]);
    const [adminsFiltrados, setAdminsFiltrados] = useState<I_Usuario[]>([]);
    const [correoFiltro, setCorreoFiltro] = useState<string>("");
    const [fechaDesdeFiltro, setFechaDesdeFiltro] = useState<string>("");
    const [fechaHastaFiltro, setFechaHastaFiltro] = useState<string>(""); 

    const fetchAdmins = async () => {
        try {
            const data = await getDataAdmins();
            setAdmins(data);
            setAdminsFiltrados(data); 
        } catch (error) {
            console.error("Error al obtener los administradores:", error);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    useEffect(() => {
        let adminsTemp = [...admins]; 

        if (correoFiltro) {
            adminsTemp = adminsTemp.filter(admin =>
                admin.email.toLowerCase().includes(correoFiltro.toLowerCase())
            );
        }

        if (fechaDesdeFiltro) {
            const fechaDesde = new Date(fechaDesdeFiltro);
            adminsTemp = adminsTemp.filter(admin => {
                const fechaCreacion = new Date(admin.createdAt);
                fechaCreacion.setHours(0, 0, 0, 0); 
                fechaDesde.setHours(0, 0, 0, 0);
                return fechaCreacion >= fechaDesde;
            });
        }

        // Filtrar por fecha de creación (hasta)
        if (fechaHastaFiltro) {
            const fechaHasta = new Date(fechaHastaFiltro);
            adminsTemp = adminsTemp.filter(admin => {
                const fechaCreacion = new Date(admin.createdAt);
                fechaCreacion.setHours(0, 0, 0, 0);
                fechaHasta.setHours(0, 0, 0, 0);
                return fechaCreacion <= fechaHasta;
            });
        }

        setAdminsFiltrados(adminsTemp);
    }, [correoFiltro, fechaDesdeFiltro, fechaHastaFiltro, admins]); 

    const handleStatusToggle = async (email: string, currentStatus: boolean) => {
        try {
            const newStatus = !currentStatus;
            await desactivarUsu(email, newStatus); 
            fetchAdmins();
        } catch (error) {
            console.error("Error al cambiar el estado del administrador:", error);
            alert("Hubo un error al cambiar el estado del administrador.");
        }
    };

    return (
        <>
            <h1 className="font-bold text-2xl">Administradores</h1>
            <form className="lg:flex lg:items-center space-x-4 py-4">
                <div>
                    <label htmlFor="correo">Correo:</label>
                    <input
                        type="text"
                        id="correo"
                        className="bg-slate-200 w-full mb-2 rounded p-1 px-2"
                        placeholder="Administrador@mail.com"
                        value={correoFiltro} 
                        onChange={(e) => setCorreoFiltro(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="desde">Desde:</label>
                    <input
                        type="date"
                        id="desde"
                        className="bg-slate-200 mb-2 rounded p-1"
                        value={fechaDesdeFiltro} 
                        onChange={(e) => setFechaDesdeFiltro(e.target.value)} 
                    />
                </div>

                <div>
                    <label htmlFor="hasta">Hasta:</label>
                    <input
                        type="date"
                        id="hasta"
                        className="bg-slate-200 mb-2 rounded p-1"
                        value={fechaHastaFiltro}
                        onChange={(e) => setFechaHastaFiltro(e.target.value)} 
                    />
                </div>

             </form>
            <Link to="/Agrega Administrador" type="button" className="bg-slate-600 rounded p-1 px-4 mx-2 text-white font-bold hover:bg-slate-500 ">
                Agregar Administrador
            </Link>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 ">
                {adminsFiltrados.map((adm, index) => ( 
                    <Admins key={index} AdminP={adm} onStatusToggle={handleStatusToggle} /> 
                ))}
            </div>
        </>
    );
};

export default Administradores;

interface AdminProps {
    AdminP: I_Usuario;
    onStatusToggle: (email: string, currentStatus: boolean) => void; 
}

const Admins: React.FC<AdminProps> = ({ AdminP, onStatusToggle }) => {
    const formatearFecha = (fechaIso: string): string => {
        const fecha = new Date(fechaIso);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}-${mes}-${anio}`;
    };

    const isUserActive = AdminP.Estatus;

    return (
        <>
            <div className="bg-slate-300 rounded p-4 mx-2 my-2 ">
                <div className="space-x-2">
                    <img
                        src={AdminP?.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"}
                        alt=""
                        className="w-full md:h-40 h-40"
                    />
                    <div>
                        <h1 className="font-bold xl:text-2xl lg:text-xl">{AdminP?.nombre}</h1>
                        <h1 className="font-semibold text-lg">{AdminP?.email}</h1>
                        <p className="font-semibold">Fecha de ingreso:</p> <p>{formatearFecha(AdminP.createdAt)}</p>
                    </div>

<<<<<<< HEAD
                    <button
                        className={`w-full rounded p-2 font-bold text-white ${
                            isUserActive ? "bg-green-500 hover:bg-green-400" : "bg-red-500 hover:bg-red-400"
                        }`}
                        onClick={() => onStatusToggle(AdminP.email, isUserActive)} 
                    >
                        {isUserActive ? "Activo" : "Desactivo"}
                    </button>
=======
                    {AdminP?.Estatus ? (
                        <button className="w-full hover:bg-red-400 bg-red-500 rounded p-2 font-bold text-white ">Desactivar</button>

                    ): (
                        <button className="w-full hover:bg-slate-400 bg-slate-500 rounded p-2 font-bold text-white ">Reactivar</button>

                    )}


>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
                </div>
            </div>
        </>
    );
};