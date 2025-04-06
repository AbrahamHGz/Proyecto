import React from "react";
import Menu from "../Objetos/Menu";
import { Link } from "react-router-dom";

const Artistas: React.FC = () => {
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
                        <Artei></Artei>
                        <Artei></Artei>
                        <Artei></Artei>
                        <Artei></Artei>

                        <Artei></Artei>



                    </div>
                </div>
            </div>
        </>
    )
}

export default Artistas;

const Artei: React.FC = () => {
    return(
        <>
            <Link to="/Perfil" className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                 hover:drop-shadow-xl hover:bg-gray-500">
                    <div className="flex justify-center">
                        <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"   alt="" 
                        className="h-31 w-full"/>
                    </div>
                    <p className="flex justify-center text-lg font-bold">Usuario 1234</p>
                    <p className="flex justify-center text-sm ">Seguidores: 20</p>

            </Link> 
        </>
    )
}