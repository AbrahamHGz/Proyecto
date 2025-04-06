import React from "react";
import Menu_LogSing from "../Objetos/Menu_LogSing";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login} from "../services/api";
import { useNavigate } from "react-router-dom";

const Login:React.FC =() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault();
        try {

            
            const {token, user}  = await login(email,password);
          

            sessionStorage.setItem("TOKEN", token);
            sessionStorage.setItem("USER_INFO", JSON.stringify(user))

            alert("Puede ingresar");
            setEmail("");
            setPassword("");
            navigate('/Perfil');
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al crear usuario");  // Fallback si el error no tiene mensaje específico
            }
        }
    };

    return (
        <>
            <Menu_LogSing></Menu_LogSing>

            <div className="flex justify-center  ">
                <div className="">

                <form action="/Home" onSubmit={handleSubmit} className="my-40  sm:p-15 sm:shadow-xl  sm:bg-gray-500 rounded md:m-40">
                    <h1 className="flex justify-center text-4xl mb-2 font-bold text-white">
                        Iniciar Sesión
                    </h1>
                    
                    <div className="w-96">
                        <ol className="space-y-3">
                            <li>
                                <label htmlFor="" className="font-semibold text-white">Correo:</label>
                                <br />
                                <input type="text" className="rounded w-full px-2 p-1 bg-slate-200" placeholder="correo@mail.com" required
                                 value={email} onChange={(e)=> setEmail(e.target.value)}/>
                            </li>
                            <li>
                                <label htmlFor="" className="font-semibold text-white">Contraseña:</label>
                                <br />
                                <input type="password" name="" className="rounded w-full px-2 p-1 bg-slate-200" id="" placeholder="Contraseña" required
                                value={password} onChange={(e)=> setPassword(e.target.value)}/>
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