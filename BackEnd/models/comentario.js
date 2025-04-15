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
        return await Comentario.find()
        .populate('COMusuario', 'nombre')
        .populate('COMpublicacion', 'PUBnombre')
    }

    async getAllByPub(COMpublicacion){
        return await Comentario.find({COMpublicacion})
        .populate('COMusuario', 'nombre')
    }

    async getOne(id){
       return await Comentario.findById({_id: new mongoose.Types.ObjectId(id)})
       .populate('COMusuario', 'nombre')
       .populate('COMpublicacion', 'PUBnombre')
    }
}

export default new comentarioModelo;