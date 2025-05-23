import express from 'express';
import reporteController from '../controllers/reporte.js';
const route = express.Router();
import cors from 'cors';

route.use(cors({
    origin: `http://localhost:${process.env.LOCALHOST}`, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

route.post('/', reporteController.create);
route.get('/:id', reporteController.getOne);
route.get('/', reporteController.getAll);
route.put('/:id', reporteController.update);
route.delete('/:id' ,reporteController.delete);

export default route;