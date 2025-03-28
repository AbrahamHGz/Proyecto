import comentarioModel from "../models/comentario.js";

class comentarioController {
    constructor(){

    }

    async create(req, res){
        try{
            const data = await comentarioModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const {id} = req.params;
            const data = await comentarioModel.update(id,req.body);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async delete(req, res){
        try{
            const {id} = req.params;
            const data = await comentarioModel.delete(id);
            res.status(206).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getAll(req, res){
        try{
            const data = await comentarioModel.getAll();
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getOne(req, res){
        try{
            const {id} = req.params
            const data = await comentarioModel.getOne(id);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }
}

export default new comentarioController();