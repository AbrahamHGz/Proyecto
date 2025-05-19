import categoriaModel from "../models/categoria.js";
import usuarioModel from "../models/usuarios.js";
import logger from "../helpers/logger.js";

class categoriaController {
    constructor(){

    }

    async create(req, res){
        try{
            const {CATnombre, email} = req.body;
            const existeUsuario = await usuarioModel.getOneEmail(email);
            const exiseNombre = await categoriaModel.getOneNombre(CATnombre);

            if(!existeUsuario)
                return res.status(400).json({error: "El usuario no existe"})

            if(existeUsuario.TipoUsu == "artista" )
                return res.status(400).json({error: "Solo los administradores pueden crear categorias"})
            
            if(exiseNombre)
                return res.status(400).json({error: "La categoria ya existe"})
            


            const data = await categoriaModel.create({CATnombre, CATusuario: existeUsuario._id});
            res.status(201).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const {id} = req.params;
            const data = await categoriaModel.update(id,req.body);
            res.status(200).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e);
        }
    }
    
   async delete(req, res){
           try{
               const {id} = req.params;
               const data = await categoriaModel.delete(id);
               res.status(206).json(data);
           }catch(e){
                logger.error(e);
               res.status(500).send(e);
           }
       }
   
       async getAll(req, res){
           try{
               const data = await categoriaModel.getAll();
               res.status(201).json(data);
           }catch(e){
                logger.error(e);
               res.status(500).send(e);
           }
       }
   
       async getOne(req, res){
           try{
               const {id} = req.params
               const data = await categoriaModel.getOne(id);

               res.status(201).json(data);
           }catch(e){
                logger.error(e);
               res.status(500).send(e);
           }
       }


       async getOneNombre(req, res){
        try{
            const {CATnombre} = req.params
            const data = await categoriaModel.getOneNombre(CATnombre);
            const {email} = await usuarioModel.getOne(data.CATusuario);

            res.status(201).json({data, email})

        }catch(e){
            logger.error(e);
            res.status(500).send(e);

        }
       }
}

export default new categoriaController();