const RolModel = require('../models/rol.model');
const UsuarioModel = require('../models/usuario.model');


const validRol = async (nombre = '') => {
    const existeRol = await RolModel.findOne({
        nombre
    });

    if (!existeRol) {
        throw new Error(`El rol ${nombre} no esta registrado`)
    }
}


const existsEmail = async (correo = '') => {
    const existeEmail = await UsuarioModel.findOne({
        correo
    });

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe`);
    }
}

const existsUser = async (id) => {
    const existeUsuario = await UsuarioModel.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario con id ${id}`);
    }
}


module.exports = {
    validRol,
    existsEmail,
    existsUser
}