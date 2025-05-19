import seguirModelo from "../models/seguir.js";
import usuarioModel from "../models/usuarios.js";
import logger from "../helpers/logger.js";

class seguirController {
    constructor(){

    }

    async create(req, res){
        try {
            const {SEGusuario, SEGsiguiendoA} = req.body
            const existeUsuario = await usuarioModel.getOne(SEGsiguiendoA)
            if(!existeUsuario)
                return res.status(400).json({error: "El usuario no existe"});

            const existeSeguir = await seguirModelo.getOneSiguiendo(SEGusuario, SEGsiguiendoA)
            if(existeSeguir)
                return res.status(400).json({error: "Ya estas siguiendo a ese usuario"});

            const data = await seguirModelo.create(req.body)
            res.status(201).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e)
        }
    }

    async delete(req, res){
        try{
            const {id} = req.params;
            const data = await seguirModelo.delete(id);
            res.status(206).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async getOneSiguiendo(req, res){
        try{
            const {SEGusuario, SEGsiguiendoA} = req.params
            const data = await seguirModelo.getOneSiguiendo(SEGusuario, SEGsiguiendoA);
            res.status(206).json(data);
        }catch(e){
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async getContadores(req,res){
        try{
            const {id} = req.params

            const siguiendo = await seguirModelo.contarSiguiendo(id);
            const seguidores = await seguirModelo.contarSeguidores(id);

            res.status(200).json({
                siguiendo,
                seguidores
            })
        }catch(e){
            logger.error(e);
            res.status(500).send(e)
        }
    }
}

export default new seguirController()