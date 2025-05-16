import axios from 'axios';
import { Categoria } from '../interfaces/categoria';

const API_URL = "http://localhost:5100";

export const crearCategoria = async(
    CATnombre: string,
    email: string
): Promise<void> => {
    try{
        const response = await axios.post(`${API_URL}/categoria`, {
            CATnombre,
            email,
            CATactivo: true 
        });
        console.log("Respuesta del servidor:", response.data);
    }catch(error){
     console.error("Error al crear la categoria:", error);
     throw error;   
    }
}

export const obtenerCategoriasDetallada = async(): Promise<Categoria[]> => {
    try{
        const response = await axios.get(`${API_URL}/categoria`);
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const eliminarCategoria = async(id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/categoria/${id}`);
    } catch(error) {
        console.error("Error al eliminar categoría:", error);
        throw error;
    }
};

export const actualizarEstadoCategoria = async(id: string, estado: boolean): Promise<void> => {
    try {
      const response = await axios.put(
        `${API_URL}/categoria/${id}`,
        { CATactivo: estado },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Respuesta actualización:', response.data);
    } catch(error: any) {
      console.error("Error detallado:", error.response?.data || error.message);
      throw error;
    }
  };