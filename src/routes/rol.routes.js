const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');

const {
    rolGet,
    rolPost,
} = require('../controllers/rol.controller');


router.get('', rolGet);
router.post('', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
], rolPost);

module.exports = router;