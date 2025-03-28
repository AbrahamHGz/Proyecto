import publicacionModel from "../models/publicacion.js";

class publicacionController {
    constructor(){

    }

    async create(req, res){
        try{
            const data = await publicacionModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const {id} = req.params;
            const data = await publicacionModel.update(id,req.body);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async delete(req, res){
        try{
            const {id} = req.params;
            const data = await publicacionModel.delete(id);
            res.status(206).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getAll(req, res){
        try{
            const data = await publicacionModel.getAll();
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getOne(req, res){
        try{
            const {id} = req.params
            const data = await publicacionModel.getOne(id);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }
}

export default new publicacionController();