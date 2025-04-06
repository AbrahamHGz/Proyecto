import express from 'express';
import favoritoController from '../controllers/favorito.js';
const route = express.Router();
import cors from 'cors';

route.use(cors({
    origin: 'http://localhost:5176', // Permitir solo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

route.post('/', favoritoController.create);
route.get('/:id', favoritoController.getOne);
route.get('/', favoritoController.getAll);
route.put('/:id', favoritoController.update);
route.delete('/:id' ,favoritoController.delete);

export default route;