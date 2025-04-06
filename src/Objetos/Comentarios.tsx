import React from "react";
import { Link } from "react-router-dom";
const Comentario: React.FC = () => {
    return(
        <>
            <div className="bg-gray-400 mt-4 rounded lg:grid grid-cols-4">
                <div className="p-2 flex">
                    <Link to="/Perfil">
                        <img src="https://static.vecteezy.com/system/resources/previews/022/077/324/large_2x/chinese-dragon-fantasy-background-asian-and-eastern-mythological-creature-illustration-for-chinese-new-year-generative-ai-photo.jpg" alt="" 
                        className=" size-30 border-4 border-slate-900 border-double"/>
                    </Link>
                    <div className="text-white p-2">
                        <Link  to="/Perfil" className="hover:underline text-xl font-bold">Usuario 123</Link>
                      
                        <p><strong>Fecha:</strong> 24/02/2025</p>
                        
                        <button className=" mt-2 hover:underline text-red-900">Reportar</button>
                    </div>
                </div>
                <div className="p-4 text-white col-span-3">
                    <p className="text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores quibusdam, praesentium id quia odit ducimus? Illo omnis sint, vitae dolore, velit cupiditate rerum nesciunt beatae, eaque at iusto tenetur eveniet.</p>
                    {/* <div className="flex justify-end">
                        <button>
                            <svg className="size-10 text-gray-800  ms-1 hover:text-red-600  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Comentario;