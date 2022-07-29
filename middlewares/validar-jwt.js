const jwt = require('jsonwebtoken');
const { response, request } = require('express');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) { return res.status(401).json({ msg: 'No hay token en la peticion' }); }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(uid);

        if (!usuario) { return res.status(404).json({ msg: 'Usuario NO existe en BD' }); }
        //Verificar si el uid es true

        if (!usuario.estado) { return res.status(401).json({ msg: 'TOKEN no Valido - usuaraio con estado:false' }); }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'No hay token NO valido' });
    }

}

module.exports = { validarJWT };