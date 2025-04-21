import { generarToken } from "../helpers/authentication.js";
import usuarioModel from "../models/usuarios.js";
import jsonwebtoken from 'jsonwebtoken';

class usuarioControler {
    constructor(){
        
    }

    async create(req, res){
        try{
            const {nombre , email, password, sexo, TipoUsu, FechaNac, imagen} = req.body
            const existeUsuario = await usuarioModel.getOneEmail(email)

            if(existeUsuario)
                return res.status(400).json({error: "El usuario ya esta registrado"})

            if(nombre == "")
                return res.status(400).json({error: "El nombre es obligatorio"})

            // const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            // if(password)

            const data = await usuarioModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{

            const {nombre, password} = req.body

            const {id} = req.params;
            const data = await usuarioModel.update(id,req.body);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }


    async updateForEmail(req, res){
        try{

            const {nombre, email, password} = req.body


            const data = await usuarioModel.updateForEmail(email,req.body);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async delete(req, res){
        try{
            const {id} = req.params;
            const data = await usuarioModel.delete(id);
            res.status(206).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getAll(req, res){
        try{
            const data = await usuarioModel.getAll();
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getAllArtistas(req, res){
        try{
            const data = await usuarioModel.getAllArtistas();
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getAllAdmins(req, res){
        try{
            const data = await usuarioModel.getAllAdmins();
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getOne(req, res){
        try{
            const {id} = req.params
            const data = await usuarioModel.getOne(id);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

    async getOneEmail(req, res){
        try{
            const {email} = req.params
            const data = await usuarioModel.getOneEmail(email);
            res.status(200).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }


    async postLogin(req, res){
        try{
            const {email, password} = req.body
            
            const existeUsuario = await usuarioModel.getOneEmail(email)

            if(!existeUsuario)
                return res.status(400).json({error: "Las credenciales son incorrectas"})
            if(existeUsuario.password != password)
                return res.status(400).json({error: "La contraseña es incorrecta"})

            if(existeUsuario.Estatus == false)
                return res.status(400).json({error: "El usuario ha sido eliminado"});


            const token = generarToken(email, existeUsuario.TipoUsu);
            res.status(200).json({msg: 'Usuario autenticado', token, user: {email: existeUsuario.email, tipo: existeUsuario.TipoUsu, id: existeUsuario._id}});
        }catch(e){
            res.status(500).send(e);
        }
    }
}

export default new usuarioControler();