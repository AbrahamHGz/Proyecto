import express from 'express';
import categoriaController from '../controllers/categoria.js';
const route = express.Router();
import cors from 'cors';

// Permitimos ahora también el método PUT (y opcionalmente PATCH si se desea en el futuro)
route.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rutas
route.post('/', categoriaController.create);
route.get('/:id', categoriaController.getOne);
route.get('/', categoriaController.getAll);
route.get('/Nombre/:CATnombre', categoriaController.getOneNombre);
route.put('/:id', categoriaController.update);     // Aquí acepta PUT
// Si quieres soportar PATCH en un futuro, descomenta la siguiente línea:"
//route.patch('/:id', categoriaController.update);
route.delete('/:id', categoriaController.delete);

export default route;