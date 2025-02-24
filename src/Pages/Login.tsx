import React from "react";
import Menu_LogSing from "../Objetos/Menu_LogSing";
import { Link } from "react-router-dom";

const Login:React.FC =() => {
    return (
        <>
            <Menu_LogSing></Menu_LogSing>

            <div className="flex justify-center  ">
                <div className="">

                <form action="" className=" p-15 shadow-xl  bg-gray-400 rounded m-40">
                    <h1 className="flex justify-center text-4xl mb-2 font-bold text-white">
                        Iniciar Sesión
                    </h1>
                    
                    <div className="w-96">
                        <ol className="space-y-3">
                            <li>
                                <label htmlFor="" className="font-semibold">Correo:</label>
                                <br />
                                <input type="text" className="rounded w-full px-2 p-1 bg-white" placeholder="correo@mail.com"/>
                            </li>
                            <li>
                                <label htmlFor="" className="font-semibold">Contraseña:</label>
                                <br />
                                <input type="password" name="" className="rounded w-full px-2 p-1 bg-white" id="" placeholder="Contraseña" />
                            </li>
                            <li>
                                <input type="submit" value="Enviar" className="px-30 bg-slate-200" />
                            </li>
                            <li>
                                <p>¿No tienes cuenta? <Link to="/SingUp" className="text-blue-800 hover:text-blue-200  font-bold underline">¡Registrate!</Link></p>
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