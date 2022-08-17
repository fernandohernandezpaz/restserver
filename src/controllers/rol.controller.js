const {response, request} = require('express');
const RolModel = require('../models/rol.model');

const rolGet =  async (req = request, res = response) => {
    const {limit=5, from = 0} = req.query;
    const roles = await RolModel.find()
        .skip(Number(from))
        .limit(Number(limit));
    res.json(roles);
}

const rolPost = async (req = request, res = response) => {
    const {nombre} = req.body;
    const rol = new RolModel({
        nombre,
    });

    //save
    await rol.save();

    res.json({
        rol
    });
}

module.exports = {
    rolGet,
    rolPost,
}