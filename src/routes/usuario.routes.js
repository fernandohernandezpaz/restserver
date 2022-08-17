const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields.middlewares')
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
    check('id','No es un Id valido').isMongoId(),
    check('id').custom(existsUser),
    check('rol').custom(rol => validRol(rol)),
    validateFields
], usuarioGetById);

router.post('', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('password', 'El password debe ser de más de 8 caracteres').isLength({min: 8}),
    // check('correo', 'El correo es requerido').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correo => existsEmail(correo)),
    check('rol').custom(rol => validRol(rol)),
    // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
], usuarioPost);

router.put('/:id/', usuarioPut);

router.delete('', usuarioDelete);

module.exports = router;