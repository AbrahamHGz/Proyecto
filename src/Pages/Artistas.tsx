import React from "react";
import Menu from "../Objetos/Menu";
import { Link } from "react-router-dom";

const Artistas: React.FC = () => {
    return(
        <>
            <Menu></Menu>

            <div className="pt-30">
                <div className="px-30">
                    <form action="" className="flex space-x-2 items-center">
                        <label htmlFor="" className=" font-semibold text-lg text-slate-300 ">Desde:</label>
                        <input type="date" name="" className="bg-slate-200 rounded px-2 p-1" id="" />

                        <label htmlFor="" className=" font-semibold text-lg text-slate-300 ">Hasta:</label>
                        <input type="date" name="" className="bg-slate-200 rounded px-2 p-1" id="" />
                        
                        <label htmlFor="" className=" font-semibold text-lg text-slate-300 ">Nombre del Artista:</label>
                        <input type="text" placeholder="Nombre del artista" className="bg-slate-200 rounded px-2 p-1" />

                        <input type="submit" value="Buscar" className="text-white font-bold  bg-slate-800 px-4 p-2 rounded hover:bg-slate-700 " />
                    </form>

                    <div className="grid grid-cols-4 mt-10">
                        <Link to="/Perfil" className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                         hover:drop-shadow-xl hover:bg-gray-500">
                            <div className="flex justify-center">
                                <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"   alt="" 
                                className="h-31 "/>
                            </div>
                            <p className="flex justify-center text-lg font-bold">"Usuario 123"</p>
                        </Link> 
                        <Link to="/Perfil" className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                         hover:drop-shadow-xl hover:bg-gray-500">
                            <div className="flex justify-center">
                                <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"   alt="" 
                                className="h-31 "/>
                            </div>
                            <p className="flex justify-center text-lg font-bold">"Usuario 123"</p>
                        </Link> 
                        <Link to="/Perfil" className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                         hover:drop-shadow-xl hover:bg-gray-500">
                            <div className="flex justify-center">
                                <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"   alt="" 
                                className="h-31 "/>
                            </div>
                            <p className="flex justify-center text-lg font-bold">"Usuario 123"</p>
                        </Link> 
                        <Link to="/Perfil" className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                         hover:drop-shadow-xl hover:bg-gray-500">
                            <div className="flex justify-center">
                                <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"   alt="" 
                                className="h-31 "/>
                            </div>
                            <p className="flex justify-center text-lg font-bold">"Usuario 123"</p>
                        </Link> 
                        <Link to="/Perfil" className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                         hover:drop-shadow-xl hover:bg-gray-500">
                            <div className="flex justify-center">
                                <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"   alt="" 
                                className="h-31 "/>
                            </div>
                            <p className="flex justify-center text-lg font-bold">"Usuario 1234"</p>
                        </Link> 

                    </div>
                </div>
            </div>
        </>
    )
}

export default Artistas;