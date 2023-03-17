const dbValidator = require('./db-validator');
const generarJWT = require('./generar-jwt');
const subirArchivo = require('./subir-archivos');

module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...subirArchivo

}