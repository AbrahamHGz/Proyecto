import express from 'express';
import comentarioController from '../controllers/comentario.js'
const route = express.Router();
import cors from 'cors';

console.log(comentarioController)

route.use(cors({
    origin: 'http://localhost:5173', // Permitir solo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

route.post('/', comentarioController.create);
route.get('/:id', comentarioController.getOne);
route.get('/', comentarioController.getAll);
route.put('/:id', comentarioController.update);
route.delete('/:id' ,comentarioController.delete);

export default route;