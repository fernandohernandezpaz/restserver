const {response, request} = require('express');
const RolModel = require('../models/rol.model');

const rolGet =  async (req = request, res = response) => {
    // const roles = await RolModel.find().cursor();
    res.json({
        msg: 'Get api',
        // data: roles
    });
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