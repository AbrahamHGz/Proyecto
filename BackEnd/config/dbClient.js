import { MongoClient } from "mongodb";

class dbClient {
    constructor(){
        const queryString = "mongodb://localhost:27017/";
        this.client = new MongoClient(queryString);
        this.conectarDB();
    }

    async conectarDB(){
        try{
            await this.client.connect();
            this.db = this.client.db('PruebaDB');
            console.log("Conectado al servidor de base de datos");
        }
        catch(e){
            console.log(e)
        }
    }
}

export default new dbClient;