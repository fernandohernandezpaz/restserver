const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');

const {userGet, userGetById, userPost, userPut, userDelete} = require('../controllers/usuario.controller');


router.get('', userGet);
router.get('/:id/', userGetById);
router.post('', [
    check('correo', 'El correo no es valido').isEmail()
], userPost);
router.put('/:id/', userPut);
router.delete('', userDelete);

module.exports = router;