import React, { useState, useRef, useEffect } from "react";
import Menu from "../Objetos/Menu";
import { Link } from "react-router-dom";
import CategoriaSelect from "../Objetos/CategoriaSelect";
import { obtenerPublicaciones } from "../services/apiPublicacion";
import { publicacion } from '../interfaces/publicacion';

const Home: React.FC = () => {
    const [publicaciones, setPublicaciones] = useState<publicacion[]>([]);
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    const fetchPublicacion = async () => {
        try {
            const data = await obtenerPublicaciones();
            setPublicaciones(data);
        } catch(error) {
            console.error("Error al obtener las publicaciones:", error);
        }
    }

    useEffect(() => {
        fetchPublicacion();
    }, []);

    const publicacionesFiltradas = publicaciones.filter(pub => {
        // Solo mostrar publicaciones con categorías
        const tieneCategorias = pub.PUBcategorias && pub.PUBcategorias.length > 0;
        if (!tieneCategorias) return false;
        
        // Filtro por categoría seleccionada
        if (filtroCategoria && 
            (!pub.PUBcategorias || 
             !pub.PUBcategorias.some(cat => cat.CATnombre === filtroCategoria))) {
            return false;
        }
        
        // Filtro por fechas
        if (fechaDesde && new Date(pub.createdAt) < new Date(fechaDesde)) return false;
        if (fechaHasta && new Date(pub.createdAt) > new Date(fechaHasta)) return false;
        
        return true;
    });

    return(
        <>
            <Menu></Menu>

            <div className="grid grid-cols-5 pt-23">
                <div className="bg-gray-800">
                    <h1 className="text-2xl text-white font-semibold flex justify-center p-3 my-3">
                        Top 10 Usuarios
                    </h1>
                    <ol className="p-2 ml-3">
                        <UsuariosPopulares></UsuariosPopulares>
                        <UsuariosPopulares></UsuariosPopulares>
                        <UsuariosPopulares></UsuariosPopulares>
                        <UsuariosPopulares></UsuariosPopulares>
                    </ol>
                </div>
                
                <div className="p-2 px-5 col-span-4">
                    <h1 className="text-4xl font-bold my-3 text-white">Arte Más Reciente</h1>

                    <FiltroPantallaMD 
                        categoria={filtroCategoria}
                        setCategoria={setFiltroCategoria}
                        fechaDesde={fechaDesde}
                        setFechaDesde={setFechaDesde}
                        fechaHasta={fechaHasta}
                        setFechaHasta={setFechaHasta}
                    />
                    <FiltroPantallaSM 
                        categoria={filtroCategoria}
                        setCategoria={setFiltroCategoria}
                        fechaDesde={fechaDesde}
                        setFechaDesde={setFechaDesde}
                        fechaHasta={fechaHasta}
                        setFechaHasta={setFechaHasta}
                    />

                    <div id="Publicaciones" className="grid grid-cols-3 md:grid-cols-4 my-10">
                        {publicacionesFiltradas.map((pub, index) => (
                            <ArtesPublic key={index} P_publicacion={pub}></ArtesPublic>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

interface Props {
    P_publicacion: publicacion
}
const ArtesPublic: React.FC<Props> = ({ P_publicacion }) => {
    return(
        <Link to={`/Publicacion/${P_publicacion._id}`} className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded hover:drop-shadow-xl hover:bg-gray-500">
            <img 
                src={P_publicacion?.PUBimagen || "https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"} 
                alt="" 
                className="sm:h-45 sm:w-84 h-24 w-full"
            />
            <p className="sm:flex justify-center sm:text-lg text-sm font-bold">{P_publicacion.PUBnombre}</p>
            <p className="sm:flex justify-start text-xs">Por: {P_publicacion.PUBusuario.nombre}</p>
        </Link>
    )
}

const UsuariosPopulares: React.FC = () => {
    return(
        <li className="flex justify-center">
            <Link to="/Perfil" className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded hover:drop-shadow-xl hover:bg-gray-500">
                <img 
                    src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" 
                    alt="" 
                    className="sm:h-31 w-full h-20"
                />
                <p className="flex justify-center text-lg font-bold">Usuario 123</p>
            </Link>   
        </li>
    )
}

interface FiltroProps {
    categoria: string;
    setCategoria: (value: string) => void;
    fechaDesde: string;
    setFechaDesde: (value: string) => void;
    fechaHasta: string;
    setFechaHasta: (value: string) => void;
}

const FiltroPantallaMD: React.FC<FiltroProps> = ({
    categoria,
    setCategoria,
    fechaDesde,
    setFechaDesde,
    fechaHasta,
    setFechaHasta
}) => {
    return (
        <form className="hidden md:block space-y-2 mb-4">
            <div className="flex items-center space-x-4">
                <div>
                    <label className="text-lg text-slate-300 font-semibold">Categoría:</label>
                    <CategoriaSelect value={categoria} onChange={setCategoria} />
                </div>
                
                <div>
                    <label className="text-lg text-slate-300 font-semibold">Desde:</label>
                    <input 
                        type="date" 
                        className="bg-gray-200 rounded mx-2 p-1 px-2" 
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="text-lg text-slate-300 font-semibold">Hasta:</label>
                    <input 
                        type="date" 
                        className="bg-gray-200 rounded mx-2 p-1 px-2" 
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                    />
                </div>
            </div>
        </form>
    )
}

const FiltroPantallaSM: React.FC<FiltroProps> = ({
    categoria,
    setCategoria,
    fechaDesde,
    setFechaDesde,
    fechaHasta,
    setFechaHasta
}) => {
    return (
        <form className="md:hidden grid grid-cols-1 space-y-2 mb-4">
            <div>
                <label className="text-lg text-slate-300 font-semibold">Categoría:</label>
                <CategoriaSelect value={categoria} onChange={setCategoria} />
            </div>

            <div>
                <label className="text-lg text-slate-300 font-semibold">Desde:</label>
                <input 
                    type="date" 
                    className="bg-gray-200 rounded p-1 px-2 w-full" 
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                />
            </div>

            <div>
                <label className="text-lg text-slate-300 font-semibold">Hasta:</label>
                <input 
                    type="date" 
                    className="bg-gray-200 rounded p-1 px-2 w-full" 
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                />
            </div>
        </form>
    )
}

export default Home;