import React, { useEffect, useState, useRef } from "react";
import Menu from "../Objetos/Menu";
import { crearUsuario } from "../services/api";
import { useNavigate, Link, useParams } from "react-router-dom";

const Agrega_Administrador: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [nombreValid, setNombreValid] = useState<boolean | null>(null);

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState<boolean | null>(null);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState<boolean | null>(null)

    const [sexo, setSexo] = useState('Hombre');

    const [FechaNac, setFechaNac] = useState('');
    const [FechaNacValid, setFechaNacValid] = useState<boolean | null>(null);
    const TipoUsu = 'admin'
    const [Estatus, setEstatus] = useState(true);


    const [imagenPerfil, setImagenPerfil] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const ids = usuarioInfo.id
    const [alerts, setAlerts] = useState<{ msg: string, type: 'success' | 'error' }[]>([]);

    const showAlert = (msg: string, type: 'success' | 'error' = 'error') => {
        setAlerts([{ msg, type }]);
        setTimeout(() => setAlerts([]), 3000);
    };
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

    }, []);

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
            showAlert("¡Administrador creado exitosamente!", 'success');
            setNombre("");
            setEmail("");
            setPassword("");
            setSexo("");
            setFechaNac("");
            setTimeout(() => {
                navigate(`/Administrador/${ids}`);

            }, 1000);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                showAlert(`❌ ${error.response.data.error}`, 'error');  // Muestra el mensaje del backend
            } else {
                console.log("Error inesperado al crear el usuario");  // Fallback si el error no tiene mensaje específico
            }
        }
    };

    return (
        <>
            <Menu></Menu>
            {alerts.map((alert, idx) => (
                <div key={idx} className={`fixed top-5 left-1/2 transform -translate-x-1/2 ${alert.type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white px-6 py-2 rounded-lg shadow-lg z-50`}>
                    {alert.msg}
                </div>
            ))}

            <div className="pt-40">
                <div className="grid md:grid-cols-5 ">
                    <p></p>
                    <div className="md:bg-gray-400 rounded col-span-3 py-2">

                        <form action="" onSubmit={handleSubmit}>
                            <h1 className="pt-4 text-4xl font-bold text-white  flex justify-center">Agregar Administrador</h1>
                            <ol className="p-2 md:px-30">
                                <li>
                                    <label htmlFor="" className="text-white text-lg">Correo:</label>
                                    <br />
                                    <input type="text" className="bg-slate-200 w-full rounded px-2 p-1" placeholder="usuario@mail.com"
                                        value={email} onChange={handleEmailChange} required />
                                    {email.length > 0 && (<div className="text-sm mt-1">
                                        {emailValid ? (<p className="text-green-200">✅ El correo es válido.</p>) : (<p className="text-red-700">
                                            ❌ Debe contener "@".</p>)}
                                    </div>)}
                                </li>
                                <li>
                                    <label htmlFor="" className="text-white text-lg">Contraseña:</label>
                                    <br />
                                    <input type="password" className="bg-slate-200 w-full rounded px-2 p-1" placeholder="Contraseña"
                                        value={password} onChange={handlePasswordChange} required />
                                    {password.length > 0 && (<div className="text-sm mt-1">
                                        {passwordValid ? (<p className="text-green-200">✅ La contraseña es válida.</p>) : (<div className="text-red-700">
                                            {!/[a-zA-Z]/.test(password) && <p>❌ Debe contener letras.</p>}
                                            {!/[0-9]/.test(password) && <p>❌ Debe contener números.</p>} </div>)}
                                    </div>)}
                                </li>
                                <li>
                                    <label htmlFor="" className="text-white text-lg">Nombre:</label>
                                    <br />
                                    <input type="text" className="bg-slate-200 w-full rounded px-2 p-1" placeholder="Nombre Apellido"
                                        value={nombre} onChange={handleNameChange} required />
                                    {nombre.length > 0 && (<div className="text-sm mt-1">
                                        {nombreValid ? (<p className="text-green-200">✅ Nombre válido.</p>) : (<p className="text-red-700">
                                            ❌ Solo letras y espacios permitidos. </p>)} </div>)}
                                </li>
                                <li className="flex  space-x-10">
                                    <div>
                                        <label htmlFor="" className="text-white text-lg">Fecha de Nacimiento:</label>
                                        <br />
                                        <input type="date" name="" className="bg-slate-200 rounded px-2 p-1" id=""
                                            value={FechaNac}
                                            onChange={(e) => setFechaNac(e.target.value)}
                                            required />

                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-white text-lg">Genero:</label>
                                        <br />
                                        <select name="" className="bg-slate-200 rounded px-2 p-1" id=""
                                            value={sexo} onChange={(e) => setSexo(e.target.value)}>
                                            <option value="Hombre">Hombre</option>
                                            <option value="Mujer">Mujer</option>

                                        </select>
                                    </div>
                                </li>

                                <li>
                                    <input type="submit" value="Agregar" className="p-2 bg-slate-800 rounded  hover:bg-slate-700 font-bold text-white w-full my-2" />
                                </li>

                            </ol>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Agrega_Administrador