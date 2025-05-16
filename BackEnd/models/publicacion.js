import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js"; 
import Publicacion from "../schemas/publicacion.js"; 
import mongoose from "mongoose";

class publicacionModelo {
    constructor() {
<<<<<<< HEAD
    
=======
   
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
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
<<<<<<< HEAD
                select: 'nombre imagen Estatus', 
            })
            .populate('PUBcategorias', 'CATnombre')
            .then(publicaciones => {
                return publicaciones.filter(pub => pub.PUBusuario && pub.PUBusuario.Estatus);
=======
                select: 'nombre imagen',
            })
            .populate('PUBcategorias', 'CATnombre')
            .then(publicaciones => {
                return publicaciones.filter(pub => pub.PUBusuario !== null);
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
            });
    }

    async getOne(id) {
        return await Publicacion.findById({_id: new mongoose.Types.ObjectId(id)})
<<<<<<< HEAD
            .populate('PUBusuario', 'nombre imagen email Estatus') 
=======
            .populate('PUBusuario', 'nombre imagen email') 
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
            .populate('PUBcategorias', 'CATnombre');
    }

    async getOnebyNombre(PUBnombre) {
        return await Publicacion.findOne({PUBnombre})
<<<<<<< HEAD
            .populate('PUBusuario', 'nombre Estatus') 
=======
            .populate('PUBusuario', 'nombre')
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
            .populate('PUBcategorias', 'CATnombre');
    }

    async getOneByIdUsu(PUBusuario) {
<<<<<<< HEAD
        return await Publicacion.findOne({PUBusuario})
            .populate('PUBusuario', 'nombre imagen Estatus'); }

    async getAllByIdUsu(PUBusuario) {
      return await Publicacion.find({PUBusuario, PUBestatus: true})
            .populate('PUBusuario', 'nombre imagen Estatus');  }
=======
        return await Publicacion.findOne({PUBusuario});
    }

    async getAllByIdUsu(PUBusuario) {
        return await Publicacion.find({PUBusuario, PUBestatus: true});
    }
>>>>>>> c942114410c855e0e02cbf53a00c516ef6ffec6a
}

export default new publicacionModelo();