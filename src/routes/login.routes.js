const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { autenticar } = require('../controllers/login.controller');
const { validateFields } = require('../middlewares/index');


router.post('', [
    check('correo', 'El campo correo es requerido'),
    check('correo', 'El campo correo debe ser valido').isEmail(),
    check('password', 'El campo contraseña es requerido'),
    validateFields
], autenticar);

module.exports = router;
