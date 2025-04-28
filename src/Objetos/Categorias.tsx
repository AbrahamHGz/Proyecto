import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link, useNavigate } from "react-router-dom";
import { crearCategoria, obtenerCategoriasDetallada, actualizarEstadoCategoria } from "../services/apiCategoria";
import { Categoria } from "../interfaces/categoria";

const Categorias: React.FC = () => {
  const navigate = useNavigate();
  const [CATnombre, setCATnombre] = useState('');
  const [email, setEmail] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Carga email del usuario
  useEffect(() => {
    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    if (usuarioInfo?.email) {
      setEmail(usuarioInfo.email);
    }
  }, []);

  // Fetch de categorías
  const fetchCategorias = async () => {
    try {
      const data = await obtenerCategoriasDetallada();
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };
  useEffect(() => {
    fetchCategorias();
  }, []);

  // Crear categoría
  const handleCATnombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCATnombre(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await crearCategoria(CATnombre, email);
      alert("Categoría creada con éxito");
      setCATnombre("");
      fetchCategorias();
    } catch (error: any) {
      if (error.response?.data?.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert("Error inesperado al crear la categoría");
      }
    }
  };

  // Toggle estado activo/inactivo
  const handleToggle = async (id: string, currentState: boolean) => {
    try {
      await actualizarEstadoCategoria(id, !currentState);
      // Actualizar UI sin re-fetch completo
      setCategorias((prev) =>
        prev.map((cat) =>
          cat._id === id ? { ...cat, CATactivo: !currentState } : cat
        )
      );
    } catch (error) {
      alert("Error al actualizar el estado de la categoría");
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl">Categorías</h1>

      {/* Filtro de fechas (pendiente implementar) */}
      <form className="lg:flex items-center lg:justify-center space-x-4 py-4">
        <label>Desde:</label>
        <input type="date" className="bg-slate-200 rounded p-1" />

        <label>Hasta:</label>
        <input type="date" className="bg-slate-200 rounded p-1 mb-2 lg:mb-0" />

        <input type="submit" value="Buscar" className="bg-slate-600 rounded p-1 px-4 text-white font-bold hover:bg-slate-500" />
      </form>

      {/* Crear nueva categoría */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-6">
        <input
          type="text"
          value={CATnombre}
          onChange={handleCATnombreChange}
          placeholder="Nombre de la categoría"
          className="bg-slate-200 rounded w-96 px-2 p-1"
          required
        />
        <button type="submit" className="bg-slate-600 rounded p-1 px-4 text-white font-bold hover:bg-slate-500">
          Crear
        </button>
      </form>

      {/* Lista de categorías */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {categorias.map((cat) => (
          <Categori
            key={cat._id}
            categoria={cat}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </>
  );
};

interface Props {
  categoria: Categoria;
  onToggle: (id: string, currentState: boolean) => void;
}

const Categori: React.FC<Props> = ({ categoria, onToggle }) => {
  const fecha = new Date(categoria.createdAt).toLocaleDateString();

  return (
    <div className="bg-slate-300 rounded p-4 my-2 mx-2">
      <h1 className="text-center text-2xl font-bold mb-2">{categoria.CATnombre}</h1>
      <div className="mb-2">
        <p className="font-semibold inline">Creado por: </p>
        <span>{categoria.CATusuario.nombre}</span>
      </div>
      <div className="mb-4">
        <p className="font-semibold inline">Fecha de creación: </p>
        <span>{fecha}</span>
      </div>
      {categoria.CATactivo ? (
        <button
          onClick={() => onToggle(categoria._id, categoria.CATactivo)}
          className="w-full bg-red-500 hover:bg-red-400 rounded p-2 font-bold text-white"
        >
          Desactivar
        </button>
      ) : (
        <button
          onClick={() => onToggle(categoria._id, categoria.CATactivo)}
          className="w-full bg-green-500 hover:bg-green-400 rounded p-2 font-bold text-white"
        >
          Activar
        </button>
      )}
    </div>
  );
};

export default Categorias;
