import React, { useEffect, useState } from "react";
import {getDataPerfil} from "../services/api";


const Acerca_de_mi: React.FC = () => {

    
        const [mostrarFormulario, setMostrarFormulario] = useState(false);

        const toggleFormulario = () => {
            setMostrarFormulario(!mostrarFormulario);
         }
    
    const [usuario, setUsuario] = useState<any>(null);
    
        useEffect(() => {
            const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
            if(usuarioInfo?.email){
                cargarPerfil(usuarioInfo.email)
            }
        })
    
        const cargarPerfil = async(email: string) => {
            try{
                const data = await getDataPerfil(email);
                setUsuario(data)
            }catch(error){
                console.log("Error al cargar el perfil:", error);
            }
        }
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
                    <form action="">
                        <textarea name="" id=""
                        className="bg-white w-full my-2 rounded p-2"></textarea>
                        
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