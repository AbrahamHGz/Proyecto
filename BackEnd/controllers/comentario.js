import comentarioModel from "../models/comentario.js";
import usuarioModel from "../models/usuarios.js";
import publicacionModel from "../models/publicacion.js";

class comentarioController {
    constructor(){

    }

    async create(req, res){
        try{
            const {email, COMdescripcion, publicacion} = req.body;

             const existeUsuario = await usuarioModel.getOneEmail(email)
             if(!existeUsuario)
                return res.status(400).json({error: "El usuario no existe"})

             const existePublicacion = await publicacionModel.getOnebyNombre(publicacion);
             if(!existePublicacion)
                return res.status(400).json({error: "La publicacion no existe"})

            const data = await comentarioModel.create({COMdescripcion, COMpublicacion: existePublicacion._id, COMusuario: existeUsuario._id});
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