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
        return await Reporte.find();
    }

    async getOne(id){
        return await Reporte.findById({_id: new mongoose.Types.ObjectId(id)})
    }
}

export default new reporteModel;