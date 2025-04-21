import React, { useEffect, useState } from "react";
import {getDataPerfil,  EdtiarAcercaMi} from "../services/api";
import { useNavigate } from "react-router-dom";
import { I_Usuario } from "../interfaces/usuario";

interface usuarioProps{
    usuario_i:I_Usuario
}
const Acerca_de_mi: React.FC<usuarioProps> = ({usuario_i}) => {

    const navigate = useNavigate();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [acercami, setAcercaMi] = useState('');
    const [descripcion, setDescripcion] = useState('')

    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const ids = usuarioInfo.id
    
    const cargarPerfil = async(id: string) => {
        try{
            const data = await getDataPerfil(id);
            setDescripcion(data.descripcion)
        }catch(error){
            console.log("Error al cargar el perfil:", error);
        }
    };

    useEffect(()=> {
        cargarPerfil(usuario_i?._id)
    }, [usuario_i?._id])
    
    
    const toggleFormulario = () => {
        setMostrarFormulario(!mostrarFormulario);
        setAcercaMi(descripcion)
    }
    
    const handleAcercaMiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setAcercaMi(value);
    };
    

    const handleSubmit = async (e: React.FormEvent) => {            
        e.preventDefault();
        try {
            await EdtiarAcercaMi(
                usuario_i?.email,
                acercami
            );
            alert("Usuario editado exitosamente");
            toggleFormulario();
            await cargarPerfil(usuario_i._id)
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
                    {usuario_i?._id === ids && (

                        <button onClick={toggleFormulario} 
                        className="text-white font-bold  bg-slate-800 px-4 p-2 rounded hover:bg-slate-700 ">
                        {mostrarFormulario ? 'Cancelar': 'Editar'}
                        </button>
                    )}
                
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

                <p className="p-2">{descripcion || "Cargando..."}</p>
                
            </div>
        </>
    )
}

export default Acerca_de_mi;