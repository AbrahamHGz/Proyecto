import React, { useState, useRef, useEffect } from "react";


import { I_Usuario } from "../interfaces/usuario";
import { getDataArtistasActivos } from "../services/api"
const UsuariosAd: React.FC = () => {

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
        <h1 className=" font-bold text-2xl">Usuarios</h1>
            <form action="" className="lg:flex lg:items-center  space-x-4 py-4">
                <div>
                    <label htmlFor="">Correo:</label>
                    <input type="text" className="bg-slate-200  w-full mb-2 rounded p-1 px-2" placeholder="usuario@mail.com" />

                </div>
                
                <div>

                    <label htmlFor="">Desde:</label>
                    <input type="date" name="" id="" className="bg-slate-200  mb-2 rounded p-1" />
                </div>

                <div>
                    <label htmlFor="">Hasta:</label>
                    <input type="date" name="" id="" className="bg-slate-200 mb-2 rounded p-1"/>
                    
                </div>

                <input type="submit" value="Buscar" className="bg-slate-600 mb-2 rounded p-1 px-4 text-white font-bold hover:bg-slate-500 " />
            </form>

            <div className="grid  lg:grid-cols-4 md:grid-cols-3  grid-cols-2 ">
                {usuarios.map((usu, index) => (
                    <Usaurioss key={index} P_Artistas={usu}></Usaurioss>
                ))}


            </div>

        </>
    )
}

export default UsuariosAd;

interface ArteIPropr{
    P_Artistas:I_Usuario
}
const Usaurioss: React.FC<ArteIPropr> = ({P_Artistas}) => {
    return(
        <>
           <div className="bg-slate-300 rounded p-4 mx-2 my-2 ">
                <div className=" space-x-2">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"
                     alt="" className="w-full md:h-40 h-40" />
                     <div>
                        <h1 className="font-bold xl:text-2xl lg:text-xl">{P_Artistas?.nombre}</h1>
                        <h1 className="font-semibold text-lg">{P_Artistas?.email}</h1>
                        <p className="font-semibold">Fecha de ingreso:</p> <p>08/03/2025</p>
                     </div>
                     
                    {P_Artistas.Estatus === "true" ? (

                        <button className="w-full hover:bg-red-400 bg-red-500 rounded p-2 font-bold text-white ">Desactivar</button>
                    ): (
                        <button className="w-full hover:bg-slate-400 bg-slate-500 rounded p-2 font-bold text-white ">Reactivar</button>

                    )}

                     
                </div>
            </div>
        </>
    )
}