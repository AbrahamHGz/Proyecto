import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Menu from "../Objetos/Menu";
import Comentario from "../Objetos/Comentarios";
import { obtenerUnaPublicacion } from "../services/apiPublicacion";
import { publicacion } from "../interfaces/publicacion";
import { I_Comentario } from "../interfaces/I_comentarip";
import { crearComentario, obtenerComentarios } from "../services/apiComentarios";
import { borrarFavorito, crearFavorito, obtenerFavorito } from "../services/apiFavoritos";
import { borrarLike, crearLike, obtenerCantidad, obtenerLike } from "../services/apiLike";


const Publicacion: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [publicacion, setPublicacion] = useState<publicacion | null>(null);
    const [favorito, setFavorito] = useState('');
    const [likes, setLikes] = useState('');
    const [cantidad, setCantidad] = useState('');


    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const ids = usuarioInfo.id
    const email = usuarioInfo.email

    //Publicaciones
    const fetchData = async () => {
        try {
            if (id) {

                const data = await obtenerUnaPublicacion(id);
                setPublicacion(data);
            }

        } catch (error) {
            console.log("Error al cargar la publicacion:", error);
        }
    };


    useEffect(() => {
        //Publicacioens
        fetchData();
        //Comentarios
        fetchComentarios();
        fetchFavorito();
        fetchLike();
    }, [id])

    //Obtener comentarios
    const [comentarios, setComentarios] = useState<I_Comentario[]>([])


    const fetchComentarios = async () => {
        try {

            if (!id) {
                return alert("No hay publicacion para estos comentarios")
            }
            const data = await obtenerComentarios(id);
            setComentarios(data);

        } catch (error) {
            console.error("Error al obtener los comentario:", error);
        }
    }

    //Favoritos 
    const handleSubmitFavorito = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            if (!id) {
                return alert("No puedes añadir este favorito, la publicacion no existe")
            }
            await crearFavorito(
                email,
                publicacion?._id || ''

            );
            fetchFavorito();

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al añadir a favorito");  // Fallback si el error no tiene mensaje específico
            }
        }
    };

    const handleBorrarFavorito = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            if (!id) {
                return alert("No puedes borrar este favorito, la publicacion no existe")
            }
            await borrarFavorito(
                favorito
            );
            fetchFavorito();

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al borrar el favorito");  // Fallback si el error no tiene mensaje específico
            }
        }
    };

    const fetchFavorito = async () => {
        try {

            if (!id) {
                return alert("No hay publicacion para este favorito")
            }
            const data = await obtenerFavorito(
                ids,
                id
            );
            console.log("Favorito devuelto:", data);
            setFavorito(data?._id || '');

        } catch (error) {
            console.error("Error al obtener el favorito:", error);
        }
    }

    //Likes
    const handleSubmitLike = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            if (!id) {
                return alert("No hay publicacion para realizar la acción")
            }
            await crearLike(
                ids,
                publicacion?._id || ''

            );
            fetchLike();

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al añadir el like");  // Fallback si el error no tiene mensaje específico
            }
        }
    };

    const handleBorrarLike = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            if (!id) {
                return alert("No hay publicacion para realizar la acción")
            }
            await borrarLike(
                likes
            );
            fetchLike();

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al borrar el like");  // Fallback si el error no tiene mensaje específico
            }
        }
    };

    const fetchLike = async () => {
        try {

            if (!id) {
                return alert("No hay publicacion para realizar la acción")
            }
            const data = await obtenerLike(
                ids,
                id
            );
            console.log("like devuelto:", data);
            setLikes(data?._id || '');
            const data1 = await obtenerCantidad(
                id
            )

            setCantidad(data1?.cantidadLikes);
            console.log("candidad", data1);

        } catch (error) {
            console.error("Error al obtener el like:", error);
        }
    }



    const formatearFecha = (fechaIso: string): string => {
        const fecha = new Date(fechaIso);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        return `${dia}-${mes}-${anio}`;
    };


    return (
        <>
            <Menu></Menu>
            <div className="rounded p-4">
                <div className="pt-26 md:px-30">
                    <div className=" w-full flex md:bg-gray-400 justify-center p-5">
                        <img src={publicacion?.PUBimagen || "https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"}
                            alt="" className="rounded my-2 h-96" />
                    </div>
                    <p className="bg-gray-500 p-2 text-white font-bold text-2xl">{publicacion?.PUBnombre}</p>
                    <div className="bg-gray-500  lg:grid grid-cols-4">
                        <div className="p-2 flex">
                            <Link to={`/Perfil/${publicacion?.PUBusuario._id}`}>
                                <img src={publicacion?.PUBusuario.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"} alt=""
                                    className=" size-30 border-4 border-slate-900 border-double" />
                            </Link>
                            <div className="text-white p-2">
                                <Link to={`/Perfil/${publicacion?.PUBusuario._id}`} className="hover:underline text-xl font-bold">{publicacion?.PUBusuario.nombre}</Link>

                                <p><strong>Fecha:</strong> {formatearFecha(publicacion?.createdAt || '')}</p>

                                <div className="flex items-center">
                                    {likes !== '' ? (

                                        <svg onClick={handleBorrarLike} className="size-7 hover:text-red-300 text-red-500  ms-1   " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    ) : (

                                        <svg onClick={handleSubmitLike} className="size-7 text-red-300 hover:text-red-500  ms-1   " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>

                                    )}
                                    <p className="p-2 font-bold text-xl">{cantidad}</p>

                                </div>
                                <button className=" mt-2 hover:underline text-red-900 text-lg">Reportar</button>

                            </div>
                        </div>
                        <div className="p-4 text-white col-span-3">
                            <p className="text-white">{publicacion?.PUBdescripcion}</p>
                            <p><strong>Categorias: </strong>{publicacion?.PUBcategorias.map(cat => cat.CATnombre).join(",")}</p>
                            <div className="flex justify-end items-center">


                                {publicacion?.PUBusuario._id === ids ? (
                                    <div>
                                        <Link to={`/Editar publicacion/${publicacion?._id}`} className="text-white font-bold  bg-slate-800 px-4 p-2 rounded hover:bg-slate-700  ml-2">Editar Publicación</Link>
                                    </div>
                                ) : (
                                    favorito !== '' ? (
                                        <svg onClick={handleBorrarFavorito} className="size-10 hover:text-gray-800  ms-1 text-yellow-300  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    ) : (
                                        <svg onClick={handleSubmitFavorito} className="size-10 text-gray-800  ms-1 hover:text-yellow-300  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>

                                    )
                                )}

                            </div>
                        </div>
                    </div>



                    <div id="Comentarios">
                        <Escribe_Comentario onComentarioCreado={fetchComentarios}></Escribe_Comentario>

                        {comentarios.length === 0 ? (
                            <p className="text-center text-white bg-gray-400 p-4">Aún no hay comentarios.</p>
                        ) : (
                            comentarios.map((comentario, index) => (
                                <Comentario key={index} comentario={comentario} onActualizar={fetchComentarios} Fecha={formatearFecha} />
                            ))

                        )}


                    </div>
                </div>
            </div>
        </>
    )
}

