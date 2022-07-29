
const { Router } = require('express');
const { body,check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const validarPost = [
    body('correo','El correo es obligatorio').isEmail(),
    body('password','La contraseña no es valida').not().isEmpty(),
validarCampos]

router.post('/login',validarPost, login);

module.exports = router;