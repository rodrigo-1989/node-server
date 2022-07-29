const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generateToken } = require('../helpers/generarJWT');
const googleVerify = require('../helpers/google-ferify');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) { return res.status(400).json({ msg: 'El usuario no existe' }); }
        if (!usuario.estado) { return res.status(400).json({ msg: 'Usuarioa esta dado de baja' }); }
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) { return res.status(400).json({ msg: 'Usuario o password no son correctos' }); }
        const token = await generateToken(usuario._id);
        res.json({ usuario, token });

    } catch (error) {
        return res.status(500).json({ msg: 'Hablar con el administrador' })
    }

}
const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;
    try {
        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            usuario = new Usuario({ nombre, correo, rol: 'USER_ROLE', estado: true, password: ':P', img, google: true });
            await usuario.save();
        }
        if (!usuario.estado) { return res.status(401).json({ msg: 'Hablar con el administrador' }); }

        const token = await generateToken(usuario._id);

        res.json({ usuario, token });
    } catch (error) {
        res.status(400).json({ ok: false, msg: 'El token no se pudo verificar' });
    }


}

module.exports = { login, googleSignIn };