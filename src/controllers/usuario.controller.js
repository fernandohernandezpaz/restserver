const {response, request} = require('express');
const UsuarioModel = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');

const usuarioGet = async (req = request, res = response) => {
    const {search, limit = 5, from = 0} = req.query;
    if (isNaN(from) || isNaN(limit))
        return res.status(400).json({
            message: 'Send a numeric value for the parameters: limit or from'
        });

    const filters = {
        estado: true
    };

    if (search) {
        const regexSearch = new RegExp(search, 'i');
        Object.assign(filters, {
            $or: [{nombre: regexSearch}, {correo: regexSearch}]
        });
    }

    const [total, users] = await Promise.all([
        UsuarioModel.countDocuments(filters),
        UsuarioModel.find(filters)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        users
    });
}

const usuarioGetById = async (req = request, res = response) => {
    const {id} = req.params;
    const user = await UsuarioModel.findById(id);

    res.status(200).json({
        user
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

const usuarioDelete = async (req = request, res = response) => {
    const {id} = req.params;

    // delete from db
    // await UsuarioModel.findByIdAndDelete(id);

    // update the status from record in searched
    await UsuarioModel.findByIdAndUpdate(id, {
        estado: false
    })

    res.json({
        msg: `Records ${id} deleted`
    });
}

module.exports = {
    usuarioGet,
    usuarioGetById,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}