import { generarToken } from "../helpers/authentication.js";
import usuarioModel from "../models/usuarios.js";
import jsonwebtoken from 'jsonwebtoken';
import logger from "../helpers/logger.js";

class usuarioControler {
    constructor() {

    }
    async create(req, res) {
        try {
            const { nombre, email, password, sexo, TipoUsu, FechaNac } = req.body;
            const existeUsuario = await usuarioModel.getOneEmail(email);

            if (existeUsuario)
                return res.status(400).json({ error: "El usuario ya está registrado" });

            if (!nombre || nombre.trim() === "")
                return res.status(400).json({ error: "El nombre es obligatorio" });

            const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passRegex.test(password))
                return res.status(400).json({ error: "La contraseña no es válida" });

            if (sexo !== 'Hombre' && sexo !== 'Mujer')
                return res.status(400).json({ error: "El sexo no es válido" });

            if (TipoUsu !== "artista" && TipoUsu !== "admin" && TipoUsu !== "superadmin")
                return res.status(400).json({ error: "El tipo de usuario no es válido" });


            const fechaNacimiento = new Date(FechaNac);
            const hoy = new Date();
            const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const mes = hoy.getMonth() - fechaNacimiento.getMonth();
            const dia = hoy.getDate() - fechaNacimiento.getDate();

            const edadReal = (mes > 0 || (mes === 0 && dia >= 0)) ? edad : edad - 1;

            if (edadReal < 18)
                return res.status(400).json({ error: "Debes tener al menos 18 años" });

            const data = await usuarioModel.create(req.body);
            res.status(201).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async update(req, res) {
        try {

            const { nombre, email, password, sexo } = req.body

            const existeUsuario = await usuarioModel.getOneEmail(email);

            if (existeUsuario)
                return res.status(400).json({ error: "El usuario ya está registrado" });

            if (!nombre || nombre.trim() === "")
                return res.status(400).json({ error: "El nombre es obligatorio" });

            const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passRegex.test(password))
                return res.status(400).json({ error: "La contraseña no es válida" });

            if (sexo !== 'Hombre' && sexo !== 'Mujer')
                return res.status(400).json({ error: "El sexo no es válido" });

            const { id } = req.params;
            const data = await usuarioModel.update(id, req.body);
            res.status(200).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }


    async updateForEmail(req, res) {
        try {
            const { email } = req.params
            const { nombre, password, sexo, descripcion, caso, FechaNac, Estatus } = req.body

            if(req.user.email !== email && req.user.TipoUsu !== 'admin' && req.user.TipoUsu !== 'superadmin') {
                return res.status(403).json({error: "No tienes permisos para modificar este usuario"});
            }
            
            const existeUsuario = await usuarioModel.getOneEmail(email);
            if (!existeUsuario)
                return res.status(400).json({ error: "El usuario no existe" });

            if (typeof Estatus === 'boolean' && Object.keys(req.body).length === 1) { 
                const data = await usuarioModel.updateForEmail(email, { Estatus });
                return res.status(200).json(data);
            }

            switch (caso) {
                case "Perfil":
                    if (!nombre || nombre.trim() === "")
                        return res.status(400).json({ error: "El nombre es obligatorio" });

                    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
                    if (!passRegex.test(password))
                        return res.status(400).json({ error: "La contraseña no es válida" });

                    if (sexo !== 'Hombre' && sexo !== 'Mujer')
                        return res.status(400).json({ error: "El sexo no es válido" });

                    const fechaNacimiento = new Date(FechaNac);
                    const hoy = new Date();
                    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
                    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
                    const dia = hoy.getDate() - fechaNacimiento.getDate();

                    const edadReal = (mes > 0 || (mes === 0 && dia >= 0)) ? edad : edad - 1;

                    if (edadReal < 18)
                        return res.status(400).json({ error: "Debes tener al menos 18 años" });

                    break;
                case "Acerca":
                    if (!descripcion || descripcion.trim() === "")
                        return res.status(400).json({ error: "La descripcion es obligatoria" });

                    break;
                default: // Si no hay caso definido o es un caso desconocido
                    return res.status(400).json({ error: "Caso de actualización no válido o no especificado." });
            }

            const data = await usuarioModel.updateForEmail(email, req.body);
            res.status(200).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const data = await usuarioModel.delete(id);
            res.status(206).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async getAll(req, res) {
        try {
            const data = await usuarioModel.getAll();
            res.status(200).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async getAllArtistas(req, res) {
        try {
            const data = await usuarioModel.getAllArtistas();
            res.status(200).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async getAllAdmins(req, res) {
        try {
            const data = await usuarioModel.getAllAdmins();
            res.status(200).json(data);
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            const data = await usuarioModel.getOne(id);
            res.status(200).json(data);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async getOneEmail(req, res) {
        try {
            const { email } = req.params
            const data = await usuarioModel.getOneEmail(email);
    
            if (!data) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
    
            res.status(200).json({ password: data.password });
        } catch (e) {
            res.status(500).send(e);
        }
    }
    
 async getAllArtistasForAdmin(req, res) {
    try {
        const data = await usuarioModel.getAllArtistasAdmin();
        res.status(200).json(data);
    } catch (e) {
        logger.error(e);
        res.status(500).send(e);
    }
}

    async postLogin(req, res) {
        try {
            const { email, password } = req.body

            const existeUsuario = await usuarioModel.getOneEmail(email)

            if (!existeUsuario)
                return res.status(400).json({ error: "Las credenciales son incorrectas" })
            if (existeUsuario.password != password)
                return res.status(400).json({ error: "La contraseña es incorrecta" })

            if (existeUsuario.Estatus == false)
                return res.status(400).json({ error: "Cuenta restringida indefinidamente" });


            const token = generarToken(email, existeUsuario.TipoUsu);
            res.status(200).json({ msg: 'Usuario autenticado', token, user: { email: existeUsuario.email, tipo: existeUsuario.TipoUsu, id: existeUsuario._id } });
        } catch (e) {
            logger.error(e);
            res.status(500).send(e);
        }
    }
}

export default new usuarioControler();