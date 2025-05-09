import express from 'express';
import publicacionController from '../controllers/publicacion.js';
const route = express.Router();
import cors from 'cors';

route.use(cors({
    origin: 'http://localhost:5173', // Permitir solo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

route.post('/', publicacionController.create);
route.get('/:id', publicacionController.getOne);
route.get('/', publicacionController.getAll);
route.get('/pub/:id',publicacionController.getAllIdUsu);
route.get('/Nombre/:PUBnombre', publicacionController.getOneByNombre);
route.put('/:id', publicacionController.update);
route.put('/est/:id', publicacionController.updateEstatus);
route.delete('/:id' ,publicacionController.delete);

export default route;