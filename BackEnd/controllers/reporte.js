import reporteModel from "../models/reporte.js";
import publicacionModel from "../models/publicacion.js";
import usuarioModel from "../models/usuarios.js";
import comentarioModel from "../models/comentario.js"
import logger from "../helpers/logger.js";

class reporteController {
    constructor(){

    }

    async create(req, res){
        try{

            const {REPpublicacion, REPcomentario, REPtipo} = req.body
            const existePublicacion = await publicacionModel.getOne(REPpublicacion);
            const existeComentario = await comentarioModel.getOne(REPcomentario);
            
            if(REPtipo == 'pub' && !existePublicacion){
                return res.status(400).json({error: "La publicacion no existe"})
            }else if(REPtipo == 'com' && !existeComentario){
                return res.status(400).json({error: "El comentario no existe"})
            }
            
            const data = await reporteModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const {id} = req.params;
            const data = await reporteModel.update(id, req.body);
            res.status(200).json(data)
        }catch(e){
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async delete(req, res){
        try{
            const {id} = req.params;
            const data = await reporteModel.delete(id);
            res.status(206).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async getAll(req, res){
        try{
            const data = await reporteModel.getAll();
            res.status(200).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async getOne(req, res){
        try{
            const {id} = req.params
            const data = await reporteModel.getOne(id);
            res.status(200).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e);
        }
    }    
    
}

export default new reporteController();