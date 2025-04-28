import axios from 'axios';
import { publicacion } from '../interfaces/publicacion';

const API_URL = "http://localhost:5100";

export const crearPublicacion = async(
    PUBnombre: string, 
    CATnombre: string[],
    email: string,
    PUBdescripcion: string,
    PUBimagen: string | null
): Promise<void> => {
    try {
        const token = sessionStorage.getItem("TOKEN");
        const response = await axios.post(`${API_URL}/publicacion`, { 
            PUBnombre, 
            CATnombre, 
            email, 
            PUBdescripcion, 
            PUBimagen
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al crear publicacion:", error);
        throw error;
    }
}

export const obtenerPublicaciones = async(): Promise<publicacion[]> => {
    try {
        const response = await axios.get(`${API_URL}/publicacion`);
        return response.data;
    } catch(e) {
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const obtenerUnaPublicacion = async(
    id: string
): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/publicacion/${id}`);
        return response.data;
    } catch(e) {
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const obtenerPublicacionUsuario = async(
    id: string
): Promise<publicacion[]> => {
    try {
        const response = await axios.get(`${API_URL}/publicacion/pub/${id}`);
        return response.data;
    } catch(e) {
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const editarPublicacion = async(
    PUBnombre: string, 
    CATnombre: string[],
    PUBdescripcion: string,
    id: string,
    PUBimagen: string | null
): Promise<void> => {
    try {
        const token = sessionStorage.getItem("TOKEN");
        const response = await axios.put(`${API_URL}/publicacion/${id}`, {
            id, 
            PUBnombre, 
            CATnombre, 
            PUBdescripcion, 
            PUBimagen
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Respuesta del servidor:", response.data);
    } catch (error: any) {
        console.error("Error al editar publicacion:", error);
        if (error.response && error.response.status === 401) {
            alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            sessionStorage.removeItem("USER_INFO");
            sessionStorage.removeItem("TOKEN");
            window.location.href = "/Login";
        }
        throw error;
    }
}

export const borrarPublicacion = async(
    id: string,
    PUBestatus: boolean
): Promise<void> => {
    try {
        const token = sessionStorage.getItem("TOKEN");
        const response = await axios.put(`${API_URL}/publicacion/est/${id}`, {
            id,
            PUBestatus
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Respuesta del servidor:", response.data);
    } catch (error: any) {
        console.error("Error al borrar la publicacion:", error);
        if (error.response && error.response.status === 401) {
            alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            sessionStorage.removeItem("USER_INFO");
            sessionStorage.removeItem("TOKEN");
            window.location.href = "/Login";
        }
        throw error;
    }
}