import React from "react";
import Menu from "../Objetos/Menu";

const Editar_Publicacion: React.FC = () => {
    return(
        <>
            <Menu></Menu>
            <Menu></Menu>
            <div className="pt-26 ">
                <div className="mt-2 p-4 rounded md:mx-20 md:bg-gray-400">
                    <h1 className="flex justify-center text-white font-bold  text-3xl">Editar Publicación</h1>
                    <form action="" className="grid xl:grid-cols-3 my-2">

                        <ol className="">
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl">Titulo:</label>
                                <br />
                                <input type="text" className="xl:w-95 w-full rounded bg-slate-200 px-2 p-1" 
                                placeholder="Titulo"/>
                            </li>
                            <li>
                                <label htmlFor="" className="font-semibold text-white text-2xl">Descripción:</label>
                                <br />
                                <textarea name="" className="xl:w-95 w-full rounded bg-slate-200 px-2 p-1" 
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
                            <input type="button" value="Cargar imagen"  className=" bg-slate-500 rounded text-white font-bold text-lg hover:text-black hover:bg-slate-300 lg:w-96 w-full  p-1" />
                                
                            </li>
                            <li className="xl:hidden">
                                <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" 
                                className="my-4 rounded"/>
                            </li>


                            <li className="mt-4">
                                <input type="submit" value="Editar" className="mb-2 text-white font-bold  bg-slate-800 px-4 p-2 rounded hover:bg-slate-700  md:w-96 w-full p-1" />
                            </li>
                        </ol>
                        <div className="hidden xl:block col-span-2">
                            
                            <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" 
                            className="w-full pl-3"/>
                        </div>

                    </form>
                </div>
                    <p className="p-2"></p>
            </div>
        </>
    )
}

export default Editar_Publicacion;