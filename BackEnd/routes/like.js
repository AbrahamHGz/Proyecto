import express from 'express';
import likeController from '../controllers/like.js';
const route = express.Router();
import cors from 'cors';


route.use(cors({
    origin: `http://localhost:${process.env.LOCALHOST}`, // Permitir solo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

route.post('/', likeController.create);
route.get('/count/:LIKpublicacion', likeController.countLikes)
route.get('/:LIKusuario/:LIKpublicacion', likeController.getOneLike)
route.delete('/:id', likeController.delete);

export default route