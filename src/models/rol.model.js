const {Schema, model} = require('mongoose');

const RolSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es requerido'], unique: true
    },
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model('Rol', RolSchema);