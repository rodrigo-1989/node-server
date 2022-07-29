const { response } = require('express');

const esAdminRole = (req, res = response, next) => {

    if (!req.usuario) { return res.status(500).json({ msg: 'Se quiere verificar el rol sin verificar el Token antes' }); }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') { return res.status(401).json({ msg: `El usuario:'${nombre}'no es ADMININTRADOR` }); }
    next();
}

const tieneRole = (...roles) => {

    return (req, res = response, next) => {
        if (!req.usuario) { return res.status(500).json({ msg: 'Se quiere verificar el rol sin verificar el Token antes' }); }
        if (!roles.includes(req.usuario.rol)) { return res.status(401).json({ msg: `El servicio requiere algun de estos roles ${roles}` }); }
        next();
    }

}

module.exports = { esAdminRole, tieneRole };