import React, { useState, useRef, useEffect } from "react";
import Menu from "../Objetos/Menu";
import { Link } from "react-router-dom";

import { I_Usuario } from "../interfaces/usuario";
import { getDataArtistasActivos } from "../services/api"

const Artistas: React.FC = () => {

    const [usuarios, setUsuarios] = useState<I_Usuario[]>([])

     const fetchPublicacion = async () => {
            try{
                const data = await getDataArtistasActivos();
                setUsuarios(data);
            }catch(error){
                console.error("Error al obtener las publicaciones:", error);
            }
        }
    
        useEffect(() => {
            fetchPublicacion();
        }, [])

    return(
        <>
            <Menu></Menu>

            <div className="pt-30">
                <div className="lg:px-30">

                    <form action="" className="md:flex space-x-2  items-center">
                        <div>
                            <label htmlFor="" className=" font-semibold text-lg text-slate-300 ">Desde:</label>
                            <input type="date" name="" className="bg-slate-200 rounded md:m-0 m-2 px-2 p-1" id="" />

                        </div>
                        <div>
                            <label htmlFor="" className=" font-semibold text-lg text-slate-300 ">Hasta:</label>
                            <input type="date" name="" className="bg-slate-200 rounded md:m-0 m-2 px-2 p-1" id="" />
                        </div>

                        <div>
                        <label htmlFor="" className=" font-semibold text-lg text-slate-300 ">Nombre del Artista:</label>
                        <input type="text" placeholder="Nombre del artista" className="bg-slate-200 md:m-0 m-2 rounded px-2 p-1" />
                        </div>
                        
                        <input type="submit" value="Buscar" className="text-white font-bold m-2 bg-slate-800 px-4 p-2 rounded hover:bg-slate-700 " />
                    </form>

                    <div className="grid grid-cols-4 md:mt-10">
                        {usuarios.map((usu, index) => (
                            <Artei key={index} P_Artistas={usu}></Artei>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}
export default Artistas;


interface ArteIPropr{
    P_Artistas:I_Usuario
}
const Artei: React.FC<ArteIPropr> = ({P_Artistas}) => {
    return(
        <>
            <Link to={`/Perfil/${P_Artistas._id}`} className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                 hover:drop-shadow-xl hover:bg-gray-500">
                    <div className="flex justify-center">
                        <img src={P_Artistas?.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"}   alt="" 
                        className="h-31 w-full"/>
                    </div>
                    <p className="flex justify-center text-lg font-bold">{P_Artistas.nombre}</p>
                    <p className="flex justify-center text-sm ">Seguidores: {P_Artistas.Seguidores}</p>

            </Link> 
        </>
    )
}