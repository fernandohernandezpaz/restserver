const {response, request} = require('express');
const UsuarioModel = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const autenticar = async (req = request, res = response) => {
    const { correo, password }= req.body;

    try {
        const usuario = await UsuarioModel.findOne({correo})
        if (!usuario) {
            return res.status(400).json({
                msg: `El usuario con el correo ${correo} no existe!`
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: `El usuario está inactivo!`
            });
        }

        const contraseniaValida = bcryptjs.compareSync( password, usuario.password);

        if (!contraseniaValida) {
            return res.status(400).json({
                msg: `La contraseñá es incorrecto!`
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            usuario,
            token
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            mgs: 'Hable con el administrador'
        });
    }
    
}

module.exports = {
    autenticar
}