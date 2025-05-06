import React, { useState } from "react";
import Menu_LogSing from "../Objetos/Menu_LogSing";
import { Link, useNavigate } from "react-router-dom";
import { crearUsuario } from "../services/api";

const Singup: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sexo, setSexo] = useState('Hombre');
  const [TipoUsu, setTipoUsu] = useState('artista');
  const [FechaNac, setFechaNac] = useState('');
  const [Estatus, setEstatus] = useState(true);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const showAlert = (msg: string) => {
    setAlerts([msg]);
    setTimeout(() => setAlerts([]), 3000);
  };

  const validateFields = (): boolean => {
    if (!email.includes("@")) {
      showAlert("❌ El correo debe contener '@'.");
      return false;
    }

    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/.test(password);

    if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      showAlert("❌ La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial.");
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      showAlert("❌ El nombre solo debe contener letras y espacios.");
      return false;
    }

    if (!FechaNac) {
      showAlert("❌ Selecciona una fecha de nacimiento.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    try {
      await crearUsuario(nombre, email, password, sexo, TipoUsu, new Date(FechaNac), Estatus);
      alert("Usuario creado exitosamente");
      // reset form
      setNombre("");
      setEmail("");
      setPassword("");
      setSexo("Hombre");
      setTipoUsu("artista");
      setFechaNac("");
      setEstatus(true);
      navigate('/Login');
    } catch (error: any) {
      if (error.response?.data?.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert("Error inesperado al crear usuario");
      }
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <Menu_LogSing />
      {alerts.map((msg, idx) => (
        <div key={idx} className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg z-50">
          {msg}
        </div>
      ))}

      <div className="lg:grid grid-cols-2">
        <div className="hidden lg:block">
          <img
            src="https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp"
            alt=""
            className="h-screen w-full"
          />
        </div>

        <div className="pt-20">
          <h1 className="flex justify-center pt-10 text-white font-bold text-5xl">¡Registrate!</h1>

          <form onSubmit={handleSubmit} className="flex justify-center">
            <ol className="pt-10 space-y-2">
              <li>
                <label className="text-white">Correo:</label>
                <br />
                <input
                  type="text"
                  placeholder="usuario@mail.com"
                  className="rounded w-96 px-2 p-1 bg-slate-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </li>
              <li>
                <label className="text-white">Contraseña:</label>
                <br />
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="rounded w-96 px-2 p-1 bg-slate-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </li>
              <li>
                <label className="text-white">Nombre:</label>
                <br />
                <input
                  type="text"
                  placeholder="Nombre Apellido"
                  className="rounded w-96 px-2 p-1 bg-slate-200"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </li>
              <li className="grid grid-cols-2">
                <div>
                  <label className="text-white">Fecha de Nacimiento:</label>
                  <br />
                  <input
                    type="date"
                    className="rounded px-2 p-1 bg-slate-200"
                    value={FechaNac}
                    onChange={(e) => setFechaNac(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-white">Género:</label>
                  <br />
                  <select
                    className="rounded px-2 p-1 bg-slate-200"
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                  >
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                  </select>
                </div>
              </li>
              <li>
                <input
                  type="submit"
                  value="Enviar"
                  className="bg-slate-700 rounded text-white font-bold text-lg hover:bg-slate-800 w-full p-1"
                />
              </li>
            </ol>
          </form>

          <p className="flex justify-center text-white">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-200 px-2 hover:underline">
              ¡Inicia sesión!
            </Link>
          </p>
        </div>
      </div>

      {/* Confirmación antes de crear usuario */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/50 z-50">
          <div className="bg-white/90 p-6 rounded-lg shadow-lg space-y-4 backdrop-blur-sm">
            <p className="text-lg font-semibold">¿Seguro que deseas guardar estos datos?</p>
            <div className="flex justify-end space-x-4">
          <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
        Cancelar </button>
        <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Confirmar </button>
        </div> </div> </div>
      )}
    </>
  );
};

export default Singup;
