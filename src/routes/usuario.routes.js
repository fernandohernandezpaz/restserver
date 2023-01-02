const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');

const { validarJWT, validateFields, tieneRole, esAdminRole } = require('../middlewares/index');

const {validRol, existsEmail, existsUser } = require('../helpers/db-validator');

const {
    usuarioGet,
    usuarioGetById,
    usuarioPost,
    usuarioPut,
    usuarioDelete
} = require('../controllers/usuario.controller');


router.get('', usuarioGet);

router.get('/:id/',[
    validarJWT,
    tieneRole(['NOSE_ROLE']),
    check('id','No es un Id valido').isMongoId(),
    check('id').custom(existsUser),
    validateFields
], usuarioGetById);

router.post('', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('password', 'El password debe ser de más de 8 caracteres').isLength({min: 8}),
    // check('correo', 'El correo es requerido').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correo => existsEmail(correo)),
    check('rol').custom(rol => validRol(rol)),
    // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
], usuarioPost);

router.put('/:id/', [
    validarJWT,
    check('id','No es un Id valido').isMongoId(),
    check('id').custom(existsUser),
], usuarioPut);

router.delete('/:id/', [
    validarJWT,
    esAdminRole,
    check('id','No es un Id valido').isMongoId(),
    check('id').custom(existsUser),
], usuarioDelete);

module.exports = router;