import express from 'express';
import seguirContoller from '../controllers/seguir.js';
const route = express.Router();
import cors from 'cors';

route.use(cors({
    origin: `http://localhost:${process.env.LOCALHOST}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

route.post('/', seguirContoller.create);
route.get('/count/:id', seguirContoller.getContadores);
route.get('/:SEGusuario/:SEGsiguiendoA', seguirContoller.getOneSiguiendo);
route.delete('/:id', seguirContoller.delete);

export default route;
