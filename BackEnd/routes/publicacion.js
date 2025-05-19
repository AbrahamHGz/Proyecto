import express from "express";
import cors from "cors";
import { verificarToken } from "../helpers/authentication.js";
import publicacionController from "../controllers/publicacion.js";

const route = express.Router();

route.use(
  cors({
    origin: `http://localhost:${process.env.LOCALHOST}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

route.post('/',verificarToken ,publicacionController.create);
route.get('/:id', publicacionController.getOne);
route.get('/', publicacionController.getAll);
route.get('/pub/:id',publicacionController.getAllIdUsu);
route.get('/Nombre/:PUBnombre', publicacionController.getOneByNombre);
route.put('/:id',verificarToken ,publicacionController.update);
route.put('/est/:id',verificarToken ,publicacionController.updateEstatus);
route.delete('/:id' ,verificarToken ,publicacionController.delete);
export default route;
