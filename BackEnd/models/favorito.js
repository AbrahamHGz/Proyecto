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
            .populate({
                path:'FAVpublicacion', 
                select:'PUBnombre PUBimagen PUBusuario',
                match: {PUBestatus: true},
                populate: {
                    path: 'PUBusuario',
                    select: 'nombre'
                }
            })
            .then(favorito => {
                return favorito.filter(fav => fav.FAVpublicacion !== null);
            })
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