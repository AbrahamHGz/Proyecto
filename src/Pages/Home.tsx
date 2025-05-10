import React, { useState, useEffect } from "react";
import Menu from "../Objetos/Menu";
import { Link } from "react-router-dom";
import CategoriaSelect from "../Objetos/CategoriaSelect";
import { obtenerPublicaciones } from "../services/apiPublicacion";
import { obtenerCantidad } from "../services/apiLike";
import { publicacion } from '../interfaces/publicacion';

const Home: React.FC = () => {
    const [publicaciones, setPublicaciones] = useState<publicacion[]>([]);
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    const [loading, setLoading] = useState(true);
    const [loadingDots, setLoadingDots] = useState('');
    const [topUsuarios, setTopUsuarios] = useState<Array<{ _id: string; nombre: string; imagen: string; totalLikes: number }>>([]);

    const fetchPublicacion = async () => {
        setLoading(true);
        try {
            const data = await obtenerPublicaciones();
            setPublicaciones(data);
        } catch (error) {
            console.error("Error al obtener las publicaciones:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPublicacion();
    }, []);

    useEffect(() => {
        if (!loading) { setLoadingDots(''); return; }
        const interval = setInterval(() => { setLoadingDots(prev => prev.length < 3 ? prev + '.' : ''); }, 500);
        return () => clearInterval(interval);
    }, [loading]);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const allPublicaciones = await obtenerPublicaciones();

                const userLikesMap: { [userId: string]: { nombre: string; imagen: string; totalLikes: number } } = {};

                for (const pub of allPublicaciones) {
                    if (pub.PUBusuario && pub.PUBusuario._id) {
                        const likeCountData = await obtenerCantidad(pub._id);
                        const likes = likeCountData?.cantidadLikes || 0;
                        const userId = pub.PUBusuario._id;
                        const userName = pub.PUBusuario.nombre;
                        const userImage = pub.PUBusuario.imagen;
                        if (!userLikesMap[userId]) {
                            userLikesMap[userId] = {
                                nombre: userName,
                                imagen: userImage,
                                totalLikes: 0
                            };
                        }
                        userLikesMap[userId].totalLikes += likes;
                    }
                }

                const sortedUsers = Object.entries(userLikesMap)
                    .map(([id, data]) => ({
                        _id: id,
                        nombre: data.nombre,
                        imagen: data.imagen,
                        totalLikes: data.totalLikes
                    }))
                    .sort((a, b) => b.totalLikes - a.totalLikes)
                    .slice(0, 10);

                setTopUsuarios(sortedUsers);
            } catch (error) {
                console.error("Error al obtener el top de usuarios:", error);
            }
        };

        fetchTopUsers();
    }, []);
    const publicacionesFiltradas = publicaciones.filter(pub => {
        const tieneCategorias = pub.PUBcategorias && pub.PUBcategorias.length > 0;
        if (!tieneCategorias) return false;

        if (filtroCategoria &&
            !pub.PUBcategorias.some(cat => cat.CATnombre === filtroCategoria)) {
            return false;
        }

        if (fechaDesde && new Date(pub.createdAt) < new Date(fechaDesde)) return false;
        if (fechaHasta && new Date(pub.createdAt) > new Date(fechaHasta)) return false;

        return true;
    });

    return (
        <>
            <Menu />

            <div className="grid grid-cols-5 pt-23">
                <aside className="bg-gray-800">
                    <h1 className="text-2xl text-white font-semibold flex justify-center p-3 my-3">
                        Top 10 Usuarios
                    </h1>
                    <ol className="p-2 ml-3">
                        {topUsuarios.length > 0 ? (
                            topUsuarios.map((user, index) => (
                                <UsuariosPopulares key={user._id || index} usuario={user} puesto={index + 1} />
                            ))
                        ) : (
                            <li className="text-white text-center">Cargando Top Usuarios...</li>
                        )}
                    </ol>
                </aside>

                <main className="p-2 px-5 col-span-4">
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

                    {loading ? (
                        <div className="flex justify-center items-center w-full my-10">
                            <p className="text-white font-bold text-2xl">
                                Cargando Publicaciones{loadingDots}
                            </p>
                        </div>
                    ) : (
                        <div id="Publicaciones" className="grid grid-cols-3 md:grid-cols-4 my-10">
                            {publicacionesFiltradas.map((pub, index) => (
                                <ArtesPublic key={index} P_publicacion={pub} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

interface Props {
    P_publicacion: publicacion
}
const ArtesPublic: React.FC<Props> = ({ P_publicacion }) => {
    return (
        <Link
            to={`/Publicacion/${P_publicacion._id}`}
            className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded hover:drop-shadow-xl hover:bg-gray-500"
        >
            <img
                src={
                    P_publicacion?.PUBimagen ||
                    "https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"
                }
                alt={P_publicacion.PUBnombre}
                className="sm:h-45 sm:w-84 h-24 w-full object-cover"
            />
            <p className="sm:flex justify-center sm:text-lg text-sm font-bold">
                {P_publicacion.PUBnombre}
            </p>
            <p className="sm:flex justify-start text-xs">
                Por: {P_publicacion.PUBusuario.nombre}
            </p>
        </Link>
    );
}

interface UsuarioPopularProps {
    usuario: {
        _id: string;
        nombre: string;
        imagen: string;
        totalLikes: number;
    };
    puesto: number;
}

const UsuariosPopulares: React.FC<UsuarioPopularProps> = ({ usuario, puesto }) => {
    let puestoColorClass = "text-white";
    if (puesto === 1) {
        puestoColorClass = "text-yellow-500"; // Oro
    } else if (puesto === 2) {
        puestoColorClass = "text-gray-400"; // Plata
    } else if (puesto === 3) {
        puestoColorClass = "text-amber-700"; // Bronce/Café
    }

    return (
        <li className="flex justify-center">
            <Link
                to={`/Perfil/${usuario._id}`}
                className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded hover:drop-shadow-xl hover:bg-gray-500 flex flex-col items-center w-full">
                {/* Aquí va la imagen del usuario */}
                <img
                    src={usuario.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"}
                    alt={usuario.nombre}
                    className="h-40 w-40 object-cover mb-2" // Consistent square size
                />

                <p className="text-lg font-bold text-center">
                    <span className={`mr-2 text-xl ${puestoColorClass}`}>{puesto}.</span> {usuario.nombre}
                </p>
                <p className="text-sm text-center">Likes: {usuario.totalLikes} ❤️</p>
            </Link>
        </li>
    );
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
                    <input type="date" className="bg-gray-200 rounded mx-2 p-1 px-2" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
                </div>

                <div>
                    <label className="text-lg text-slate-300 font-semibold">Hasta:</label>
                    <input type="date" className="bg-gray-200 rounded mx-2 p-1 px-2" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} />
                </div>
            </div>
        </form>
    );
}

// Componente de filtro para pantallas pequeñas
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
                    onChange={(e) => setFechaDesde(e.target.value)} />
            </div>

            <div>
                <label className="text-lg text-slate-300 font-semibold">Hasta:</label>
                <input
                    type="date"
                    className="bg-gray-200 rounded p-1 px-2 w-full"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)} />
            </div>
        </form>
    );
}

export default Home;