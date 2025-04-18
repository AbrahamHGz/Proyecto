import axios from "axios";


const API_URL = "http://localhost:5100";

export const crearSeguir = async(
    SEGusuario:string,
    SEGsiguiendoA:string
): Promise<any> => {
    try{
        const response = await axios.post(`${API_URL}/seguir`, {SEGusuario, SEGsiguiendoA });
        console.log("Respuesta del servidor:", response.data);
    }catch(error){
        console.error("Error al añadirlo a seguir:", error);
        throw error;
    }
}


export const obtenerSeguir = async(
    LIKusuario:string,
    SEGsiguiendoA:string
): Promise<any> => {
    try{
        const response = await axios.get(`${API_URL}/seguir/${LIKusuario}/${SEGsiguiendoA}`)
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const obtenerCantidadSeguidores = async(
    id:string
): Promise<any> => {
    try{
        const response = await axios.get(`${API_URL}/seguir/count/${id}`)
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}


export const borrarSeguir = async(
    id:string
): Promise<void> =>{
    try {
        const response = await axios.delete(`${API_URL}/seguir/${id}`);
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al borrar el seguir:", error);
        throw error;
    }
}