export default Publicacion;

interface EscribeComProps {
    onComentarioCreado: () => void
}
const Escribe_Comentario: React.FC<EscribeComProps> = ({ onComentarioCreado }) => {
    const { id } = useParams();

    const [comentario, setComentario] = useState('');

    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const email = usuarioInfo.email

    const handleComentario = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setComentario(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            if (!id) {
                return alert("No puedes comentar en esta publicacion porque no existe")
            }
            await crearComentario(
                comentario,
                email,
                id
            );
            alert("Comentario publicado exitosamente");
            setComentario('')
            onComentarioCreado()

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al publicar un comentario");  // Fallback si el error no tiene mensaje específico
            }
        }
    };
    return (
        <>
            <div className="mt-2 p-2 bg-gray-500">
                <h1 className="font-bold text-white text-2xl flex justify-center">Escribe un comentario</h1>
            </div>
            <form action="" onSubmit={handleSubmit} className="bg-gray-400 pb-1">
                <ol>
                    <li className="px-4 py-2 flex">
                        <textarea name="" className="w-full mt-2 rounded bg-gray-200 p-2"
                            value={comentario}
                            onChange={handleComentario}></textarea>
                    </li>

                </ol>
                <div className="m-4">
                    <input type="submit" value="Comentar" className="px-4 rounded text-xl font-bold hover:bg-slate-600  py-3 w-full bg-slate-700 text-white" />

                </div>
            </form>
        </>
    )
}


