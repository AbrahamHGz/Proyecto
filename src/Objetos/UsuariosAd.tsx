import React, { useState, useRef, useEffect } from "react";
import { I_Usuario } from "../interfaces/usuario";
import { getDataArtistasParaAdmin, desactivarUsu } from "../services/api"; 

const UsuariosAd: React.FC = () => {
    const [usuarios, setUsuarios] = useState<I_Usuario[]>([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState<I_Usuario[]>([]);
    const [correoFiltro, setCorreoFiltro] = useState<string>("");
    const [fechaDesdeFiltro, setFechaDesdeFiltro] = useState<string>("");
    const [fechaHastaFiltro, setFechaHastaFiltro] = useState<string>("");

    const fetchPublicacion = async () => {
        try {
            const data = await getDataArtistasParaAdmin(); 
            setUsuarios(data);
            setUsuariosFiltrados(data);
        } catch (error) {
            console.error("Error al obtener las publicaciones:", error);
        }
    };

    useEffect(() => {
        fetchPublicacion();
    }, []);

    useEffect(() => {
        let usuariosTemp = [...usuarios];

        if (correoFiltro) {
            usuariosTemp = usuariosTemp.filter(usuario =>
                usuario.email.toLowerCase().includes(correoFiltro.toLowerCase())
            );
        }

        if (fechaDesdeFiltro) {
            const fechaDesde = new Date(fechaDesdeFiltro);
            usuariosTemp = usuariosTemp.filter(usuario => {
                const fechaCreacion = new Date(usuario.createdAt);
                fechaCreacion.setHours(0, 0, 0, 0);
                fechaDesde.setHours(0, 0, 0, 0);
                return fechaCreacion >= fechaDesde;
            });
        }

        if (fechaHastaFiltro) {
            const fechaHasta = new Date(fechaHastaFiltro);
            usuariosTemp = usuariosTemp.filter(usuario => {
                const fechaCreacion = new Date(usuario.createdAt);
                fechaCreacion.setHours(0, 0, 0, 0);
                fechaHasta.setHours(0, 0, 0, 0);
                return fechaCreacion <= fechaHasta;
            });
        }

        setUsuariosFiltrados(usuariosTemp);
    }, [correoFiltro, fechaDesdeFiltro, fechaHastaFiltro, usuarios]);

    const handleStatusToggle = async (email: string, currentStatus: boolean) => {
        try {
            const newStatus = !currentStatus;
            await desactivarUsu(email, newStatus); 
            fetchPublicacion();
        } catch (error) {
            console.error("Error al cambiar el estado del usuario:", error);
            alert("Hubo un error al cambiar el estado del usuario.");
        }
    };

    return (
        <>
            <h1 className="font-bold text-2xl">Usuarios</h1>
            <form className="lg:flex lg:items-center space-x-4 py-4">
                <div>
                    <label htmlFor="correo">Correo:</label>
                    <input
                        type="text"
                        id="correo"
                        className="bg-slate-200 w-full mb-2 rounded p-1 px-2"
                        placeholder="usuario@mail.com"
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

            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 ">
                {usuariosFiltrados.map((usu, index) => (
                    <Usaurioss key={index} P_Artistas={usu} onStatusToggle={handleStatusToggle} />
                ))}
            </div>
        </>
    );
};

export default UsuariosAd;

interface ArteIPropr {
    P_Artistas: I_Usuario;
    onStatusToggle: (email: string, currentStatus: boolean) => void;
}

const Usaurioss: React.FC<ArteIPropr> = ({ P_Artistas, onStatusToggle }) => {
    const formatearFecha = (fechaIso: string): string => {
        const fecha = new Date(fechaIso);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}-${mes}-${anio}`;
    };

    const isUserActive = P_Artistas.Estatus;

    return (
        <>
            <div className="bg-slate-300 rounded p-4 mx-2 my-2 ">
                <div className=" space-x-2">
                    <img
                        src={P_Artistas?.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"}
                        alt=""
                        className="w-full md:h-40 h-40"
                    />
                    <div>
                        <h1 className="font-bold xl:text-2xl lg:text-xl">{P_Artistas?.nombre}</h1>
                        <h1 className="font-semibold text-lg">{P_Artistas?.email}</h1>
                        <p className="font-semibold">Fecha de ingreso:</p>
                        <p>{formatearFecha(P_Artistas.createdAt)}</p>
                    </div>
                    
                    <button
                        className={`w-full rounded p-2 font-bold text-white ${
                            isUserActive ? "bg-green-500 hover:bg-green-400" : "bg-red-500 hover:bg-red-400"
                        }`}
                        onClick={() => onStatusToggle(P_Artistas.email, isUserActive)}
                    >
<<<<<<< HEAD
                        {isUserActive ? "Activo" : "Desactivo"}
=======
                        {isUserActive ? "Activo" : "Desactivar"}
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
                    </button>
                </div>
            </div>
        </>
    );
};