import React from "react";
import Menu from "../Objetos/Menu";
const Editar_Perfil: React.FC = () => {
    return(
        <>
            <Menu></Menu>

            <div className="pt-40">
                <div className="grid grid-cols-5 ">
                    <p></p>
                    <div className="bg-gray-400 rounded col-span-3 py-2">
                       
                        <form action="">
                            <h1 className="pt-4 text-4xl font-bold text-white  flex justify-center">Editar Perfil</h1>
                            <ol className="p-2 px-30">
                                <li>
                                    <label htmlFor="" className="text-white text-lg">Correo:</label>
                                    <br />
                                    <input type="text" className="bg-slate-200 w-full rounded px-2 p-1" placeholder="usuario@mail.com" />
                                </li>
                                <li>
                                    <label htmlFor="" className="text-white text-lg">Contraseña:</label>
                                    <br />
                                    <input type="password" className="bg-slate-200 w-full rounded px-2 p-1" placeholder="Contraseña" />
                                </li>
                                <li>
                                    <label htmlFor="" className="text-white text-lg">Nombre:</label>
                                    <br />
                                    <input type="text" className="bg-slate-200 w-full rounded px-2 p-1" placeholder="Nombre Apellido" />
                                </li>
                                <li className="flex  space-x-10">
                                    <div>
                                        <label htmlFor="" className="text-white text-lg">Fecha de Nacimiento:</label>
                                        <br />
                                        <input type="date" name="" className="bg-slate-200 rounded px-2 p-1" id="" />
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-white text-lg">Genero:</label>
                                        <br />
                                        <select name="" className="bg-slate-200 rounded px-2 p-1" id="">
                                            <option value="">Hombre</option>
                                            <option value="">Mujer</option>

                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <img src="" alt="" />
                                    <button className="bg-slate-600 text-white font-bold p-2 rounded mt-2 hover:bg-slate-500 ">Foto de Perfil</button>
                                </li>
                                <li>
                                    <input type="submit" value="Editar" className="p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white w-full my-2" />
                                </li>
                                <li className="flex justify-end">
                                    <button className="mt-4 text-red-800 font-bold hover:underline hover:text-red-200">Borrar perfil</button>
                                </li>
                            </ol>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Editar_Perfil;