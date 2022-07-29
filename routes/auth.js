
const { Router } = require('express');
const { body } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

const validarPost = [
    body('correo','El correo es obligatorio').isEmail(),
    body('password','La contraseña no es valida').not().isEmpty(),
validarCampos]

router.post('/login',validarPost, login);

router.post('/google',[body('id_token','Token de Google es necesario').not().isEmpty(),validarCampos], googleSignIn);

module.exports = router;