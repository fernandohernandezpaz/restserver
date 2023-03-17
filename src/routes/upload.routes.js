const {Router} = require('express');
const router = Router();

const {
    uploadFile
} = require('../controllers/upload.controller');


router.post('/', uploadFile);

module.exports = router;