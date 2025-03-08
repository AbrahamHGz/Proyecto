import React from "react";
import Menu from "../Objetos/Menu";

const Editar_Publicacion: React.FC = () => {
    return(
        <>
            <Menu></Menu>
            <div className="pt-26 ">
                <div className="mt-2 p-4 rounded mx-20 bg-slate-400">
                    <h1 className="flex justify-center text-white font-bold  text-3xl">Editar Publicación</h1>
                    <form action="" className="grid grid-cols-3 my-2">

                        <ol className="">
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl">Titulo:</label>
                                <br />
                                <input type="text" className="w-95 rounded bg-slate-200 px-2 p-1" 
                                placeholder="Titulo"/>
                            </li>
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl">Descripción:</label>
                                <br />
                                <textarea name="" className="w-95 rounded bg-slate-200 px-2 p-1" 
                                id="" placeholder="Descripción"></textarea>
                            </li>
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl ">Categorias</label>
                                <br />
                                <select name=""  className="mt-2 rounded bg-slate-200 px-2 p-1"  id="">
                                    <option value="">Arte</option>
                                    <option value="">3D</option>

                                </select>

                                <p className="text-white" id="CategoriaZone">Arte, 3D</p>
                            </li>
                            <li className="mt-4">
                            <input type="button" value="Cargar imagen"  className="  bg-slate-500 rounded text-white font-bold text-lg hover:text-black hover:bg-slate-300 w-96 p-1" />
                                
                            </li>
                            
                            <input type="submit" value="Editar" className="my-5 text-white font-bold  bg-slate-800 px-4 p-2 rounded hover:bg-slate-700  w-96 p-1" />
                            <br />
                            <input type="submit" value="Borrar" className=" text-red-800 hover:underline text-lg" />

                        </ol>
                        <div className="col-span-2">
                            
                            <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" 
                            className=""/>
                        </div>

                    </form>
                </div>
                    <p className="p-2"></p>
            </div>
        </>
    )
}

export default Editar_Publicacion;