import React, { useState, useRef, useEffect } from "react";
import Menu from "../Objetos/Menu";
import { Link } from "react-router-dom";

import { I_Usuario } from "../interfaces/usuario";
import { getDataArtistasActivos } from "../services/api"

const Artistas: React.FC = () => {
    const [usuarios, setUsuarios] = useState<I_Usuario[]>([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState<I_Usuario[]>([]);
    const [nombreFiltro, setNombreFiltro] = useState<string>("");
    const [fechaDesdeFiltro, setFechaDesdeFiltro] = useState<string>(""); 
    const [fechaHastaFiltro, setFechaHastaFiltro] = useState<string>(""); 

    const fetchPublicacion = async () => {
        try {
            const data = await getDataArtistasActivos();
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
        if (nombreFiltro) {
            usuariosTemp = usuariosTemp.filter(usuario =>
                usuario.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
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
    }, [nombreFiltro, fechaDesdeFiltro, fechaHastaFiltro, usuarios]); 

    return (
        <>
            <Menu></Menu>

            <div className="pt-30">
                <div className="lg:px-30">

                    <form className="md:flex space-x-2 items-center">
                        <div>
                            <label htmlFor="fechaDesde" className="font-semibold text-lg text-slate-300">Desde:</label>
                            <input
                                type="date"
                                id="fechaDesde"
                                className="bg-slate-200 rounded md:m-0 m-2 px-2 p-1"
                                value={fechaDesdeFiltro}
                                onChange={(e) => setFechaDesdeFiltro(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="fechaHasta" className="font-semibold text-lg text-slate-300">Hasta:</label>
                            <input
                                type="date"
                                id="fechaHasta"
                                className="bg-slate-200 rounded md:m-0 m-2 px-2 p-1"
                                value={fechaHastaFiltro}
                                onChange={(e) => setFechaHastaFiltro(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="nombreArtista" className="font-semibold text-lg text-slate-300">Nombre del Artista:</label>
                            <input
                                type="text"
                                id="nombreArtista"
                                placeholder="Nombre del artista"
                                className="bg-slate-200 md:m-0 m-2 rounded px-2 p-1"
                                value={nombreFiltro}
                                onChange={(e) => setNombreFiltro(e.target.value)}
                            />
                        </div>
                        
                      </form>

                    <div className="grid grid-cols-6 md:mt-10">
                        {usuariosFiltrados.map((usu, index) => ( 
                            <Artei key={index} P_Artistas={usu}></Artei>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Artistas;


interface ArteIPropr {
    P_Artistas: I_Usuario;
}
const Artei: React.FC<ArteIPropr> = ({ P_Artistas }) => {
    return (
        <>
            <Link to={`/Perfil/${P_Artistas._id}`} className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                hover:drop-shadow-xl hover:bg-gray-500">
                <div className="flex justify-center">
                    <img src={P_Artistas?.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"} alt=""
                        className="h-31 w-full" />
                </div>
                <p className="flex justify-center text-lg font-bold">{P_Artistas.nombre}</p>

            </Link>
        </>
    );
};