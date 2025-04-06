import React from "react";
import { Link } from "react-router-dom";
const Publicaciones: React.FC = () => {
    return (
        <>  
            <div className=" items-center space-x-5 mb-4">
                <h1 className="text-2xl font-semibold">Publicaciones</h1>

                <div className="grid md:grid-cols-3">

                    <div>
                        <label htmlFor="" className="">Categoria: </label>
                        <br />
                        <select name="" className="bg-white rounded px-2" id="">
                            <option value="">Prueba de categoria</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="">Desde:</label>
                        <br />
                        <input type="date" className="bg-white rounded px-2" />
                    </div>

                    <div>
                        <label htmlFor="">Hasta:</label>
                        <br />
                        <input type="date" className="bg-white rounded px-2" />

                    </div>

                </div>
                <button className="mt-2 p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white">Filtrar</button>

            </div>

            <div className="mb-4">
                <Link to="/Crear publicacion" className="text-white font-bold  bg-blue-800 px-4 p-2 rounded hover:bg-blue-700 ">Publicar</Link>
            </div>

            <div className="grid grid-cols-4">
                <PublicaUsu></PublicaUsu>
                <PublicaUsu></PublicaUsu>
                <PublicaUsu></PublicaUsu>
                <PublicaUsu></PublicaUsu>

                <PublicaUsu></PublicaUsu>


            </div>

        </>
    )
}

export default Publicaciones;

const PublicaUsu: React.FC = () => {
    return(
        <>
            <Link to="/Publicacion" className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
             hover:drop-shadow-xl hover:bg-gray-500">
                <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" 
                className="md:h-45 w-84"/>
                <p className="flex justify-center text-lg font-bold">Arte de ejemplo</p>
                <svg className="size-7 text-red-300  ms-1   " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <p className="p-2 font-bold text-xl">20</p>
            </Link>
        </>
    )
}