const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es requerido'], unique: true
    },
    correo: {
        type: String,
        required: [true, 'El campo correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El campo contraseña es requerido']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true, 'El campo rol es requerido'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


UsuarioSchema.methods.toJSON = function () {
    const {__v,password, ...usuario} = this.toObject();

    return usuario
}

module.exports = model('Usuario', UsuarioSchema);