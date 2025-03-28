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

    async getOne(id){
        return await Categoria.findById({_id: new mongoose.Types.ObjectId(id)})
    }
}

export default new categoriaModelo;