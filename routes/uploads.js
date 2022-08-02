const { Router } = require('express');
const { body, check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { collectionesPermitidas } = require('../helpers/db-validators');
const { validarCampos, validarArchivo } = require('../middlewares');
const router = Router();

router.post('/', validarArchivo, cargarArchivo);

const validarImagen = [
    validarArchivo,
    check('id', 'El id debe de ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => collectionesPermitidas(c, ['productos', 'usuarios'])), validarCampos]

router.put('/:coleccion/:id', validarImagen, actualizarImagenCloudinary); // actualizarImagenCloudinary

const validarGet = [check('id', 'El id debe de ser un id de mongo').isMongoId(),
check('coleccion').custom(c => collectionesPermitidas(c, ['productos', 'usuarios'])), validarCampos]
router.get('/:coleccion/:id', validarGet, mostrarImagen);


module.exports = router;