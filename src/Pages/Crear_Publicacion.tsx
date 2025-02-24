import React from "react";
import Menu from "../Objetos/Menu";

const Crear_Publicacion: React.FC = () => {
    return(
        <>
            <Menu></Menu>
            <div className="pt-26 ">
                <div className="mt-2 p-4 rounded mx-20 bg-slate-400">
                    <h1 className="flex justify-center text-white font-bold  text-3xl">Crear Publicación</h1>
                    <form action="" className="grid grid-cols-2">

                        <ol>
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl">Titulo</label>
                                <br />
                                <input type="text" className="w-95 rounded bg-gray-200 px-2 p-1" 
                                placeholder="Titulo"/>
                            </li>
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl">Descripción</label>
                                <br />
                                <textarea name="" className="w-95 rounded bg-gray-200 px-2 p-1" 
                                id="" placeholder="Descripción"></textarea>
                            </li>
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl ">Categorias</label>
                                <br />
                                <select name=""  className="mt-2 rounded bg-gray-200 px-2 p-1"  id="">
                                    <option value="">Arte</option>
                                    <option value="">3D</option>

                                </select>
                            </li>
                            <li>
                                
                            </li>
                            <li>
                                <input type="submit" value="Publicar" className="px-4 mt-2 bg-green-300 border text-green-700 hover:bg-lime-200 rounded" />
                            </li>
                        </ol>
                        <div>
                            <button className="flex justify-end border">Subir imagen</button>
                            <img src="" alt="" />
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Crear_Publicacion;