import axios from 'axios';
import { Categoria } from '../interfaces/categoria';

const API_URL = "http://localhost:5100";

export const crearCategoria = async(
    CATnombre:string,
    email:string
): Promise<void> => {
    try{
        const response = await axios.post(`${API_URL}/categoria`, { CATnombre, email});
        console.log("Respuesta del servidor:", response.data);
    }catch(error){
     console.error("Error al crear la categoria:", error);
     throw error;   
    }
}

export const obtenerCategoriasDetallada = async(): Promise<Categoria[]> => {
    try{
        const response = await axios.get(`${API_URL}/categoria`)
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}