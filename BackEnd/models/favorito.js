import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";
import Favorito from "../schemas/favorito.js"
import mongoose from "mongoose";

class favoritoModelo {
    async create(favorito) {
        return await Favorito.create(favorito);
    }

    async update(id, favorito) {
        return await Favorito.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, favorito, { new: true })
    }

    async delete(id) {
        return await Favorito.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    }

    async getAll() {
        return await Favorito.find()
            .populate('FAVusuario', 'email')
            .populate('FAVpublicacion', 'PUBnombre')
    }


    async getAllByUsu(FAVusuario) {
        return await Favorito.find({FAVusuario})
            .populate('FAVusuario', 'nombre')
            .populate('FAVpublicacion', 'PUBnombre PUBimagen')
    }

    async getOne(id) {
        return await Favorito.findById({ _id: new mongoose.Types.ObjectId(id) })
            .populate('FAVusuario', 'email')
            .populate('FAVpublicacion', 'PUBnombre')
    }

    async getOneFav(FAVusuario, FAVpublicacion) {
        return await Favorito.findOne({ FAVusuario, FAVpublicacion })
            .populate('FAVusuario', 'email')
            .populate('FAVpublicacion', 'PUBnombre')
    }
}

export default new favoritoModelo;