const express = require('express');
const { parsed } = require('dotenv').config();
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = parsed.PORT;
        this.usuariosPath = '/api/usuarios';
        //Midelwares
        this.middlewares();
        //Rutas de la aplicacion
        this.routes();

    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //BodyParser
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto !`, this.port);
        });
    }
}

module.exports = Server;