import React from "react";
import Menu from "../Objetos/Menu";
import { Link } from "react-router-dom";
import CategoriaSelect from "../Objetos/CategoriaSelect";
const Home: React.FC = () => {
    return(
        <>
            <Menu></Menu>

            <div className="grid grid-cols-5 pt-23">
                <div className="bg-gray-800">
                    <h1 className="text-2xl text-white font-semibold flex justify-center p-3 my-3">
                        Top 10 Usuarios
                    </h1>
                    <ol className=" p-2 ml-3">
                        <UsuariosPopulares></UsuariosPopulares>
                        <UsuariosPopulares></UsuariosPopulares>
                        <UsuariosPopulares></UsuariosPopulares>
                        <UsuariosPopulares></UsuariosPopulares>

                    </ol>
                </div>
                
                <div className="p-2 px-5 col-span-4">
                    <h1 className="text-4xl font-bold my-3 text-white">Arte Más Reciente</h1>

                    <FiltroPantallaMD></FiltroPantallaMD>
                    <FiltroPantallaSM></FiltroPantallaSM>

                    <div id="Publicaciones" className="grid grid-cols-3 md:grid-cols-4 my-10">

                       <ArtesPublic></ArtesPublic>
                       <ArtesPublic></ArtesPublic>
                       <ArtesPublic></ArtesPublic>
                       <ArtesPublic></ArtesPublic>
                       <ArtesPublic></ArtesPublic>
                      

                    </div>

                </div>

            </div>
        </>

        
    )
}

export default Home


const ArtesPublic:React.FC = () => {
    return(
        <>
         <Link to="/Publicacion" className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
         hover:drop-shadow-xl hover:bg-gray-500">
            <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" 
            className="sm:h-45 sm:w-84 h-24 w-full"/>
            <p className="sm:flex justify-center sm:text-lg text-sm font-bold">"Arte de ejemplo"</p>
            <p className="sm:flex justify-start text-xs">"Por: Usuario 123"</p>
        </Link>
        </>
    )
}



const UsuariosPopulares: React.FC = () => {
    return(
        <>
            <li className="flex justify-center">
                <Link to="/Perfil" className="p-2 bg-gray-700 text-white mr-3 mb-3 rounded
                 hover:drop-shadow-xl hover:bg-gray-500">
                <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"   alt="" 
                className="sm:h-31 w-full h-20"/>
                <p className="flex justify-center text-lg font-bold">Usuario 123</p>
                </Link>   
            </li>
        </>
    )
}

const FiltroPantallaMD: React.FC = () => {
    return (
        <>
            <form action="" className="hidden md:block">
                <label htmlFor="" className="text-lg text-slate-300 font-semibold">Categoria:</label>
                <CategoriaSelect></CategoriaSelect>
                <label htmlFor="" className="text-lg text-slate-300 font-semibold">Desde:</label>
                <input type="date" className="bg-gray-200 rounded mx-2 p-1 px-2" />

                <label htmlFor="" className="text-lg text-slate-300 font-semibold">Hasta:</label>
                <input type="date" className="bg-gray-200 rounded mx-2 p-1 px-2" />
                <button className=" p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white">Filtrar</button>
            </form>
        
        </>
    )
}


const FiltroPantallaSM: React.FC = () => {
    return (
        <>
            <form action="" className="md:hidden grid grid-cols-1 space-y-2">
                <div>
                    <label htmlFor="" className="text-lg text-slate-300 font-semibold">Categoria:</label>
                
                      <CategoriaSelect></CategoriaSelect>
                   


                </div>

                <div>
                    
                <label htmlFor="" className="text-lg text-slate-300 font-semibold">Desde:</label>
                <input type="date" className="bg-gray-200 rounded md:mx-2 p-1 px-2 w-full" />
                
                </div>

                <div>
                <label htmlFor="" className="text-lg text-slate-300 font-semibold">Hasta:</label>
                <input type="date" className="bg-gray-200 rounded md:mx-2 p-1 px-2 w-full"  />

                </div>
                <button className=" p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white">Filtrar</button>
            </form>
        
        </>
    )
}