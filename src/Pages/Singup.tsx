import React from "react";
import Menu_LogSing from "../Objetos/Menu_LogSing";
import { Link } from "react-router-dom";
import { crearUsuario } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Singup: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [nombreValid, setNombreValid] = useState<boolean | null>(null);

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState<boolean | null>(null);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState<boolean | null>(null)

    const [sexo, setSexo] = useState('Hombre');
    const [TipoUsu, setTipoUsu] = useState('artista');

    const [FechaNac, setFechaNac] = useState('');
    const [FechaNacValid, setFechaNacValid] = useState<boolean | null>(null);

    const [Estatus, setEstatus] = useState(true);
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

    const handleSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault();
        try {
            await crearUsuario(
                nombre, 
                email,
                password, 
                sexo, 
                TipoUsu,
                new Date(FechaNac),
                Estatus 
            );
            alert("Usuario creado exitosamente");
            setNombre("");
            setEmail("");
            setPassword("");
            setSexo("");
            setTipoUsu("artista");
            setFechaNac("");
            setEstatus(true);
            navigate('/Login');
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);  // Muestra el mensaje del backend
            } else {
                alert("Error inesperado al crear usuario");  // Fallback si el error no tiene mensaje específico
            }
        }
    };


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
                    
                    <form action="/Home" onSubmit={handleSubmit} className="flex justify-center">

                        <ol className="pt-10 space-y-2">
                            <li>
                                <label htmlFor="" className="text-white">Correo:</label>
                                <br />
                                <input type="text"  placeholder="usuario@mail.com"
                                className="rounded w-96 px-2 p-1 bg-slate-200"
                                // value={email} onChange={(e)=> setEmail(e.target.value)}
                                value={email} onChange={handleEmailChange} required/>
                                {email.length > 0 && ( <div className="text-sm mt-1">
                                {emailValid ? ( <p className="text-green-400">✅ El correo es válido.</p> ) : (<p className="text-red-400">
                                ❌ Debe contener "@".</p> )}
                                </div> )}
                            </li>
                            <li>
                                <label htmlFor="" className="text-white">Contraseña:</label>
                                <br />
                                <input type="text" placeholder="Contraseña"
                                className="rounded w-96 px-2 p-1 bg-slate-200" 
                                value={password} onChange={handlePasswordChange} required/>
                                {password.length > 0 && ( <div className="text-sm mt-1">
                                {passwordValid ? ( <p className="text-green-400">✅ La contraseña es válida.</p> ) : ( <div className="text-red-400">
                                {!/[a-zA-Z]/.test(password) && <p>❌ Debe contener letras.</p>} 
                                {!/[0-9]/.test(password) && <p>❌ Debe contener números.</p>} </div> )}
                                </div> )}
                            </li>
                            <li>
                                <label htmlFor="" className="text-white">Nombre:</label>
                                <br />
                                <input type="text" placeholder="Nombre Apellido"
                                className="rounded w-96 px-2 p-1 bg-slate-200"
                                value={nombre} onChange={handleNameChange} required/>
                                {nombre.length > 0 && ( <div className="text-sm mt-1">
                                {nombreValid ? ( <p className="text-green-400">✅ Nombre válido.</p> ) : ( <p className="text-red-400">
                                ❌ Solo letras y espacios permitidos. </p> )} </div> )}
                            </li>
                            <li className="grid grid-cols-2">
                                <div>
                                    <label htmlFor="" className="text-white">Fecha de Nacimiento:</label>
                                    <br />
                                    <input type="date" className="rounded px-2 p-1 bg-slate-200"
                                    value={FechaNac} onChange={handleBirthdateChange} />
                                    {FechaNac.length > 0 && ( <div className="text-sm mt-1">
                                    {FechaNacValid ? ( <p className="text-green-400">✅ Fecha seleccionada.</p> ) : ( <p className="text-red-400">
                                    ❌ Selecciona una fecha válida. </p> )} </div> )}

                                </div>
                                <div>
                                    <label htmlFor="" className="text-white">Genero:</label>
                                    <br />
                                    <select name="" id=""  className="rounded  px-2 p-1 bg-slate-200"
                                    value={sexo} onChange={(e)=> setSexo(e.target.value)}>
                                        <option value="Hombre">Hombre</option>
                                        <option value="Mujer">Mujer</option>
                                    </select>
                           

                                </div>
                            </li>
                            <li>
                            <input type="submit" value="Enviar" className=" bg-slate-700 rounded text-white font-bold text-lg  hover:bg-slate-800 w-full p-1"
                             disabled={
                                !passwordValid || !emailValid || !nombreValid || !FechaNacValid } />

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