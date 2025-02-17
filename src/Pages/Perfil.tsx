import React from "react";
import Publicaciones from "../Objetos/Publicaciones";
import Menu from "../Objetos/Menu";
const Perfil: React.FC = () => {
    return (
        <>
            <Menu></Menu>
            
           <div className="flex mx-40 grid grid-cols-2 items-center pt-26">
                <div className="flex">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"
                    alt="" className="size-20 "/>

                    <div>
                        <p><strong className="text-2xl">"Usuario"</strong> <br />
                            Descripcion <br /> 
                            Contacto: Facebook
                        </p>
                    </div>  

                    <div className="grid grid-cols-1 space-y-2 mx-5">
                        <button className="p-1 bg-lime-200 rounded border-lime-600 
                        hover:bg-lime-100 hover:border-lime-400 font-semibold"
                        >Editar Perfil</button>
                        <button className="p-1 bg-red-200  rounded border-red-600 
                        hover:bg-red-100 hover:border-red-400 font-semibold">Cerrar Sesión</button>
                    </div>

                   
                </div>

                <div className=" mt-2 flex justify-end">
                    <div className="space-y-2">
                        <p className="bg-sky-100 p-2 w-32 ">Seguidores: 20</p>
                        <p className="bg-sky-100 p-2 w-32">Siguiendo: 1</p>    
                    </div>

                </div>         
           </div>

           <div className="mx-40 space-x-2">
                <button className="bg-sky-200 font-bold px-10 p-1 rounded hover:bg-gray-600">Publicaciones</button>
                <button className="bg-sky-200 font-bold px-10 p-1 rounded hover:bg-gray-600">Favoritos</button>
                
           </div>

           <div className="mx-40 bg-sky-200 p-4">
                <Publicaciones></Publicaciones>
           </div>

        </>
    )
}

export default Perfil;