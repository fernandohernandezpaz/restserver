const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuario.model');

const mensajesError = {
    usuarioNoExiste: "Token no válido - usuario no existe en la bd",
    tokenNoValido: "Token no válido",
    tokenNoExiste: "No se encontro un token de autorización"
}


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: mensajesError.tokenNoExiste
        });
    }
    try {

        const { usuarioId }= jwt.verify(token, process.env.SECRETORPUBLIC_KEY);
        const usuarioAutenticado = await UsuarioModel.findById(usuarioId);

        if (!usuarioAutenticado) {
            return res.status(401).json({
                msg: mensajesError.usuarioNoExiste
            });
        }


        if (!usuarioAutenticado.estado) {
            return res.status(401).json({
                msg: mensajesError.tokenNoValido
            });
        }

        req.usuario = usuarioAutenticado;

        //req.usuarioId = usuarioId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: mensajesError.tokenNoValido
        });
    }
};

module.exports = {
    validarJWT
};