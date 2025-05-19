import favoritoModel from "../models/favorito.js";
import usuarioModel from "../models/usuarios.js";
import publicacionModel from "../models/publicacion.js";
import logger from "../helpers/logger.js";

class favoritoController {
    constructor() {

    }

    async create(req, res) {
        try {
            const { email, publicacion } = req.body
            const existeUsuario = await usuarioModel.getOneEmail(email)
            if (!existeUsuario)
                return res.status(400).json({ error: "El usuario no existe" })
            const existePublicacion = await publicacionModel.getOne(publicacion);

            if (!existePublicacion)
                return res.status(400).json({ error: "La publicacion no existe" })

            const data = await favoritoModel.create({ FAVusuario: existeUsuario._id, FAVpublicacion: existePublicacion._id });
            res.status(201).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = await favoritoModel.update(id, req.body);
            res.status(200).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const data = await favoritoModel.delete(id);
            res.status(206).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }

    
    async getAll(req, res) {
        try {
            const data = await favoritoModel.getAll();
            res.status(201).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async getAllByUsu(req, res) {
        try {
            const { FAVusuario } = req.params
            const data = await favoritoModel.getAllByUsu(FAVusuario);
            res.status(201).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }
    
    async getOne(req, res) {
        try {
            const { id } = req.params
            const data = await favoritoModel.getOne(id);
            res.status(206).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async getOneFav(req, res) {
        try {
            const { FAVusuario, FAVpublicacion } = req.params
            const data = await favoritoModel.getOneFav(FAVusuario,FAVpublicacion);
            res.status(206).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }
}

export default new favoritoController();