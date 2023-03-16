const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const {validateFields, validarJWT} = require('../middlewares/index');

const {
    getCategories,
    postCategories,
    getCategoryById,
    putCategoria,
    deleteCategoria
} = require('../controllers/categoria.controller');


router.get('/', getCategories);
// router.get('/:id([a-fA-F0-9]{24})', [
router.get('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo valid').isMongoId(),
    validateFields
],getCategoryById);

router.post('/', [
    validarJWT,
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    validateFields
],postCategories);

router.put('/:id', [
    validarJWT,
    check('id', 'Campo id no valido').isMongoId(),
    check('nombre', 'Campo nombre requerido').not().isEmpty(),
    validateFields
], putCategoria);

router.delete('/:id', [
    validarJWT,
    check('id', 'Campo id no valido').isMongoId(),
    validateFields
],deleteCategoria);

module.exports = router;