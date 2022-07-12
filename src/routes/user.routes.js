const {Router} = require('express');
const router = Router();
const {userGet, userGetById, userPost, userPut, userDelete} = require('../controllers/usuario.controller')
router.get('', userGet);
router.get('/:id/', userGetById);
router.post('', userPost);
router.put('/:id/', userPut);
router.delete('', userDelete);
module.exports = router;