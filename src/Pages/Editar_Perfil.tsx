import React, { useEffect, useState,  useRef } from "react";
import {getDataPerfil, EditarPerfil} from "../services/api";
import { useNavigate } from "react-router-dom";

import Menu from "../Objetos/Menu";
const Editar_Perfil: React.FC = () => {

        const [nombre, setNombre] = useState('');
        const [nombreValid, setNombreValid] = useState<boolean | null>(null);
    
        const [email, setEmail] = useState('');
        const [emailValid, setEmailValid] = useState<boolean | null>(null);
    
        const [password, setPassword] = useState('');
        const [passwordValid, setPasswordValid] = useState<boolean | null>(null)
    
        const [sexo, setSexo] = useState('Hombre');
  
        const [FechaNac, setFechaNac] = useState('');
        const [FechaNacValid, setFechaNacValid] = useState<boolean | null>(null);
    
        const [imagenPerfil, setImagenPerfil] = useState<string | null>(null);
        const fileInputRef = useRef<HTMLInputElement>(null);
       
        
        const navigate = useNavigate();

        const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setPassword(value);
            const Letra = /[a-zA-Z]/.test(value);
            const Numero = /[0-9]/.test(value);
            setPasswordValid(Letra && Numero);
        };
        
        const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setEmail(value);
            setEmailValid(value.includes("@"));
        };
    
        const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setNombre(value);
            setNombreValid(/^[a-zA-Z\s]+$/.test(value));
        };
    
        const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setFechaNac(value);
            setFechaNacValid(value !== "");
        };

        const handleImageButtonClick = () => {
            fileInputRef.current?.click();
        };

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) {
                        setImagenPerfil(event.target.result as string);
                    }
                };
                reader.readAsDataURL(file);
            }
        };

        useEffect(() => {
            const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
            if (usuarioInfo?.email) {
                cargarPerfil(usuarioInfo.email);
            }
        }, []);
    
        const cargarPerfil = async (email: string) => {
            try {
                const data = await getDataPerfil(email);
                setNombre(data.nombre || '');
                setEmail(data.email || '');
                setFechaNac(data.FechaNac || '');
                setPassword(data.password || '')
                setSexo(data.sexo || 'Hombre');
                //setTipoUsu(data.TipoUsu || 'artista');
                //setEstatus(data.Estatus !== undefined ? data.Estatus : true);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
            }
        };

        const handleSubmit = async (e: React.FormEvent) => {
                
                e.preventDefault();
                try {
                    await EditarPerfil(
                        nombre, 
                        email,
                        password, 
                        sexo, 
                        new Date(FechaNac),
                    );
                    alert("Usuario editado exitosamente");
                    setNombre("");
                    setEmail("");
                    setPassword("");
                    setSexo("");
                    setFechaNac("");
                    navigate('/Perfil');
                } catch (error: any) {
                    if (error.response && error.response.data && error.response.data.error) {
                        alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
                    } else {
                        alert("Error inesperado al editar el usuario");  // Fallback si el error no tiene mensaje específico
                    }
                }
        };
        
        const formatFecha = (dateStr: string) => {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          };
    return(
        <>
            <Menu></Menu>

            <div className="pt-40">
                <div className="grid md:grid-cols-5 ">
                    <p></p>
                    <div className="md:bg-gray-400 rounded col-span-3 py-2">
                       
                        <form action="/Perfil" onSubmit={handleSubmit}>
                            <h1 className="pt-4 text-4xl font-bold text-white  flex justify-center">Editar Perfil</h1>
                            <ol className="p-2 md:px-30">
                                <li>
                                    <label htmlFor="" className="text-white text-lg">Correo:</label>
                                    <br />
                                    <input type="text" className="bg-slate-200 w-full rounded px-2 p-1" placeholder="usuario@mail.com"
                                    value={email} onChange={handleEmailChange} required readOnly/>
                                    {email.length > 0 && ( <div className="text-sm mt-1">
                                {emailValid ? ( <p className="text-green-200">✅ El correo es válido.</p> ) : (<p className="text-red-700">
                                ❌ Debe contener "@".</p> )}
                                </div> )}
                                </li>
                                <li>
                                    <label htmlFor="" className="text-white text-lg">Contraseña:</label>
                                    <br />
                                    <input type="password" className="bg-slate-200 w-full rounded px-2 p-1" placeholder="Contraseña"
                                     value={password} onChange={handlePasswordChange} required/>
                                      {password.length > 0 && ( <div className="text-sm mt-1">
                                      {passwordValid ? ( <p className="text-green-200">✅ La contraseña es válida.</p> ) : ( <div className="text-red-700">
                                      {!/[a-zA-Z]/.test(password) && <p>❌ Debe contener letras.</p>} 
                                      {!/[0-9]/.test(password) && <p>❌ Debe contener números.</p>} </div> )}
                                      </div> )}
                                </li>
                                <li>
                                    <label htmlFor="" className="text-white text-lg">Nombre:</label>
                                    <br />
                                    <input type="text" className="bg-slate-200 w-full rounded px-2 p-1" placeholder="Nombre Apellido"
                                     value={nombre} onChange={handleNameChange} required/>
                                     {nombre.length > 0 && ( <div className="text-sm mt-1">
                                    {nombreValid ? ( <p className="text-green-200">✅ Nombre válido.</p> ) : ( <p className="text-red-700">
                                    ❌ Solo letras y espacios permitidos. </p> )} </div> )}
                                </li>
                                <li className="flex  space-x-10">
                                    <div>
                                        <label htmlFor="" className="text-white text-lg">Fecha de Nacimiento:</label>
                                        <br />
                                        <input type="date" name="" className="bg-slate-200 rounded px-2 p-1" id="" 
                                         value={formatFecha(FechaNac)} onChange={handleBirthdateChange} />
                                        {FechaNac.length > 0 && ( <div className="text-sm mt-1">
                                        {FechaNacValid ? ( <p className="text-green-200">✅ Fecha seleccionada.</p> ) : ( <p className="text-red-700">
                                        ❌ Selecciona una fecha válida. </p> )} </div> )}
                                        </div>
                                    <div>
                                        <label htmlFor="" className="text-white text-lg">Genero:</label>
                                        <br />
                                        <select name="" className="bg-slate-200 rounded px-2 p-1" id=""
                                        value={sexo} onChange={(e)=> setSexo(e.target.value)}>
                                            <option value="Hombre">Hombre</option>
                                            <option value="Mujer">Mujer</option>

                                        </select>
                                    </div>
                                </li>
                                <li className="mt-4">
                                    <div className="flex flex-col items-center">
                                        {imagenPerfil && (
                                            <div className="mb-2">
                                                <img 
                                                src={imagenPerfil} 
                                                alt="Imagen de perfil" 
                                                className="w-32 h-32 rounded-full object-cover border-2 border-white" />
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden" />
                                        <button 
                                            type="button"
                                            onClick={handleImageButtonClick}
                                            className="md:bg-slate-600 bg-slate-700 text-white font-bold p-2 rounded hover:bg-slate-500" >
                                            {imagenPerfil ? 'Cambiar imagen' : 'Seleccionar imagen'}
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <input type="submit" value="Editar" className="p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white w-full my-2" />
                                </li>
                                <li className="flex justify-end">
                                    <button className="mt-4 text-red-300 md:text-red-800 font-bold hover:underline hover:text-red-200">Borrar perfil</button>
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