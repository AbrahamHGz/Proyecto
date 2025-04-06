import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";
import Categoria from "../schemas/categoria.js"
import mongoose from "mongoose";

class categoriaModelo {
    async create(categoria){
        return await Categoria.create(categoria);
    }

    async update(id, categoria){
        return await Categoria.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, categoria,{new: true})
    }

    async delete(id){
        return await Categoria.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

    async getAll(){
        return await Categoria.find();
    }

    async getAllNombre( categoriasnombre){
        return await Categoria.find({CATnombre: {$in: categoriasnombre}})
    }

    async getAllId(ids){
        return await Categoria.find({_id: { $in: ids.map(id => new mongoose.Types.ObjectId(id))}})
    }
    
    async getOne(id){
        return await Categoria.findById({_id: new mongoose.Types.ObjectId(id)})
    }

    async getOneNombre(CATnombre){
        return await Categoria.findOne({CATnombre})
    }
}

export default new categoriaModelo;