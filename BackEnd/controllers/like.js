import likeModelo from "../models/like.js";
import usuarioModel from "../models/usuarios.js";
import publicacionModel from "../models/publicacion.js";
import logger from "../helpers/logger.js";
class likeController {
    constructor(){

    }

    async create(req,res){
        try{
            const {LIKusuario,  LIKpublicacion} = req.body
            const existeUsuario = await usuarioModel.getOne(LIKusuario);
            if(!existeUsuario)
                return res.status(400).json({error: "El usuario no existe"})
            
            const existePublicacion = await publicacionModel.getOne(LIKpublicacion);
            if(!existePublicacion)
                return res.status(400).json({error: "La publicacion no existe"});

            const data = await likeModelo.create(req.body)
            res.status(201).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e)
        }
    }

    async delete(req, res){
        try{
            const {id} = req.params
            const data = await likeModelo.delete(id);
            res.status(206).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e)
        }
    }

    async getOneLike(req, res){
        try{
            const {LIKusuario,  LIKpublicacion} = req.params
            const data = await likeModelo.getOneLike(LIKusuario,  LIKpublicacion);
            res.status(206).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e)
        }
    }

    async countLikes(req, res){
        try{
            const {LIKpublicacion} = req.params;
            const count = await likeModelo.countLikesbyPublicacion(LIKpublicacion);
            res.status(200).json({cantidadLikes: count});
        }catch(e){
            logger.error(e);
            res.status(500).send(e);
        }
    }
}

export default new likeController();