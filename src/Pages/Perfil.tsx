import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../auth/autenticacion";

import Publicaciones from "../Objetos/Publicaciones";
import Menu from "../Objetos/Menu";
import Acerca_de_mi from "../Objetos/Acerca_de_Mi";
import Favoritos from "../Objetos/Favoritos";

import { getDataPerfil } from "../services/api";
import {
  borrarSeguir,
  crearSeguir,
  obtenerCantidadSeguidores,
  obtenerSeguir,
} from "../services/apiSeguidores";

const Perfil: React.FC = () => {
  // Estado para controlar el modal de confirmación de logout
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [seccionActiva, setSeccionActiva] = useState<string>("AcercadeMi");
  const [usuario, setUsuario] = useState<any>(null);
  const [siguiendo, setSiguiendo] = useState<string>("");
  const [cantidad, setCantidad] = useState<{ seguidores: number; siguiendo: number } | null>(null);

  const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
  const ids: string = usuarioInfo.id;
  const { id } = useParams<{ id: string }>();

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      cargarPerfil(id);
      fetchSeguir(id);
    }
  }, [id]);

  const cargarPerfil = async (id: string) => {
    try {
      const data = await getDataPerfil(id);
      setUsuario(data);
    } catch (error) {
      console.error("Error al cargar el perfil:", error);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);};

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);};

  const handleConfirmLogout = () => {
    authContext?.logout();
    navigate("/login");};

  const handleSubmitSeguir = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return alert("No hay perfil para realizar la acción");
    try {
      await crearSeguir(ids, id);
      fetchSeguir(id);
    } catch (error: any) {
      if (error.response?.data?.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert("Error inesperado al intentar seguir");
      }
    }
  };

  const handleBorrarSeguir = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siguiendo) return;
    try {
      await borrarSeguir(siguiendo);
      fetchSeguir(id!);
    } catch (error: any) {
      if (error.response?.data?.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert("Error inesperado al dejar de seguir");
      }
    }
  };

  const fetchSeguir = async (perfilId: string) => {
    try {
      const data = await obtenerSeguir(ids, perfilId);
      setSiguiendo(data?._id || "");
      const cant = await obtenerCantidadSeguidores(perfilId);
      setCantidad(cant);
    } catch (error) {
      console.error("Error al obtener seguidor:", error);
    }
  };

  return (
    <>
      <Menu />

      <div className="flex lg:mx-40 md:mx-20 mx-2 grid grid-cols-2 items-center pt-26 mb-3">
        <div className="md:flex">
          <img
            src={
              usuario?.imagen ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELPl2WQuMBShrQaqe0IWYjLf_y2XRkhGNWcdLfADOPJ6KAJe84GaYOQ51__wkkbGfR78&usqp=CAU"
            }
            alt="Perfil"
            className="md:size-30 size-25 rounded-full"
          />
          <div className="text-white px-3">
            <p className="font-bold md:text-5xl text-2xl">
              {usuario?.nombre || "Cargando..."}
            </p>
            <p className="font-semibold text-xl">
              {usuario?.email || "Cargando..."}
            </p>
            <p>
              <strong>Seguidores:</strong> {cantidad?.seguidores ?? 0}
            </p>
            <p>
              <strong>Siguiendo:</strong> {cantidad?.siguiendo ?? 0}
            </p>
          </div>
        </div>

        {usuario?._id === ids ? (
          <div className="mt-2 flex justify-end space-x-3">
            <Link
              to={`/Editar Perfil/${id}`}
              className="p-2 bg-slate-800 rounded hover:bg-slate-700 font-bold text-white"
            >
              Editar Perfil
            </Link>
            <button
              onClick={handleLogoutClick}
              className="p-2 bg-red-500 rounded border-red-100 hover:text-black hover:bg-red-400 font-bold text-white px-8"
            >
              Salir
            </button>
          </div>
        ) : siguiendo ? (
          <div onClick={handleBorrarSeguir} className="mt-2 flex justify-end space-x-3">
            <button className="p-2 bg-slate-800 rounded hover:bg-slate-700 font-bold text-white">
              Dejar de seguir
            </button>
          </div>
        ) : (
          <div onClick={handleSubmitSeguir} className="mt-2 flex justify-end space-x-3">
            <button className="p-2 bg-slate-800 rounded hover:bg-slate-700 font-bold text-white">
              Seguir
            </button>
          </div>
        )}
      </div>

      <div className="lg:mx-40 md:mx-20 space-x-2">
        <button
          onClick={() => setSeccionActiva("AcercadeMi")}
          className={`font-bold lg:px-10 p-1 rounded-t text-white hover:bg-gray-400 ${
            seccionActiva === "AcercadeMi" ? "bg-gray-400" : "bg-gray-500"
          }`}
        >
          Acerca de mí
        </button>
        <button
          onClick={() => setSeccionActiva("Publicaciones")}
          className={`font-bold lg:px-10 p-1 rounded-t text-white hover:bg-gray-400 ${
            seccionActiva === "Publicaciones" ? "bg-gray-400" : "bg-gray-500"
          }`}
        >
          Publicaciones
        </button>
        <button
          onClick={() => setSeccionActiva("Favoritos")}
          className={`font-bold lg:px-10 p-1 rounded-t text-white hover:bg-gray-400 ${
            seccionActiva === "Favoritos" ? "bg-gray-400" : "bg-gray-500"
          }`}
        >
          Favoritos
        </button>
      </div>

      <div className="lg:mx-40 md:mx-20 bg-gray-400 p-4 rounded-b rounded-e">
        {seccionActiva === "AcercadeMi" && <Acerca_de_mi usuario_i={usuario} />}
        {seccionActiva === "Publicaciones" && <Publicaciones usuario_i={usuario} />}
        {seccionActiva === "Favoritos" && <Favoritos usuario_i={usuario} />}
      </div>

      {/* Modal de confirmación de logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/50 z-50">
          <div className="bg-white/90 p-6 rounded-lg shadow-lg space-y-4 backdrop-blur-sm">
            <p className="text-lg font-semibold">
              ¿Seguro que deseas salir de la aplicación?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Perfil;
