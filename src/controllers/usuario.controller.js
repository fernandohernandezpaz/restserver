const {response, request} = require('express');
const UsuarioModel = require('../models/usuario.model')

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

const userPost = async(req = request, res = response) => {
    const body = req.body;
    const usuario = new UsuarioModel(body);
    // console.log(usuario);
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