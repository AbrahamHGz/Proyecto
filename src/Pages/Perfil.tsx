import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../auth/autenticacion";

import Publicaciones from "../Objetos/Publicaciones";
import Menu from "../Objetos/Menu";
import Acerca_de_mi from "../Objetos/Acerca_de_Mi";
import Favoritos from "../Objetos/Favoritos";

import { getDataPerfil } from "../services/api";
import { borrarSeguir, crearSeguir, obtenerCantidadSeguidores, obtenerSeguir } from "../services/apiSeguidores";


const Perfil: React.FC = () => {
    const [seccionActiva, setSeccionActiva] = useState("AcercadeMi");
    const [usuario, setUsuario] = useState<any>(null);
    const [siguiendo, setSiguiendo] = useState('');
    const [cantidad, setCantidad] = useState<any>(null);

    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const ids = usuarioInfo.id
    const { id } = useParams();

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            cargarPerfil(id)
            fetchSeguir();
        }
    }, [id])

    const cargarPerfil = async (id: string) => {
        try {
            const data = await getDataPerfil(id);
            setUsuario(data)
        } catch (error) {
            console.log("Error al cargar el perfil:", error);
        }
    }

    const Salir = () => {
        try {
            authContext?.logout();
            navigate("/login")
        } catch (e) {
            alert("Error al intentar salir de la aplicacion")
        }
    }

    //Seguidores
    const handleSubmitSeguir = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            if (!id) {
                return alert("No hay perfil para realizar la acción")
            }
            await crearSeguir(
                ids,
                id
            );
            fetchSeguir();

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al intenta seguir");  // Fallback si el error no tiene mensaje específico
            }
        }
    };

    const handleBorrarSeguir = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            if (!id) {
                return alert("No hay perfil para realizar la acción")
            }
            await borrarSeguir(
                siguiendo
            );
            fetchSeguir();

        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al dejar de seguir");  // Fallback si el error no tiene mensaje específico
            }
        }
    };

    const fetchSeguir = async () => {
        try {

            if (!id) {
                return alert("No hay perfil para realizar la acción")
            }
            const data = await obtenerSeguir(
                ids,
                id
            );
            console.log("seguidor devuelto:", data);
            setSiguiendo(data?._id || '');
            const cant = await obtenerCantidadSeguidores(
                id
            )
            setCantidad(cant)


        } catch (error) {
            console.error("Error al obtener seguidor:", error);
        }
    }
    return (
        <>
            <Menu></Menu>

            <div className="flex lg:mx-40 md:mx-20 mx-2 grid grid-cols-2 items-center pt-26 mb-3">
                <div className="md:flex">

                    <img src={usuario?.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"}
                        alt="" className="md:size-30 size-25 rounded-full" />

                    <div className="text-white px-3">
                        <p className="font-bold md:text-5xl text-2xl ">{usuario?.nombre || "Cargando.."}</p>
                        <p className="font-semibold text-xl">{usuario?.email || "Cargando.."}</p>
                        <p><strong>Seguidores:</strong> {cantidad?.seguidores}</p>
                        <p><strong>Siguiendo:</strong> {cantidad?.siguiendo}</p>
                    </div>

                </div>

                {usuario?._id === ids ? (

                    <div className=" mt-2 flex justify-end space-x-3">
                        <Link to={`/Editar Perfil/${id}`} className="p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white">Editar Perfil</Link>
                        <button onClick={Salir} className="p-2 bg-red-500 rounded border-red-100 hover:text-black hover:bg-red-400 font-bold text-white px-8">Salir
                        </button>
                    </div>
                ) : (
                    siguiendo !== '' ? (
                        <div onClick={handleBorrarSeguir} className=" mt-2 flex justify-end space-x-3">
                            <button className="p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white">Dejar de seguir</button>
                        </div>
                    ) : (
                        <div onClick={handleSubmitSeguir} className=" mt-2 flex justify-end space-x-3">
                            <button className="p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white">Seguir</button>
                        </div>
                    )
                )}
            </div>

            <div className="lg:mx-40 md:mx-20 space-x-2">
                <button onClick={() => setSeccionActiva("AcercadeMi")}
                    className={`font-bold lg:px-10 p-1 rounded-t text-white hover:bg-gray-400 
               ${seccionActiva === "AcercadeMi" ? "bg-gray-400" : "bg-gray-500"}`}>Acerca de mí</button>

                <button onClick={() => setSeccionActiva("Publicaciones")}
                    className={`font-bold lg:px-10 p-1 rounded-t text-white hover:bg-gray-400 
                    ${seccionActiva === "Publicaciones" ? "bg-gray-400" : "bg-gray-500"}`}>Publicaciones</button>

                <button onClick={() => setSeccionActiva("Favoritos")}
                    className={`font-bold lg:px-10 p-1 rounded-t text-white hover:bg-gray-400 
                    ${seccionActiva === "Favoritos" ? "bg-gray-400" : "bg-gray-500"}`}>Favoritos</button>

            </div>

            <div className="lg:mx-40 md:mx-20 bg-gray-400 p-4 rounded-b rounded-e">
                {seccionActiva == "AcercadeMi" && <Acerca_de_mi usuario_i={usuario}></Acerca_de_mi>}
                {seccionActiva == "Publicaciones" && <Publicaciones usuario_i={usuario}></Publicaciones>}
                {seccionActiva == "Favoritos" && <Favoritos usuario_i={usuario}></Favoritos>}
            </div>

            <div className="p-2">

            </div>

        </>
    )
}

export default Perfil;