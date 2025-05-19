import express from 'express';
import categoriaController from '../controllers/categoria.js';
const route = express.Router();
import cors from 'cors';

route.use(cors({
    origin: `http://localhost:${process.env.LOCALHOST}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rutas
route.post('/', categoriaController.create);
route.get('/:id', categoriaController.getOne);
route.get('/', categoriaController.getAll);
route.get('/Nombre/:CATnombre', categoriaController.getOneNombre);
route.put('/:id', categoriaController.update);
route.delete('/:id', categoriaController.delete);

export default route;