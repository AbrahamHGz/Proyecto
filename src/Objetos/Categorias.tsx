import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearCategoria, obtenerCategoriasDetallada, actualizarEstadoCategoria, eliminarCategoria } from "../services/apiCategoria";
import { Categoria } from "../interfaces/categoria";

const Categorias: React.FC = () => {
  const navigate = useNavigate();
  const [CATnombre, setCATnombre] = useState('');
  const [email, setEmail] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const usuarioInfo = JSON.parse(sessionStorage.getItem("USER_INFO") || "{}");
    if (usuarioInfo?.email) {
      setEmail(usuarioInfo.email);
    }
  }, []);

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

  const handleToggle = async (id: string, currentState: boolean) => {
    try {
      await actualizarEstadoCategoria(id, !currentState);
      setCategorias(prev => prev.map(cat => 
        cat._id === id ? { ...cat, CATactivo: !currentState } : cat
      ));
    } catch (error) {
      alert("Error al actualizar el estado de la categoría");
      console.error(error);
    }
  };

  const handleEliminar = async () => {
    if (!selectedCategoriaId) return;
    try {
      await eliminarCategoria(selectedCategoriaId);
      alert("Categoría eliminada con éxito");
      setSelectedCategoriaId('');
      fetchCategorias();
    } catch (error) {
      alert("Error al eliminar la categoría");
      console.error(error);
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartDate(value ? new Date(value + "T00:00:00") : null);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndDate(value ? new Date(value + "T23:59:59") : null);
  };

  const filteredCategorias = categorias.filter(cat => {
    const catDate = new Date(cat.createdAt);
    const meetsStart = !startDate || catDate >= startDate;
    const meetsEnd = !endDate || catDate <= endDate;
    return meetsStart && meetsEnd;
  });

  return (
    <>
      <h1 className="font-bold text-2xl">Categorías</h1>

      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={CATnombre}
            onChange={handleCATnombreChange}
            placeholder="Nombre de la categoría"
            className="bg-slate-200 rounded w-114 px-2 p-1"
            required
          />
          <button type="submit" className="bg-slate-600 rounded p-1 px-8 text-white font-bold hover:bg-slate-500">
            Crear
          </button>
        </form>

        {/* Selector para eliminar */}
        <div className="flex items-center space-x-2">
          <select
            value={selectedCategoriaId}
            onChange={(e) => setSelectedCategoriaId(e.target.value)}
            className="bg-slate-200 rounded px-2 p-1 w-114"
          >
            <option value="">Seleccionar categoría</option>
            {filteredCategorias.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.CATnombre}
              </option>
            ))}
          </select>
          
          <button
            onClick={handleEliminar}
            disabled={!selectedCategoriaId}
            className="bg-red-600 rounded p-1 px-5 text-white font-bold hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Filtros de fecha - Posición modificada */}
      <div className="lg:flex items-center lg:justify-center space-x-4 py-4">
        <label>Desde:</label>
        <input 
          type="date" 
          className="bg-slate-200 rounded p-1" 
          onChange={handleStartDateChange}
          max={endDate?.toISOString().split('T')[0]}
        />
        
        <label>Hasta:</label>
        <input 
          type="date" 
          className="bg-slate-200 rounded p-1 mb-2 lg:mb-0" 
          onChange={handleEndDateChange}
          min={startDate?.toISOString().split('T')[0]}
        />
      </div>

      {/* Lista de categorías */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {filteredCategorias.map((cat) => (
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
      
    </div>
  );
};

export default Categorias;