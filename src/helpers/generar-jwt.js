const jwt = require('jsonwebtoken');

const generarJWT = (usuarioId) => {
    return new Promise((resolve, reject) => {
        const payload = { usuarioId };
        jwt.sign(payload, process.env.SECRET_OR_PUBLIC_KEY, {
            expiresIn: '4h',
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo gererar el token');
            } else {
                resolve(token);
            }
        })
        
    });
}

module.exports = {
    generarJWT
}
