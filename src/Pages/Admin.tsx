import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Menu from "../Objetos/Menu";
import Administradores from "../Objetos/Administradores";
import UsuariosAd from "../Objetos/UsuariosAd";
import Reportes from "../Objetos/Reportes";
import Categorias from "../Objetos/Categorias";
import Estadisticas from "../Objetos/Estadisticas";


import {getDataPerfil} from "../services/api";
const Admin: React.FC = () => {
    
    const [seccionActiva, setSeccionActiva] = useState("Administradores");
    
    const [usuario, setUsuario] = useState<any>(null);

    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const ids = usuarioInfo.id
    const tipo = usuarioInfo.tipo
    const {id} = useParams();

    
    useEffect(() => {
        if(id){
            cargarPerfil(id)

        }


    },[id])

    useEffect(() => {
        if (usuario) {
            // Si es admin, mostrar "Administradores", si no, mostrar "Usuarios"
            if (usuario.TipoUsu !== "admin") {
                setSeccionActiva("Administradores");
            } else {
                setSeccionActiva("Usuarios");
            }
        }
    }, [usuario]);


    const cargarPerfil = async(id: string) => {
        try{
            const data = await getDataPerfil(id);
            setUsuario(data)
        }catch(error){
            console.log("Error al cargar el perfil:", error);
        }
    }
    return(
        <>
            <Menu></Menu>
            
             <div className="flex lg:mx-40 md:mx-20 mx-2 grid grid-cols-2 items-center pt-26 mb-3">
                            <div className="md:flex">
            
                                <img src={usuario?.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"}
                                    alt="" className="md:size-30 size-25 rounded-full" />
            
                                <div className="text-white px-3">
                                    <p className="font-bold md:text-5xl text-2xl ">{usuario?.nombre || "Cargando.."}</p>
                                    <p className="font-semibold text-xl"> {usuario?.email || "Cargando.."}</p>
                                </div>
            
                            </div>
            
                            {usuario?._id === ids  && (
                            
                                <div className=" mt-2 flex justify-end space-x-3">
                                    <Link to={`/Editar Perfil/${id}`} className="p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white">Editar Perfil</Link>
                                    <Link to="/Login" className="p-2 bg-red-500 rounded border-red-100 hover:text-black hover:bg-red-400 font-bold text-white px-8">Salir</Link>
                                </div>
                            )}
                        </div>

            <div className="md:mx-40 lg:space-x-2">

                {usuario?.TipoUsu !== 'admin' && (
                    <button onClick={() => setSeccionActiva("Administradores")}
                        className={`font-bold xl:px-10 lg:px-2 p-1 rounded-t text-white hover:bg-gray-400 
                   ${seccionActiva === "Administradores" ? "bg-gray-400" : "bg-gray-500"}`}>Administradores</button>

                )}

                <button onClick={() => setSeccionActiva("Usuarios")}
                    className={`font-bold xl:px-10 lg:px-2 p-1 rounded-t text-white hover:bg-gray-400 
                    ${seccionActiva === "Usuarios" ? "bg-gray-400" : "bg-gray-500"}`}>Usuarios</button>

                <button onClick={() => setSeccionActiva("Reportes")}
                    className={`font-bold xl:px-10 lg:px-2 p-1 rounded-t text-white hover:bg-gray-400 
                    ${seccionActiva === "Reportes" ? "bg-gray-400" : "bg-gray-500"}`}>Reportes</button>
                <button onClick={() => setSeccionActiva("Categorias")}
                    className={`font-bold xl:px-10 lg:px-2 p-1 rounded-t text-white hover:bg-gray-400 
                    ${seccionActiva === "Categorias" ? "bg-gray-400" : "bg-gray-500"}`}>Categorias</button>
                <button onClick={() => setSeccionActiva("Estadisticas")}
                    className={`font-bold xl:px-10 lg:px-2 p-1 rounded-t text-white hover:bg-gray-400 
                    ${seccionActiva === "Estadisticas" ? "bg-gray-400" : "bg-gray-500"}`}>Estadísticas</button>

            </div>

            <div className="md:mx-40 bg-gray-400 p-4 rounded-b rounded-e">
                {usuario?.TipoUsu !== 'admin' && (
                    seccionActiva == "Administradores" && <Administradores></Administradores> 
                )}
                {seccionActiva == "Usuarios" && <UsuariosAd></UsuariosAd>}
                {seccionActiva == "Reportes" && <Reportes></Reportes>}
                {seccionActiva == "Categorias" && <Categorias></Categorias>}
                {seccionActiva == "Estadisticas" && <Estadisticas></Estadisticas>}


            </div>

            <div className="p-2">

            </div>
        </>
    )
}

export default Admin;