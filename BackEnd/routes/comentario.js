import express from 'express';
import comentarioController from '../controllers/comentario.js'
const route = express.Router();
import cors from 'cors';
import {verificarToken} from '../helpers/authentication.js'

console.log(comentarioController)

route.use(cors({
    origin: 'http://localhost:5173', // Permitir solo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

route.post('/', verificarToken,comentarioController.create);
route.get('/:id', comentarioController.getOne);
route.get('/', comentarioController.getAll);
route.get('/com/:id', comentarioController.getAllByPub)
route.put('/:id',verificarToken ,comentarioController.update);
route.delete('/:id' ,verificarToken,comentarioController.delete);

export default route;