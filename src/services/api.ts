import axios from 'axios';

const API_URL = "http://localhost:5100";

export const crearUsuario = async(nombre:string, email: string, edad: number):  Promise<void> =>{
    try {
        const response = await axios.post(`${API_URL}/usuario`, { nombre, email, edad });
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
}

export const getData = async (): Promise<any> => {
    try{
        const response = await axios.get(`${API_URL}/usuario`)
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}