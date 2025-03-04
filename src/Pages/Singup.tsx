import React from "react";
import Menu_LogSing from "../Objetos/Menu_LogSing";
import { Link } from "react-router-dom";
const Singup: React.FC = () => {
    return(
        <>
            <Menu_LogSing></Menu_LogSing>


            <div className="grid grid-cols-2 ">
                <div>
                    
                    <img src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp" alt="" 
                        className="h-screen w-full "/>
                </div>

                <div className="pt-20">
                    <h1 className="flex justify-center pt-10 text-white font-bold text-5xl">¡Registrate!</h1>
                    
                    <form action="/Home" className="flex justify-center">

                        <ol className="pt-10 space-y-2">
                            <li>
                                <label htmlFor="" className="text-white">Correo:</label>
                                <br />
                                <input type="text" placeholder="usuario@mail.com"
                                className="rounded w-96 px-2 p-1 bg-slate-200" />
                            </li>
                            <li>
                                <label htmlFor="" className="text-white">Contraseña:</label>
                                <br />
                                <input type="text" placeholder="Contraseña"
                                className="rounded w-96 px-2 p-1 bg-slate-200" />
                            </li>
                            <li>
                                <label htmlFor="" className="text-white">Nombre:</label>
                                <br />
                                <input type="text" placeholder="Nombre Apellido"
                                className="rounded w-96 px-2 p-1 bg-slate-200" />
                            </li>
                            <li className="grid grid-cols-2">
                                <div>
                                    <label htmlFor="" className="text-white">Fecha de Nacimiento:</label>
                                    <br />
                                    <input type="date" placeholder=""
                                    className="rounded  px-2 p-1 bg-slate-200" />

                                </div>
                                <div>
                                    <label htmlFor="" className="text-white">Genero:</label>
                                    <br />
                                    <select name="" id=""  className="rounded  px-2 p-1 bg-slate-200">
                                        <option value="">Hombre</option>
                                        <option value="">Mujer</option>
                                    </select>
                           

                                </div>
                            </li>
                            <li>
                            <input type="submit" value="Enviar" className=" bg-gray-500 rounded text-white font-bold text-lg hover:text-black hover:bg-slate-300 w-full p-1" />

                            </li>
                        </ol>
                    </form>
                    <p className="flex justify-center text-white">¿Ya tienes cuenta? <Link to="/login" className="text-blue-400 hover:text-blue-200 px-2 hover:underline"> ¡Inicia sesión!</Link></p>
                </div>

            </div>
        </>
    )
}

export default Singup;