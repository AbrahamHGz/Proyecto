import { MongoClient } from "mongodb";
import mongoose from "mongoose";

class dbClient {
    constructor(){
        this.conectarBaseDatos();
    }
    async conectarBaseDatos(){
        try{
            const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority&appName=artropolisCluster`;
            await mongoose.connect(queryString);
            console.log("Conexion Exitosa");
        }catch(e){
            console.log(e);
        }
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