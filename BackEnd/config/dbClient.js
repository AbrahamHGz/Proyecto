import { MongoClient } from "mongodb";
import mongoose from "mongoose";

class dbClient {
    constructor(){
        this.conectarBaseDatos();
    }
    async conectarBaseDatos(){
        const queryString = "mongodb://localhost:27017/PruebaDB";
        await mongoose.connect(queryString);
        console.log("Conexion Exitosa");
    }

    async cerrarConexion(){
        try{
            await mongoose.disconnect();
            console.log("Conexion a la base de datos cerrada");
        }catch(e){
            console.error("Error al cerrar la conexion: " ,e);
        }
    }
}

export default new dbClient();