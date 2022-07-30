const { Router } = require('express');
const { body, check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualzarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');
const router = Router();

//Obtener todas las categorias
router.get('/', obtenerCategorias);
//Obtener una categoria por id
router.get('/:id',
    [check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
        validarCampos], obtenerCategoria);

//Crear una categoria  privaso - Cualquiera con un token valido
const validarCamposCategoria = [validarJWT, body('nombre', 'El nombre es obligatorio').not().isEmpty(), validarCampos]
router.post('/', validarCamposCategoria, crearCategoria);

//Actualizar una categoria  privado - Cualquiera con un token valido
const validarActualizar = [validarJWT, body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria), validarCampos]
router.put('/:id', validarActualizar, actualzarCategoria);

//Eliminar una categoria privado - solo con role  admin
const validarElinacion = [ validarJWT, esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(), check('id').custom(existeCategoria), validarCampos]
router.delete('/:id', validarElinacion, eliminarCategoria);


module.exports = router;