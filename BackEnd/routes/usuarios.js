import express from 'express';
import usuarioControler from '../controllers/usuarios.js'
const route = express.Router();

route.post('/', usuarioControler.create);
route.get('/:id', usuarioControler.getOne);
route.get('/', usuarioControler.getAll);
route.put('/:id', usuarioControler.update);
route.delete('/:id' ,usuarioControler.delete);

export default route;