import axios from 'axios';
import { I_Favorito } from '../interfaces/I_Favorito';

const API_URL = "http://localhost:5100";

export const crearFavorito = async(
    email:string,
    publicacion:string
    
): Promise<void> =>{
    try {
        const response = await axios.post(`${API_URL}/favorito`, {email, publicacion });
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al añadir el favorito:", error);
        throw error;
    }
}

export const obtenerFavorito = async(
    FAVusuario:string,
    FAVpublicacion:string
): Promise<any> => {
    try{
        const response = await axios.get(`${API_URL}/favorito/fav/${FAVusuario}/${FAVpublicacion}`)
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const obtenerFavoritosUsuario = async(
    id:string
): Promise<I_Favorito[]> => {
    try{
        const response = await axios.get(`${API_URL}/favorito/us/${id}`)
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const borrarFavorito = async(
    id:string
): Promise<void> =>{
    try {
        const response = await axios.delete(`${API_URL}/favorito/${id}`);
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al borrar el favorito:", error);
        throw error;
    }
}

