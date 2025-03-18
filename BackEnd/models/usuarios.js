import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";
import Usuario from "../schemas/usuarios.js"
import mongoose from "mongoose";

class usuarioModelo {
    async create(usuario){
        // const colUsuarios = dbClient.db.collection('usuario');
        // return await colUsuarios.insertOne(usuario)
        return await Usuario.create(usuario);
    }

    async update(id, usuario){
        return await Usuario.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, usuario,{new: true});
    }
    
    async delete(id){
        return await Usuario.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

    async getAll(){
        return await Usuario.find();
    }

    async getOne(id){
       return await Usuario.findById({_id: new mongoose.Types.ObjectId(id)})
    }
}

export default new usuarioModelo;