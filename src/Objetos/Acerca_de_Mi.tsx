import React, { useEffect, useState } from "react";
import {getDataPerfil,  EdtiarAcercaMi} from "../services/api";
import { useNavigate } from "react-router-dom";



const Acerca_de_mi: React.FC = () => {

    const navigate = useNavigate();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [usuario, setUsuario] = useState<any>(null);
    const [acercami, setAcercaMi] = useState('');
    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const email = usuarioInfo.email

    const handleAcercaMiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setAcercaMi(value);
    };

    const toggleFormulario = () => {
        setMostrarFormulario(!mostrarFormulario);
    }
    
    
    useEffect(() => {
        if(usuarioInfo?.email){
            cargarPerfil(usuarioInfo.email)
        }
    },[])

    const cargarPerfil = async(email: string) => {
        try{
            const data = await getDataPerfil(email);
            setUsuario(data)
            setAcercaMi(data.descripcion || '');
        }catch(error){
            console.log("Error al cargar el perfil:", error);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
                    
        e.preventDefault();
        try {
            await EdtiarAcercaMi(
                email,
                acercami
            );
            alert("Usuario editado exitosamente");
            navigate('/Perfil');
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al editar el usuario");  // Fallback si el error no tiene mensaje específico
            }
        }
    };

    return (
        <>
            <div>
                <div className="flex space-x-10 items-center">
                    <h1 className="text-2xl font-semibold">Acerca de mí</h1> 
                    <button onClick={toggleFormulario} 
                    className="text-white font-bold  bg-slate-800 px-4 p-2 rounded hover:bg-slate-700 ">
                    {mostrarFormulario ? 'Cancelar': 'Editar'}
                    </button>
                
                </div>

                {mostrarFormulario && (
                    <form action="/Perfil" onSubmit={handleSubmit}>
                        <textarea name="" id=""
                        className="bg-white w-full my-2 rounded p-2" 
                        value={acercami}
                        onChange={handleAcercaMiChange}
                        ></textarea>
                        
                        <button type="submit" 
                        className="text-white font-bold  bg-slate-800 px-4 p-2 rounded hover:bg-slate-700 ">
                            Guardar
                        </button>
                    </form>
                )

                }

                <p className="p-2">{usuario?.descripcion || "Cargando..."}</p>
                
            </div>
        </>
    )
}

export default Acerca_de_mi;