import React, { useState } from "react";
import Menu_LogSing from "../Objetos/Menu_LogSing";
import { recuperarContrasena } from "../services/api";

const RecuperarContraseña: React.FC = () => {
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState<{
    nombre: string;
    email: string;
    password: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await recuperarContrasena(email);
      setUsuario(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setUsuario(null);
      setError(err.response?.data?.error || "Error al recuperar contraseña");
    }
  };

  return (
    <>
      <Menu_LogSing />
      <div className="flex items-center justify-center min-h-screen">
        <div className="sm:p-15 sm:shadow-xl sm:bg-gray-500 rounded md:m-40 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">
            Recuperar Contraseña
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Correo:</label>
              <input
                type="text"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-slate-200"
              />
            </div>
            <button type="submit"  className="w-full p-2 bg-slate-700 text-white rounded font-bold hover:bg-slate-600"> Recuperar   </button>
          </form>

          {error && (
            <div className="mt-4 text-red-400 text-center">{error}</div>
          )}

          {usuario && (
            <div className="mt-6 bg-gray-700 p-4 rounded text-white">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Usuario encontrado:
              </h2>
              <p><strong>Nombre:</strong> {usuario.nombre}</p>
              <p><strong>Correo:</strong> {usuario.email}</p>
              <p><strong>Contraseña:</strong> {usuario.password}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecuperarContraseña;
