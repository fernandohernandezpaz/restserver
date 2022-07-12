const {response, request} = require('express');

const userGet = (req = request, res = response) => {
    const {q, age} = req.query;
    res.json({
        msg: 'Get api',
        q,
        age
    });
}


const userGetById = (req = request, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'Get api',
        id
    });
}

const userPost = (req = request, res = response) => {
    const {name} = req.body;

    res.json({
        msg: 'Post api',
        name
    });
}

const userPut = (req = request, res = response) => {
    const {id} = req.params
    res.json({
        msg: 'Put api',
        params: {
            id
        }
    });
}

const userDelete = (req = request, res = response) => {
    res.json({
        msg: 'Delete api'
    });
}

module.exports = {
    userGet,
    userGetById,
    userPost,
    userPut,
    userDelete
}