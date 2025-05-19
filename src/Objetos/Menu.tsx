import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDataPerfil } from "../services/api";
import { obtenerPublicaciones } from "../services/apiPublicacion";
import { publicacion } from "../interfaces/publicacion";

const Menu: React.FC = () => {
    const [usuario, setUsuario] = useState<any>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<publicacion[]>([]);
    const [allPublications, setAllPublications] = useState<publicacion[]>([]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const id = usuarioInfo.id
    const tipoUsu = usuarioInfo.tipo

    useEffect(() => {
        if (id) {
            cargarPerfil(id)
        }
    }, [id])

    useEffect(() => {
        const loadPublications = async () => {
            try {
                const publicaciones = await obtenerPublicaciones();
                setAllPublications(publicaciones);
            } catch (error) {
                console.error("Error al cargar publicaciones:", error);
            }
        };
        loadPublications();
    }, []);

    useEffect(() => {
        if (searchQuery.length > 0) {
            const results = allPublications.filter(pub =>
                pub.PUBnombre.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, allPublications]);

    const cargarPerfil = async (id: string) => {
        try {
            const data = await getDataPerfil(id);
            setUsuario(data)
        } catch (error) {
            console.log("Error al cargar el perfil:", error);
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
    };

    return (
        <>
            <div className="bg-slate-950 md:p-4 py-7 px-2 fixed w-full z-50">
                <div className="grid grid-cols-3 flex items-center">
                    <div className="flex items-center">
                        <Link to="/Home" className="mx-2 text-xl sm:text-2xl md:text-4xl font-bold text-white
                       hover:underline
                        ">ARTROPOLIS</Link>

                        <Link to="/Home" className="text-white mx-4 hidden lg:block font-bold text-3xl px-4 p-1
                        rounded hover:bg-slate-700">
                            Inicio
                        </Link>
                    </div>

                    <div className="relative">
                        <input 
                            type="text" 
                            className="bg-gray-200 lg:w-full p-2 rounded"
                            placeholder="Buscar publicaciones..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        
                        {searchQuery.length > 0 && (
                            <div className="absolute top-12 left-0 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                                {searchResults.length > 0 ? (
                                    searchResults.map((publicacion) => (
                                        <Link
                                            key={publicacion._id}
                                            to={`/Publicacion/${publicacion._id}`}
                                            onClick={clearSearch}
                                            className="block p-3 hover:bg-gray-100 border-b border-gray-200"
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    src={publicacion.PUBimagen || "https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"}
                                                    alt={publicacion.PUBnombre}
                                                    className="w-10 h-10 rounded object-cover mr-3"
                                                />
                                                <span className="text-gray-800 font-medium">
                                                    {publicacion.PUBnombre}
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="p-3 text-gray-500">
                                        No se encontraron resultados
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end  text-white items-center ">
                        <button
                            className="lg:hidden text-white mr-4"
                            onClick={toggleMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        <Link to="/Artistas" className="text-white mx-4 hidden lg:block font-bold text-3xl px-4 p-1
                            rounded hover:bg-slate-700">
                            Artistas
                        </Link>

                        {tipoUsu === "artista" ? (
                            <>
                                <Link to={`/Perfil/${id}`} className="text-white mx-4 hidden lg:block font-bold text-3xl px-4 p-1
                                rounded hover:bg-slate-700">
                                    Perfil
                                </Link>
                                <Link to={`/Perfil/${id}`} className=" mx-2 hidden lg:block">
                                    <img src={usuario?.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"}
                                        alt="" className="size-16 rounded-full" />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to={`/Administrador/${id}`} className="text-white mx-4 hidden lg:block font-bold text-3xl px-4 p-1
                                rounded hover:bg-slate-700">
                                    Perfil
                                </Link>
                                <Link to={`/Administrador/${id}`} className=" mx-2 hidden lg:block">
                                    <img src={usuario?.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"}
                                        alt="" className="size-16 rounded-full" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <div
                    className={`md:hidden bg-slate-900 w-full fixed left-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'top-24' : '-top-full'}`}
                    style={{ zIndex: 40 }}
                >
                    <div className="flex flex-col p-4">
                        <Link
                            to="/Home"
                            className="text-white py-3 px-4 font-bold text-xl rounded hover:bg-slate-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/Artistas"
                            className="text-white py-3 px-4 font-bold text-xl rounded hover:bg-slate-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Artistas
                        </Link>
                        <Link
                            to="/Perfil"
                            className="text-white py-3 px-4 font-bold text-xl rounded hover:bg-slate-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Perfil
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu;