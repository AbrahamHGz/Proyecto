import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";
import Like from "../schemas/like.js";
import mongoose from "mongoose";

class likeModelo {
    async create(like) {
        return await Like.create(like);
    }

    async delete(id) {
        return await Like.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
    }

    async getOne(id) {
        return await Like.findById({ _id: new mongoose.Types.ObjectId(id) })
            .populate('LIKusuario', 'email')
            .populate('LIKpublicacion', 'PUBnombre')
    }

    async getOneLike(LIKusuario,  LIKpublicacion) {
        return await Like.findOne({ LIKusuario,  LIKpublicacion })
            .populate('LIKusuario', 'email')
            .populate('LIKpublicacion', 'PUBnombre')
    }

    async countLikesbyPublicacion(LIKpublicacion){
        return await Like.countDocuments({LIKpublicacion})
    }
}

export default new likeModelo