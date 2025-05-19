import axios from 'axios';
import { I_Comentario } from '../interfaces/I_comentarip';

const API_URL = "http://localhost:5100";

export const crearComentario = async(
    COMdescripcion:string,
    email:string,
    id:string
    
    
): Promise<void> =>{
    try {
        const token = sessionStorage.getItem("TOKEN");
        const response = await axios.post(`${API_URL}/comentario`, { COMdescripcion, email,id}, {headers: {Authorization: `Bearer ${token}`}});
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al crear comentario:", error);
        throw error;
    }
}


export const obtenerComentarios = async(
    id:string
): Promise<I_Comentario[]> => {
    try{
        const response = await axios.get(`${API_URL}/comentario/com/${id}`)
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const editarComentario = async(
    id:string,
    COMdescripcion:string,
    caso:string
): Promise<void> =>{
    try {
        const token = sessionStorage.getItem("TOKEN");
        const response = await axios.put(`${API_URL}/comentario/${id}`, { id,COMdescripcion, caso}, {headers: {Authorization: `Bearer ${token}`}});
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al editar el comentario:", error);
        throw error;
    }
}

export const borrarComentario = async(
    id:string,
    COMestatus:boolean,
    caso:string
): Promise<void> =>{
    try {
        const token = sessionStorage.getItem("TOKEN");
        const response = await axios.put(`${API_URL}/comentario/${id}`, {id, COMestatus, caso}, {headers: {Authorization: `Bearer ${token}`}});
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al borrar el comentario:", error);
        throw error;
    }
}