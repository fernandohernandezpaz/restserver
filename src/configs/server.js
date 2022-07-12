require('dotenv').config();
const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use(
            '/api/users/', require('../routes/user.routes')
        )
    }

    middlewares() {
        this.app.use(express.static('src/public'));
        this.app.use(express.json());
        this.app.use(cors() );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`The server is running in port ${this.port}`);
        });
    }
}

module.exports = Server;