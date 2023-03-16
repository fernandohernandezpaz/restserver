const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es requerido']
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuarioCreador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    usuarioModificador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    },
    usuarioEliminador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    }
});

CategoriaSchema.methods.toJSON = function () {
    const {__v, _id, ...categoria} = this.toObject();
    categoria.uid = _id
    return categoria;
}


module.exports = model('Categoria', CategoriaSchema);