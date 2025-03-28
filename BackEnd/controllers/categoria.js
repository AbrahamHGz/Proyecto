import categoriaModel from "../models/categoria.js";

class categoriaController {
    constructor(){

    }

    async create(req, res){
        try{
            const data = await categoriaModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const {id} = req.params;
            const data = await categoriaModel.update(id,req.body);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }
    
   async delete(req, res){
           try{
               const {id} = req.params;
               const data = await categoriaModel.delete(id);
               res.status(206).json(data);
           }catch(e){
               res.status(500).send(e);
           }
       }
   
       async getAll(req, res){
           try{
               const data = await categoriaModel.getAll();
               res.status(201).json(data);
           }catch(e){
               res.status(500).send(e);
           }
       }
   
       async getOne(req, res){
           try{
               const {id} = req.params
               const data = await categoriaModel.getOne(id);
               res.status(201).json(data);
           }catch(e){
               res.status(500).send(e);
           }
       }
}

export default new categoriaController();