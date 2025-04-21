import axios from 'axios';
import { I_Reporte } from '../interfaces/I_Reporte';

const API_URL = "http://localhost:5100";

export const crearReporte = async(
    REPusuario:string,
    REPdescripcion:string,
    REPtipo:string,
    REPpublicacion:string | null,
    REPcomentario:string | null
    
): Promise<void> =>{
    try {
        const response = await axios.post(`${API_URL}/reporte`, {REPusuario, REPdescripcion, REPtipo, REPpublicacion, REPcomentario });
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al realizar el reporte:", error);
        throw error;
    }
}

export const obtenerReporte = async(
): Promise<I_Reporte[]> => {
    try{
        const response = await axios.get(`${API_URL}/reporte`)
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const actualizarReporte = async(
    id:string,
    REPrespuesta:string,
    REPrevisado: boolean
): Promise<void> =>{
    try {
        const response = await axios.put(`${API_URL}/reporte/${id}`, {id,REPrespuesta, REPrevisado });
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al realizar el reporte:", error);
        throw error;
    }
}



