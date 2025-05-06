import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CategoriaSelect from "./CategoriaSelect";
import { obtenerPublicacionUsuario } from "../services/apiPublicacion";
import { publicacion } from '../interfaces/publicacion';
import { I_Usuario } from "../interfaces/usuario";

interface usuarioProps {
    usuario_i: I_Usuario;
}

const Publicaciones: React.FC<usuarioProps> = ({ usuario_i }) => {
    const [categoria, setCategoria] = useState<string>('');
    const [fechaDesde, setFechaDesde] = useState<string>('');
    const [fechaHasta, setFechaHasta] = useState<string>('');
    const [publicaciones, setPublicaciones] = useState<publicacion[]>([]);

    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const ids = usuarioInfo.id;

    const fetchPublicacion = async () => {
        try {
            const data = await obtenerPublicacionUsuario(usuario_i._id);
            setPublicaciones(data);
        } catch (error) {
            console.error("Error al obtener las publicaciones:", error);
        }
    };

    useEffect(() => {
        fetchPublicacion();
    }, [usuario_i._id]);

    const publicacionesFiltradas = publicaciones.filter(pub => {
        const tieneCategorias = pub.PUBcategorias && pub.PUBcategorias.length > 0;
        if (!tieneCategorias) return false;

        if (categoria && 
            !pub.PUBcategorias?.some(cat => cat.CATnombre === categoria)
        ) return false;

        if (fechaDesde && new Date(pub.createdAt) < new Date(fechaDesde)) return false;
        if (fechaHasta && new Date(pub.createdAt) > new Date(fechaHasta)) return false;

        return true;
    });

    return (
        <>
            <div className="items-center space-x-5 mb-4">
                <h1 className="text-2xl font-semibold">Publicaciones</h1>

                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="font-semibold">Categoría:</label>
                        <br />
                        <CategoriaSelect value={categoria} onChange={setCategoria} />
                    </div>

                    <div>
                        <label className="font-semibold">Desde:</label>
                        <br />
                        <input type="date" className="bg-white rounded px-2" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)}/>
                    </div>

                    <div>
                        <label className="font-semibold">Hasta:</label>
                        <br />
                        <input type="date" className="bg-white rounded px-2" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)}/>
                    </div>
                </div>

                <button className="mt-2 p-2 bg-slate-800 rounded hover:bg-slate-700 font-bold text-white" onClick={e => e.preventDefault()}>Filtrar</button>
            </div>

            {usuario_i?._id === ids && (
                <div className="mb-4">
                    <Link to="/Crear publicacion" className="text-white font-bold bg-blue-800 px-4 py-2 rounded hover:bg-blue-700">
                        Publicar
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-4 gap-4">
                {publicacionesFiltradas.map((pub, index) => (
                    <PublicaUsu key={index} P_publicacion={pub} />
                ))}
            </div>
        </>
    );
};
export default Publicaciones;



interface Props {
    P_publicacion: publicacion;}

const PublicaUsu: React.FC<Props> = ({ P_publicacion }) => (
    <Link
        to={`/Publicacion/${P_publicacion._id}`}
        className="p-2 bg-gray-700 text-white rounded hover:drop-shadow-xl hover:bg-gray-500">
        <img src={P_publicacion.PUBimagen || "https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"} alt={P_publicacion.PUBnombre}  className="md:h-45 w-full rounded"/>
        <p className="text-center text-lg font-bold mt-2">{P_publicacion.PUBnombre}</p>
        <p className="text-center text-sm mt-1">Likes: {P_publicacion.PUBlikes}</p>
    </Link> );
