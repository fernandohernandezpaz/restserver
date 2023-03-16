require('dotenv').config();
const express = require('express');
const {response, request} = require('express');
const cors = require('cors');
const { connection } = require('../database/config.db')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.prePath = '/api';
        this.paths = {
            autentication: `${this.prePath}/autenticacion/`,
            roles: `${this.prePath}/roles/`,
            usuarios: `${this.prePath}/usuarios/`,
            categorias: `${this.prePath}/categorias/`,
        }

        this.connectToDB();

        this.middlewares();

        this.routes();
    }

    routes() {

        this.app.use(
            this.paths.autentication, require('../routes/login.routes')
        );
        this.app.use(
            this.paths.roles, require('../routes/rol.routes')
        );
        this.app.use(
            this.paths.usuarios, require('../routes/usuario.routes')
        );
        this.app.use(
            this.paths.categorias, require('../routes/categoria.routes')
        );
        this.app.all('*', (req , res) => {
            res.status(404).send({
                error: 'Route not found',
            });
        });
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