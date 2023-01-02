const validateFields = require('./validate-fields')
const validarJWT  = require('./validar-jwt');
const validarRoles = require('./validar-roles');


module.exports = {
    ...validateFields,
    ...validarJWT,
    ...validarRoles
}