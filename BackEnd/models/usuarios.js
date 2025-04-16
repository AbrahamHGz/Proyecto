import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";
import Usuario from "../schemas/usuarios.js"
import mongoose from "mongoose";

class usuarioModelo {
    async create(usuario){
        return await Usuario.create(usuario);
    }

    async update(id, usuario){
        return await Usuario.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, usuario,{new: true});
    }

    async updateForEmail(email, usuario){
        return await Usuario.findOneAndUpdate({email}, usuario,{new: true});
    }
    
    async delete(id){
        return await Usuario.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

    async getAll(){
        return await Usuario.find();
    }

    async getAllArtistas(){
        return await Usuario.find({TipoUsu: 'artista'})
    }

    async getAllAdmins(){
        return await Usuario.find({TipoUsu: 'admin'})
    }

    async getAllId(ids){
        return await Usuario.find({_id: { $in: ids.map(id => new mongoose.Types.ObjectId(id))}})
    }

    async getOne(id){
       return await Usuario.findById({_id: new mongoose.Types.ObjectId(id)})
    }

    async getOneEmail(email){
        return await Usuario.findOne({email})
    }

    async getOneEmailorName(email, nombre){
        return await Usuario.findOne({ $or: [{email}, {nombre}]})
    }

    async getOneName(nombre){
        return await Usuario.findOne({nombre})
    }


}

export default new usuarioModelo;