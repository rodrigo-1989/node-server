const { response } = require('express');
const { Categoria } = require('../models');

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) { return res.status(400).json({ msg: `La categoria:${categoriaDB} ya existe` }); }

    const data = { nombre, usuario: req.usuario._id };

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);
}
const obtenerCategorias = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate('usuario', 'nombre').skip(Number(desde)).limit(Number(limite))
    ]);
    res.json({ total, categorias });
}

const obtenerCategoria = async (req, res = response) => {
    const categoria = await Categoria.findById(req.params.id).populate('usuario', 'nombre');
    res.json(categoria);
}

const actualzarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { estado, nombre, usuario, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id,data,{ new: true});
    res.json(categoria);
}

const eliminarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false },{new:true });
    res.status(200).json(categoriaBorrada);
}

module.exports = { crearCategoria, obtenerCategorias, obtenerCategoria, actualzarCategoria, eliminarCategoria }