const {response, request} = require('express');
const {subirArchivo} = require('../helpers');
const uploadFile = async (req = request, res = response) => {

    try {
        if (!req.files || !Object.keys(req.files).length)
            return res.status(400).json();
        const {nombre} = await subirArchivo(req.files,'test')

        res.json({nombre})
    } catch (err) {
        res.status(400).json(err)
    }
}


module.exports = {
    uploadFile,
}