import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import dbClient from './config/dbClient.js';

import routeUsuarios from './routes/usuarios.js';
import routeCategoria from './routes/categoria.js';
import routePublicacion from './routes/publicacion.js';
import routeComentario from './routes/comentario.js';
import routeReporte from './routes/reporte.js';
import routeFavorito from './routes/favorito.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/usuario', routeUsuarios);
app.use('/categoria', routeCategoria)
app.use('/publicacion', routePublicacion)
app.use('/comentario', routeComentario)
app.use('/reporte', routeReporte)
app.use('/favorito', routeFavorito)


try{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log('Servidor activo en el puerto: ' + PORT))
}catch(e){
    console.log(e);
}

process.on('SIGINT', async () => {
    dbClient.cerrarConexion();
    process.exit(0);
})