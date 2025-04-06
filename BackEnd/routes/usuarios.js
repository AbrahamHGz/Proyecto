import express from 'express';
import usuarioControler from '../controllers/usuarios.js'
const route = express.Router();
import cors from 'cors';
import {verificarToken} from '../helpers/authentication.js'

route.use(cors({
    origin: 'http://localhost:5176', // Permitir solo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

route.post('/', usuarioControler.create);
route.post('/login', usuarioControler.postLogin);
route.get('/:id', usuarioControler.getOne);
route.get('/email/:email', usuarioControler.getOneEmail);
route.get('/', usuarioControler.getAll);
route.put('/:id', usuarioControler.update);
route.put('/email/:email',verificarToken, usuarioControler.updateForEmail);
route.delete('/:id' ,verificarToken,usuarioControler.delete);

export default route;