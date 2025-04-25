import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecuperarContraseña: React.FC = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Se ha enviado un correo a ${email} con las instrucciones para recuperar tu contraseña.`);
        navigate('/Login');
    };

    return (
        <div className="flex justify-center">
            <div className="sm:p-15 sm:shadow-xl sm:bg-gray-500 rounded md:m-40">
                <h1 className="flex justify-center text-4xl mb-2 font-bold text-white">  Recuperar Contraseña
                </h1>
                <form onSubmit={handleSubmit} className="my-40">
                    <div className="w-96">
                        <ol className="space-y-3">
                            <li>
                                <label className="font-semibold text-white">Correo:</label>
                                <br />
                                <input type="text" className="rounded w-full px-2 p-1 bg-slate-200" placeholder="correo@mail.com" required value={email} onChange={(e) => setEmail(e.target.value)}  />
                            </li>
                            <li>
                                <input type="submit" value="Enviar" className="bg-slate-700 rounded text-white font-bold text-lg hover:bg-slate-600 w-full p-1"  />
                            </li>
                        </ol>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecuperarContraseña;
