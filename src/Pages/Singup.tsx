import React from "react";
import Menu_LogSing from "../Objetos/Menu_LogSing";

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
                    
                    <form action="" className="flex justify-center">

                        <ol className="pt-10 space-y-2">
                            <li>
                                <label htmlFor="" className="text-white">Correo:</label>
                                <br />
                                <input type="text" placeholder="usuario@mail.com"
                                className="rounded w-96 px-2 p-1 bg-slate-400" />
                            </li>
                            <li>
                                <label htmlFor="" className="text-white">Contraseña:</label>
                                <br />
                                <input type="text" placeholder="Contraseña"
                                className="rounded w-96 px-2 p-1 bg-slate-400" />
                            </li>
                            <li>
                                <label htmlFor="" className="text-white">Nombre:</label>
                                <br />
                                <input type="text" placeholder="Nombre Apellido"
                                className="rounded w-96 px-2 p-1 bg-slate-400" />
                            </li>
                            <li className="grid grid-cols-2">
                                <div>
                                    <label htmlFor="" className="text-white">Fecha de Nacimiento:</label>
                                    <br />
                                    <input type="date" placeholder=""
                                    className="rounded  px-2 p-1 bg-slate-400" />

                                </div>
                                <div>
                                    <label htmlFor="" className="text-white">Genero:</label>
                                    <br />
                                    <select name="" id=""  className="rounded  px-2 p-1 bg-slate-400">
                                        <option value="">Hombre</option>
                                        <option value="">Mujer</option>
                                    </select>
                           

                                </div>
                            </li>
                        </ol>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Singup;