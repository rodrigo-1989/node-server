const  validarRoles   = require('../middlewares/validar-roles');
const  validarJWT     = require('../middlewares/validar-jwt');
const  validarCampos  = require('../middlewares/validar-campos');
const validarArchivo  = require('../middlewares/validar-archivo');

module.exports = { ...validarCampos, ...validarJWT, ...validarRoles, ...validarArchivo };