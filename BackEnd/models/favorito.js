import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";
import Favorito from "../schemas/favorito.js"
import mongoose from "mongoose";

class favoritoModelo {
    async create(favorito){
        return await Favorito.create(favorito);
    }

    async update(id, favorito){
        return await Favorito.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, favorito,{new: true})
    }

    async delete(id){
        return await Favorito.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

    async getAll(){
        return await Favorito.find();
    }

    async getOne(id){
        return await Favorito.findById({_id: new mongoose.Types.ObjectId(id)})
    }
}

export default new favoritoModelo;