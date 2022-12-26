require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connection } = require('../database/config.db')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.prePath = '/api';
        this.autenticacionPath = `${this.prePath}/autenticacion/`;
        this.rolesPath = `${this.prePath}/roles/`;
        this.usuarioPath = `${this.prePath}/usuarios/`;

        this.connectToDB();

        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.use(
            this.autenticacionPath, require('../routes/login.routes')
        );
        this.app.use(
            this.rolesPath, require('../routes/rol.routes')
        );
        this.app.use(
            this.usuarioPath, require('../routes/usuario.routes')
        );
    }

    middlewares() {
        this.app.use(express.static('src/public'));
        this.app.use(express.json());
        this.app.use(cors() );
    }

    async connectToDB() {
        await connection()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`The server is running in port ${this.port}`);
        });
    }
}

module.exports = Server;