const {response, request} = require('express');
const UsuarioModel = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

const userGet = (req = request, res = response) => {
    const {q, age} = req.query;
    res.json({
        msg: 'Get api',
        q,
        age
    });
}

const userGetById = (req = request, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'Get api',
        id
    });
}

const userPost = async (req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const {nombre, correo, password, rol} = req.body;
    const usuario = new UsuarioModel({
        nombre,
        correo,
        password,
        rol
    });

    // check if email exists
    const correoExiste = await UsuarioModel.findOne({correo});
    if (correoExiste) {
        return res.status(400).json({
            msg:`El correo ${correo} ya existe`
        });
    }

    // encrypt password
    const salt = bcryptjs.genSaltSync();
    usuario.password =  bcryptjs.hashSync(password, salt);

    //save
    await usuario.save();

    res.json({
        msg: 'Post api',
        usuario
    });
}

const userPut = (req = request, res = response) => {
    const {id} = req.params
    res.json({
        msg: 'Put api',
        params: {
            id
        }
    });
}

const userDelete = (req = request, res = response) => {
    res.json({
        msg: 'Delete api'
    });
}

module.exports = {
    userGet,
    userGetById,
    userPost,
    userPut,
    userDelete
}