import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";
import Seguir from "../schemas/seguir.js";
import mongoose from "mongoose";

class seguirModelo {
    async create(seguir){
        return await Seguir.create(seguir);
    }

    async delete(id){
        return await Seguir.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)})
    }

    async getOneSiguiendo(SEGusuario, SEGsiguiendoA){
        return await Seguir.findOne({SEGusuario, SEGsiguiendoA})
    }

    async contarSiguiendo(idUsuario){
        return await Seguir.countDocuments({SEGusuario: idUsuario});
    }

    async contarSeguidores(idUsuario){
        return await Seguir.countDocuments({SEGsiguiendoA: idUsuario});
    }
}

export default new seguirModelo