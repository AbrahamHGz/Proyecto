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

export const getDataArtistasActivos = async (): Promise<any> => {
    try{
        const response = await axios.get(`${API_URL}/usuario/artistas`)
        return response.data;
    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const getDataAdmins = async () : Promise<any> => {
    try{
        const response = await axios.get(`${API_URL}/usuario/admins`)
        return response.data
    }catch(e){
        console.error("Error al obtener datos: ", e)
    }
}

export const getDataPerfil = async (id:string): Promise<any> => {
    try{
        const response = await axios.get(`${API_URL}/usuario/${id}`)
        return response.data;

    }catch(e){
        console.error("Error al obtener datos: ", e);
        throw e;
    }
}

export const EditarPerfil = async(
    nombre:string, 
    email: string, 
    password: String,
    sexo: string,
    FechaNac: Date,
    imagen: string | null,
    caso:string
): Promise<void> =>{
    try {
        const token = sessionStorage.getItem("TOKEN");
        const response = await axios.put(`${API_URL}/usuario/email/${email}`, { nombre, password, sexo, FechaNac, imagen, caso} ,{headers: {Authorization: `Bearer ${token}`}});
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al editar usuario:", error);
        throw error;
    }
}

export const EdtiarAcercaMi = async(
    email: string, 
    descripcion: string,
    caso:string
): Promise<void> => {
    try{
        const token = sessionStorage.getItem("TOKEN");
        const response = await axios.put(`${API_URL}/usuario/email/${email}`, { descripcion, caso} ,{headers: {Authorization: `Bearer ${token}`}});
        console.log("Respuesta del servidor:", response.data);
    }catch(error) {
        console.error("Error al editar usuario:", error);
        throw error;
    }
}


export const desactivarUsu = async(
    email: string, 
    Estatus:boolean // Recibe el valor booleano directamente
): Promise<void> => {
    try{
        const token = sessionStorage.getItem("TOKEN");
        // Se envía solo el campo 'Estatus'.
        // El backend en 'controllers/usuarios.js' ya está adaptado para manejar
        // el 'Estatus' directamente antes del 'switch(caso)'.
        const response = await axios.put(`${API_URL}/usuario/email/${email}`, { Estatus } ,{headers: {Authorization: `Bearer ${token}`}});
        console.log("Respuesta del servidor:", response.data);
    }catch(error) {
        console.error("Error al cambiar el estado del usuario:", error);
        throw error;
    }
}

export const recuperarContrasena = async (
    email: string
  ): Promise<{ nombre: string; email: string; password: string }> => {
    const url = `${API_URL}/usuario/email/${encodeURIComponent(email)}`;
    const response = await axios.get(url);
    return response.data;
};

export const getDataArtistasParaAdmin = async (): Promise<any> => {
    try {
        const token = sessionStorage.getItem("TOKEN");
        const response = await axios.get(`${API_URL}/usuario/admin/artistas`, {headers: {Authorization: `Bearer ${token}`}});
        return response.data;
    } catch (e) {
        console.error("Error al obtener todos los artistas para admin: ", e);
        throw e;
    }
}