import React from "react";
import Menu_LogSing from "../Objetos/Menu_LogSing";
import { Link } from "react-router-dom";

const Login:React.FC =() => {
    return (
        <>
            <Menu_LogSing></Menu_LogSing>

            <div className="flex justify-center  ">
                <div className="">

                <form action="/Home" className=" p-15 shadow-xl  bg-gray-500 rounded m-40">
                    <h1 className="flex justify-center text-4xl mb-2 font-bold text-white">
                        Iniciar Sesión
                    </h1>
                    
                    <div className="w-96">
                        <ol className="space-y-3">
                            <li>
                                <label htmlFor="" className="font-semibold text-white">Correo:</label>
                                <br />
                                <input type="text" className="rounded w-full px-2 p-1 bg-slate-200" placeholder="correo@mail.com"/>
                            </li>
                            <li>
                                <label htmlFor="" className="font-semibold text-white">Contraseña:</label>
                                <br />
                                <input type="password" name="" className="rounded w-full px-2 p-1 bg-slate-200" id="" placeholder="Contraseña" />
                            </li>
                            <li>
                                
                                <input type="submit" value="Enviar" className=" bg-slate-700 rounded text-white font-bold text-lg  hover:bg-slate-600 w-full p-1" />
                            </li>
                            <li>
                                <p className="text-white">¿No tienes cuenta? <Link to="/SingUp" className="text-blue-300 hover:text-blue-200  font-bold hover:underline">¡Registrate!</Link></p>
                            </li>
                        </ol>

                    </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default Login;