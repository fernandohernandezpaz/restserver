const {response, request} = require('express');
const CategoriaModel = require('../models/categoria.model');

const relaciones = ['usuarioCreador', 'usuarioModificador', 'usuarioEliminador'];
const getCategories = async (req = request, res = response) => {
    const {limit = 5, from = 0} = req.query;
    const filters = {
        estado: true
    }
    const [total, categorias] = await Promise.all([
        CategoriaModel.countDocuments(filters),
        CategoriaModel.find(filters)
            .populate(relaciones)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        categorias
    });
}

const getCategoryById = async (req = request, res = response) => {
    const {id} = req.params;
    const categoria = await CategoriaModel.findById(id)
        .populate(relaciones);

    res.status(200).json({
        categoria
    });
}

const postCategories = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaExistente = await CategoriaModel.findOne({
        nombre
    });

    if (categoriaExistente) {
        return res.status(400).json({
            msg: `La categoría ${nombre}, ya existe`
        })
    }

    const categoria = new CategoriaModel({
        nombre,
        usuarioCreador: req.usuario._id
    });

    await categoria.save()

    res.status(201).json({
        categoria
    })
}

const putCategoria = async (req = request, res = response) => {
    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();
    const categoria = await CategoriaModel.findById(id);
    if (!categoria)
        return res.status(404).json({
            msg: 'Categoria no encontrada'
        });

    if (!categoria.estado)
        return res.status(403).json({
            msg: 'Categoria inactiva'
        });

    const categoriaNombreRegistrado = await CategoriaModel.findOne({
        nombre,
        _id: {$ne: id}
    });
    if (categoriaNombreRegistrado)
        return res.status(400).json({
            msg: 'El nombre de categoría ya existe'
        });

    categoria.nombre = nombre;
    categoria.usuarioModificador = req.usuario._id;
    categoria.save();

    res.status(200).json({
        msg: 'Categoria actualizada'
    });
}


const deleteCategoria = async (req = request, res = response) => {
    const {id} = req.params;
    const categoria = await CategoriaModel.findById(id);
    if (!categoria)
        return res.status(404).json({
            msg: 'Categoria no encontrada'
        });

    if (!categoria.estado)
        return res.status(403).json({
            msg: 'Categoria eliminada. No puede ser eliminada nuevamente.'
        });

    categoria.estado = false;
    categoria.usuarioEliminador = req.usuario._id;
    categoria.save();

    res.status(200).json({
        msg: 'Categoria eliminada'
    });
}


module.exports = {
    getCategories,
    getCategoryById,
    postCategories,
    putCategoria,
    deleteCategoria
}