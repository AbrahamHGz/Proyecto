import axios from 'axios'

const API_URL = "http://localhost:5100";

export const crearLike = async(
    LIKusuario:string,
    LIKpublicacion:string
): Promise<any> => {
    try{
        const response = await axios.post(`${API_URL}/like`, {LIKusuario, LIKpublicacion });
        console.log("Respuesta del servidor:", response.data);
    }catch(error){
        console.error("Error al añadirlo a likes:", error);
        throw error;
    }
}


export const obtenerLike = async(
    LIKusuario:string,
    LIKpublicacion:string
): Promise<any> => {
    try{
        const response = await axios.get(`${API_URL}/like/${LIKusuario}/${LIKpublicacion}`)
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const obtenerCantidad = async(
    LIKpublicacion:string
):Promise<any> => {
    try{
        const response = await axios.get(`${API_URL}/like/count/${LIKpublicacion}`)
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const borrarLike = async(
    id:string
): Promise<void> =>{
    try {
        const response = await axios.delete(`${API_URL}/like/${id}`);
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al borrar el like:", error);
        throw error;
    }
}