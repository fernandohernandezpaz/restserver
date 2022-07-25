const mongoose = require('mongoose');

const connection = async () => {
    try {
        const url = process.env.MONGODB_URL;
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true
            // useCreateIndex: true, // not supported
            // useFindAndModify: true, // not supported
        })
        console.log('Base de datos activa');
    } catch (e) {
        throw new Error('Error al iniciar la base de datos');
    }
}


module.exports = {
    connection
}