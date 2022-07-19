const mongoose = require('mongoose');

const connection = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
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