import publicacionModel from "../models/publicacion.js";
import categoriaModel from "../models/categoria.js";
import usuarioModel from "../models/usuarios.js";

class publicacionController {
    constructor(){

    }

    async create(req, res){
        try{
            const {PUBnombre, CATnombre,  email, PUBdescripcion, PUBimagen} = req.body
            
            const existeUsuario = await usuarioModel.getOneEmail(email)
            const categoriasNombre = Array.isArray(CATnombre) ? CATnombre : [CATnombre];

            const existeCategoria = await categoriaModel.getAllNombre(categoriasNombre)

            if(!existeUsuario)
                return res.status(400).json({error: "El usuario no existe"})


            if(existeCategoria.length === 0)
                return res.status(400).json({error: "La categoria no existe"})

            const categoriasIds = existeCategoria.map(cat => cat._id)
            
            const data = await publicacionModel.create({PUBnombre, PUBcategorias: categoriasIds, PUBusuario: existeUsuario._id, PUBdescripcion, PUBimagen});
            
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const {id, PUBnombre, CATnombre, PUBdescripcion, PUBimagen} = req.body;
            const categoriasNombre = Array.isArray(CATnombre) ? CATnombre : [CATnombre];
            const existeCategoria = await categoriaModel.getAllNombre(categoriasNombre)

            if(!id)
                return res.status(400).json({error: "Falta el ID de la publicacion"})

            if(existeCategoria.length === 0)
                return res.status(400).json({error: "La categoria no existe"})

            const categoriasIds = existeCategoria.map(cat => cat._id)

            const data = await publicacionModel.update(id, {PUBnombre, PUBcategorias: categoriasIds, PUBdescripcion, PUBimagen});
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }


    async updateEstatus(req, res){
        try{
            const {id} = req.body;
            const data = await publicacionModel.update(id, req.body);
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

    async getAllIdUsu(req,res){
        try{
            const {id} = req.params
            const data = await publicacionModel.getAllByIdUsu(id);
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

    async getOneByNombre(req,res){
        try{
            const {PUBnombre} = req.params
            const data = await publicacionModel.getOnebyNombre(PUBnombre)
            if(!data)
                return res.status(400).json({error: "La publicacion no existe"})
            res.status(201).json(data)

        }catch(e){
            res.status(500).send(e)
        }
    }
}

export default new publicacionController();