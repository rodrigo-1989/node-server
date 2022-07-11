const { response } = require('express');

const usuariosGet = (req = request, res= response) => {
    const {q ,nombre= 'No anme', apikey, page = 1, limit} = req.query;
    res.json({
        message: 'Esta es una peticion GET desde el controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}
const usuariosPost = (req, res= response) => {
    const { nombre, edad} = req.body;

    res.json({
        message: 'Esta es una peticion POST desde el controlador',
        nombre,
        edad
    });
}
const usuariosPut = (req, res= response) => {

    const {id} = req.params;
    res.json({
        message: 'Esta es una peticion PUT desde el controlador',
        id
    });
}
const usuariosPatch = (req, res= response) => {
    res.json({
        message: 'Esta es una peticion PATCH desde el controlador'
    });
}
const usuariosDelete = (req, res= response) => {
    res.json({
        message: 'Esta es una peticion DELETE desde el controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}