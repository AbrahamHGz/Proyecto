import React, { useEffect, useState, useRef, useContext } from "react";
import { getDataPerfil, EditarPerfil, desactivarUsu } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/autenticacion";
import Menu from "../Objetos/Menu";

const Editar_Perfil: React.FC = () => {
    const [alerts, setAlerts] = useState<{ msg: string, type: 'success' | 'error' }[]>([]);
    const showAlert = (msg: string, type: 'success' | 'error' = 'error') => {
        setAlerts([{ msg, type }]);
        setTimeout(() => setAlerts([]), 3000);
    };

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sexo, setSexo] = useState('Hombre');
    const [FechaNac, setFechaNac] = useState('');
    const [imagenPerfil, setImagenPerfil] = useState<string | null>(null);

    const [showConfirm, setShowConfirm] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    const ids = usuarioInfo.id;

    const validateFields = (): boolean => {
        if (!email.includes("@")) {
            showAlert("❌ El correo debe contener '@'.", "error");
            return false;
        }
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/.test(password);
        if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            showAlert("❌ La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial.", "error");
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            showAlert("❌ El nombre solo debe contener letras y espacios.", "error");
            return false;
        }
        if (!FechaNac) {
            showAlert("❌ Selecciona una fecha de nacimiento.", "error");
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (usuarioInfo?.id) cargarPerfil(usuarioInfo.id);
    }, []);

    const cargarPerfil = async (id: string) => {
        try {
            const data = await getDataPerfil(id);
            setNombre(data.nombre || '');
            setEmail(data.email || '');
            setFechaNac(data.FechaNac || '');
            setPassword(data.password || '');
            setSexo(data.sexo || 'Hombre');
            setImagenPerfil(data.imagen);
        } catch (error) {
            console.error("Error al cargar el perfil:", error);
        }
    };

    const Salir = () => {
        try {
            authContext?.logout();
            navigate("/login");
        } catch (e) {
            alert("Error al intentar salir de la aplicacion");
        }
    };

    const handelDesactivar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await desactivarUsu(email, false);
            showAlert("Usuario borrado exitosamente.", "success");
            Salir();
        } catch (error: any) {
            if (error.response?.data?.error) alert(`Error: ${error.response.data.error}`);
            else alert("Error inesperado al borrar el usuario");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields()) return;
        setShowConfirm(true);
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        try {
            await EditarPerfil(
                nombre,
                email,
                password,
                sexo,
                new Date(FechaNac),
                imagenPerfil,
                "Perfil"
            );
            showAlert("Usuario editado exitosamente.", "success");
            setTimeout(() => {
                navigate(`/Perfil/${ids}`);
                
            }, 1000);
        } catch (error: any) {
            if (error.response?.data?.error) showAlert(`❌ ${error.response.data.error}`, "error");
            else alert("Error inesperado al editar el usuario");
        }
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    const handleImageButtonClick = () => fileInputRef.current?.click();
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) setImagenPerfil(event.target.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const formatFecha = (dateStr: string) => dateStr.split("T")[0];

    return (
        <>
            <Menu />
<<<<<<< HEAD
=======
            {/* Floating alerts */}
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
            {alerts.map((alert, idx) => (
                <div key={idx} className={`fixed top-5 left-1/2 transform -translate-x-1/2 ${alert.type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white px-6 py-2 rounded-lg shadow-lg z-50`}>
                    {alert.msg}
                </div>
            ))}


            <div className="pt-40">
                <div className="grid md:grid-cols-5">
                    <div></div>
                    <div className="md:bg-gray-400 rounded col-span-3 py-2">
                        <form onSubmit={handleSubmit}>
                            <h1 className="pt-4 text-4xl font-bold text-white flex justify-center">Editar Perfil</h1>
                            <ol className="p-2 md:px-30 space-y-4">
                                <li>
                                    <label className="text-white text-lg">Correo:</label><br />
                                    <input
                                        readOnly
                                        type="text"
                                        className="bg-slate-200 w-full rounded px-2 p-1"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </li>
                                <li>
                                    <label className="text-white text-lg">Contraseña:</label><br />
                                    <input
                                        type="password"
                                        className="bg-slate-200 w-full rounded px-2 p-1"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </li>
                                <li>
                                    <label className="text-white text-lg">Nombre:</label><br />
                                    <input
                                        type="text"
                                        className="bg-slate-200 w-full rounded px-2 p-1"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </li>
                                <li className="flex space-x-10">
                                    <div>
                                        <label className="text-white text-lg">Fecha de Nacimiento:</label><br />
                                        <input
                                            type="date"
                                            className="bg-slate-200 rounded px-2 p-1"
                                            value={formatFecha(FechaNac)}
                                            onChange={(e) => setFechaNac(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-white text-lg">Género:</label><br />
                                        <select
                                            className="bg-slate-200 rounded px-2 p-1"
                                            value={sexo}
                                            onChange={(e) => setSexo(e.target.value)}
                                        >
                                            <option value="Hombre">Hombre</option>
                                            <option value="Mujer">Mujer</option>
                                        </select>
                                    </div>
                                </li>
                                <li className="flex flex-col items-center">
                                    {imagenPerfil && (
                                        <img
                                            src={imagenPerfil}
                                            alt="Imagen de perfil"
                                            className="w-32 h-32 rounded-full object-cover border-2 border-white mb-2"
                                        />
                                    )}
                                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} className="hidden" />
                                    <button
                                        type="button"
                                        onClick={handleImageButtonClick}
                                        className="bg-slate-700 text-white font-bold p-2 rounded hover:bg-slate-500"
                                    >
                                        {imagenPerfil ? 'Cambiar imagen' : 'Seleccionar imagen'}
                                    </button>
                                </li>
                                <li>
                                    <input
                                        type="submit"
                                        value="Editar"
                                        className="w-full p-2 bg-slate-800 rounded hover:bg-slate-700 font-bold text-white"
                                    />
                                </li>
                            </ol>
                        </form>
                        <div className="flex justify-end">
                            <button onClick={handelDesactivar}
                                className="mt-4 mx-4 text-red-300 md:text-red-800 font-bold hover:underline hover:text-red-200"> Borrar perfil
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/50 z-50">
                    <div className="bg-white/90 p-6 rounded-lg shadow-lg space-y-4 backdrop-blur-sm">
                        <p className="text-lg font-semibold">¿Seguro que deseas guardar estos cambios?</p>
                        <div className="flex justify-end space-x-4">
<<<<<<< HEAD
                            <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar </button>
                            <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Confirmar </button>

 </div>
 </div>
 </div>)}
=======
                            <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                Cancelar </button>
                            <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Confirmar </button>

                        </div>
                    </div>
                </div>
            )}
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
        </>
    );
};

export default Editar_Perfil;
