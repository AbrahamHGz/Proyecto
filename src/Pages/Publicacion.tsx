import React from "react";
import { Link } from "react-router-dom";
import Menu from "../Objetos/Menu";
import Comentario from "../Objetos/Comentarios";

const Publicacion: React.FC = () => {
    return(
        <>
            <Menu></Menu>
            <div className="rounded p-4">
                 <div className="pt-26 px-30">
                <div className=" w-full flex bg-gray-400 justify-center p-5">
                    <img src="https://ahoraeg.com/listas/wp-content/uploads/2024/06/Estas-son-las-Montanas-Mas-Altas-de-Asia.webp"
                     alt="" className="rounded my-2 h-96"/>
                </div>

                <div className="flex bg-gray-500 grid grid-cols-4">
                    <div className="p-2 flex">
                        <Link to="/Perfil">
                            <img src="https://static.vecteezy.com/system/resources/previews/022/077/324/large_2x/chinese-dragon-fantasy-background-asian-and-eastern-mythological-creature-illustration-for-chinese-new-year-generative-ai-photo.jpg" alt="" 
                            className=" size-30 border-4 border-slate-900 border-double"/>
                        </Link>
                        <div className="text-white p-2">
                            <Link  to="/Perfil" className="hover:underline text-xl font-bold">Usuario 123</Link>
                            <p><strong>Fecha:</strong> 24/02/2025</p>
                            <div className="flex items-center">
                                <svg className="size-7 text-red-300  ms-1   " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                                <p className="p-2 font-bold text-xl">20</p>

                            </div>
                            <button className=" mt-2 hover:underline text-black">Reportar</button>
                      
                        </div>

                    </div>

                    <div className="p-4 text-white col-span-3">
                        <p className="text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores quibusdam, praesentium id quia odit ducimus? Illo omnis sint, vitae dolore, velit cupiditate rerum nesciunt beatae, eaque at iusto tenetur eveniet.</p>
                        <p><strong>Categorias: </strong>Arte, Paisaje</p>
                        <div className="flex justify-end items-center">
                            <svg className="size-10 text-gray-800  ms-1 hover:text-yellow-300  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>

                            <div>
                                <Link to="/Editar publicacion" className="text-white font-bold  bg-slate-800 px-4 p-2 rounded hover:bg-slate-200 hover:text-black ml-2">Editar Publicación</Link>
                            </div>

                        </div>

                    </div>
                </div>

                <div id="Comentarios">
                    <Escribe_Comentario></Escribe_Comentario>
                    <Comentario></Comentario>
                    <Comentario></Comentario>
                    <Comentario></Comentario>

                </div>
            </div>
            </div>
        </>
    )
}

export default Publicacion;


const Escribe_Comentario: React.FC = () => {
    return(
        <>
            <div className="mt-2 p-2 bg-gray-500">
                <h1 className="font-bold text-white text-2xl flex justify-center">Escribe un comentario</h1>
            </div>
            <form action="" className="bg-gray-400 pb-1">
                <ol>
                    <li className="px-4 py-2 flex">
                        <textarea name="" className="w-full mt-2 rounded bg-gray-200 p-2"
                         id=""></textarea>
                    </li>
  
                </ol>
                <div className="m-4">
                    <input type="submit" value="Comentar" className="px-4 rounded text-xl font-bold hover:bg-slate-300 hover:text-black py-3 w-full bg-slate-500 text-white" />

                </div>
            </form>
        </>
    )
}