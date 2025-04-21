import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js";
import Reporte from "../schemas/reporte.js";
import mongoose from "mongoose";

class reporteModel{
    async create(reporte){
        return await Reporte.create(reporte);
    }

    async update(id, reporte){
        return await Reporte.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, reporte, {new: true})
    }

    async delete(id){
        return await Reporte.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)})
    }

    async getAll(){
        return await Reporte.find({REPrevisado: false})
        .populate({
            path: 'REPusuario',
            select: 'nombre imagen email'
        })
        .populate({
            path: 'REPpublicacion',
            select: 'PUBnombre PUBusuario PUBestatus',
            populate: {
                path: 'PUBusuario',
                select: 'email'
            }
        })
        .populate({
            path: 'REPcomentario',
            select: 'COMdescripcion COMusuario COMestatus',
            populate: {
                path: 'COMusuario', // ← aquí parece que intentabas 'PUBusuario', pero debería ser 'COMusuario'
                select: 'email'
            }
        });
    }

    async getOne(id){
        return await Reporte.findById({_id: new mongoose.Types.ObjectId(id)})
    }
}

export default new reporteModel;