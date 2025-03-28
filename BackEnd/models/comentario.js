import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";
import Comentario from "../schemas/comentario.js";
import mongoose from "mongoose";


class comentarioModelo {
    async create(comentario){
        return await Comentario.create(comentario);
    }

    async update(id, comentario){
        return await Comentario.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)},comentario,{new: true});
    }
    
    async delete(id){
        return await Comentario.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

    async getAll(){
        return await Comentario.find();
    }

    async getOne(id){
       return await Comentario.findById({_id: new mongoose.Types.ObjectId(id)})
    }
}

export default new comentarioModelo;