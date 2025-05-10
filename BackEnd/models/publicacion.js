import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js"; 
import Publicacion from "../schemas/publicacion.js"; 
import mongoose from "mongoose";

class publicacionModelo {
    constructor() {
   
    }

    async create(publicacion) {
        return await Publicacion.create(publicacion);
    }

    async update(id, publicacion) {
        return await Publicacion.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, publicacion, {new: true});
    }

    async delete(id) {
        return await Publicacion.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

    async getAll() {
        return await Publicacion.find({PUBestatus: true})
            .populate({
                path: 'PUBusuario',
                select: 'nombre imagen',
            })
            .populate('PUBcategorias', 'CATnombre')
            .then(publicaciones => {
                return publicaciones.filter(pub => pub.PUBusuario !== null);
            });
    }

    async getOne(id) {
        return await Publicacion.findById({_id: new mongoose.Types.ObjectId(id)})
            .populate('PUBusuario', 'nombre imagen email') 
            .populate('PUBcategorias', 'CATnombre');
    }

    async getOnebyNombre(PUBnombre) {
        return await Publicacion.findOne({PUBnombre})
            .populate('PUBusuario', 'nombre')
            .populate('PUBcategorias', 'CATnombre');
    }

    async getOneByIdUsu(PUBusuario) {
        return await Publicacion.findOne({PUBusuario});
    }

    async getAllByIdUsu(PUBusuario) {
        return await Publicacion.find({PUBusuario, PUBestatus: true});
    }
}

export default new publicacionModelo();