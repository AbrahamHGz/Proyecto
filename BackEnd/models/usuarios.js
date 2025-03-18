import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";

class usuarioModelo {
    async create(usuario){
        const colUsuarios = dbClient.db.collection('usuario');
        return await colUsuarios.insertOne(usuario)
    }

    async update(id, usuario){
        const colUsuarios = dbClient.db.collection('usuario');
        return await colUsuarios.updateOne({_id: new ObjectId(id)}, { $set: usuario})
    }

    
    async delete(id){
        const colUsuarios = dbClient.db.collection('usuario');
        return await colUsuarios.deleteOne({_id: new ObjectId(id)})
    }


    async getAll(){
        const colUsuarios = dbClient.db.collection('usuario');
        return await colUsuarios.find({}).toArray();
    
    }

    async getOne(id){
        const colUsuarios = dbClient.db.collection('usuario');
        return await colUsuarios.findOne({_id: new ObjectId(id)});
    
    }
}

export default new usuarioModelo;