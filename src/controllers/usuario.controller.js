const {response, request} = require('express');
const UsuarioModel = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');

const usuarioGet = async (req = request, res = response) => {
    const {q, age} = req.query;
    // const usuarios = await UsuarioModel.find().cursor();
    res.json({
        msg: 'Get api',
        q,
        age
    });
}

const usuarioGetById = (req = request, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'Get api',
        id
    });
}

const usuarioPost = async (req = request, res = response) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new UsuarioModel({
        nombre,
        correo,
        password,
        rol
    });

    // encrypt password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //save
    await usuario.save();

    res.json({
        msg: 'Post api',
        usuario
    });
}

const usuarioPut = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, password, google, ...data} = req.body;

    const usuario = await UsuarioModel.findByIdAndUpdate(id, data);
    res.json({
        usuario
    });
}

const usuarioDelete = (req = request, res = response) => {
    res.json({
        msg: 'Delete api'
    });
}

module.exports = {
    usuarioGet,
    usuarioGetById,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}