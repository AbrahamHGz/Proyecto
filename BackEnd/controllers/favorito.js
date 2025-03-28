import favoritoModel from "../models/favorito.js";

class favoritoController {
    constructor(){

    }

    async create(req, res){
        try{
            const data = await favoritoModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const {id} = req.params;
            const data = await favoritoModel.update(id,req.body);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }
    
   async delete(req, res){
           try{
               const {id} = req.params;
               const data = await favoritoModel.delete(id);
               res.status(206).json(data);
           }catch(e){
               res.status(500).send(e);
           }
       }
   
       async getAll(req, res){
           try{
               const data = await favoritoModel.getAll();
               res.status(201).json(data);
           }catch(e){
               res.status(500).send(e);
           }
       }
   
       async getOne(req, res){
           try{
               const {id} = req.params
               const data = await favoritoModel.getOne(id);
               res.status(201).json(data);
           }catch(e){
               res.status(500).send(e);
           }
       }
}

export default new favoritoController();