import express from "express";
import publicacionController from "../controllers/publicacion.js";
const route = express.Router();
import cors from "cors";
import { verificarToken } from "../helpers/authentication.js";

route.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

route.post("/", verificarToken, publicacionController.create);
route.put("/:id", verificarToken, publicacionController.update);
route.put("/est/:id", verificarToken, publicacionController.updateEstatus);
route.delete("/:id", verificarToken, publicacionController.delete);
route.get("/withLikesCount", publicacionController.getAllWithLikesCount);
route.get("/:id", publicacionController.getOne);
route.get("/", publicacionController.getAll);
route.get("/pub/:id", publicacionController.getAllIdUsu);
route.get("/Nombre/:PUBnombre", publicacionController.getOneByNombre);

export default route;
