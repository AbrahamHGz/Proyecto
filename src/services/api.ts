import axios from 'axios';

const API_URL = "http://localhost:5100";

export const crearUsuario = async(
    nombre:string, 
    email: string, 
    password: String,
    sexo: string,
    TipoUsu: string,
    FechaNac: Date,
    Estatus: boolean,
    //edad: number,
    
    
): Promise<void> =>{
    try {
        const response = await axios.post(`${API_URL}/usuario`, { nombre, email, password, sexo, TipoUsu, FechaNac, Estatus});
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
}

export const login = async(
    email: string, 
    password: String
): Promise<{token: string; user: any}> =>{
    try {
        const response = await axios.post(`${API_URL}/usuario/login`, { email, password});
        console.log("Respuesta del servidor:", response.data);
        return response.data;
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

export const getDataPerfil = async (email:string): Promise<any> => {
    try{
        const response = await axios.get(`${API_URL}/usuario/email/${email}`)
        return response.data;

    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}