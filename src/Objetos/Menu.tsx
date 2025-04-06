import React, { useState } from "react";
import { Link } from "react-router-dom";
const Menu: React.FC = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <div className="bg-slate-950 md:p-4 py-7 px-2 fixed w-full z-50">
                <div className="grid grid-cols-3 flex items-center">
                    <div className="flex items-center">
                        <Link to="/Home" className="mx-2 text-xl sm:text-2xl md:text-4xl font-bold text-white
                       hover:underline
                        ">ARTROPOLIS</Link>

                        <Link to="/Home" className="text-white mx-4 hidden lg:block font-bold text-3xl px-4 p-1
                        rounded hover:bg-slate-700">
                            Inicio
                        </Link>
                    </div>

                    <form action="" className="">
                        <input type="text" className="
                        bg-gray-200 lg:w-full p-2 rounded" 
                        placeholder="Buscar"/>
                       
                    </form>
                    



                    <div className="flex justify-end  text-white items-center ">

                        <button 
                            className="lg:hidden text-white mr-4"
                            onClick={toggleMenu}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-8 w-8" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 12h16M4 18h16" 
                                />
                            </svg>
                        </button>


                        <Link to="/Artistas" className="text-white mx-4 hidden lg:block font-bold text-3xl px-4 p-1
                            rounded hover:bg-slate-700">
                            Artistas
                        </Link>
                        <Link to="/Perfil" className="text-white mx-4 hidden lg:block font-bold text-3xl px-4 p-1
                        rounded hover:bg-slate-700">
                            Perfil
                        </Link>
                        <Link to="/Perfil" className=" mx-2 hidden lg:block">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU" 
                            alt="" className="size-16 rounded-full" />
                        </Link>
                    </div>
                </div>

                <div 
                    className={`md:hidden bg-slate-900 w-full fixed left-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'top-24' : '-top-full'}`}
                    style={{ zIndex: 40 }}
                >
                    <div className="flex flex-col p-4">
                        <Link 
                            to="/Home" 
                            className="text-white py-3 px-4 font-bold text-xl rounded hover:bg-slate-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link 
                            to="/Artistas" 
                            className="text-white py-3 px-4 font-bold text-xl rounded hover:bg-slate-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Artistas
                        </Link>
                        <Link 
                            to="/Perfil" 
                            className="text-white py-3 px-4 font-bold text-xl rounded hover:bg-slate-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Perfil
                        </Link>
                    </div>
                </div>

            </div>
        </>        
    )
}

export default Menu;