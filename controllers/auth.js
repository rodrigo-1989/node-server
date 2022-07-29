const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generateToken } = require('../helpers/generarJWT');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) { return res.status(400).json({ msg: 'El usuario no existe' }); }
        if (!usuario.estado) { return res.status(400).json({ msg: 'Usuarioa esta dado de baja' }); }
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) { return res.status(400).json({ msg: 'Usuario o password no son correctos' }); }
        const token = await generateToken(usuario._id);
        res.json({ usuario,token });

    } catch (error) {
        return res.status(500).json({ msg: 'Hablar con el administrador' })
    }

}

module.exports = { login };