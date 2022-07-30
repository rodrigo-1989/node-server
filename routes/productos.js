const { Router } = require('express');
const { body, check } = require('express-validator');
const { obtenerProducto, obtenerProductos, crearProducto, actualzarProducto, eliminarProducto } = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');
const router = Router();

//Obtener todos los productos
router.get('/', obtenerProductos);
//Obtener un producto por id
router.get('/:id', [check('id', 'No es un id de mongo valido').isMongoId(), check('id').custom(existeProducto),
    validarCampos], obtenerProducto);

//Crear un producto privado - Cualquiera con un token valido
const validarCamposProducto = [validarJWT, body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('categoria', 'La categoria es obligatoria').not().isEmpty(),check('categoria').custom(existeCategoria), validarCampos]
router.post('/', validarCamposProducto, crearProducto);

//Actualizar una categoria  privado - Cualquiera con un token valido
const validarActualizar = [validarJWT, body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de mongo valido').isMongoId(), check('id').custom(existeProducto), validarCampos]
router.put('/:id', validarActualizar, actualzarProducto);

//Eliminar una categoria privado - solo con role  admin
const validarElinacion = [validarJWT, esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(), check('id').custom(existeProducto), validarCampos]
router.delete('/:id', validarElinacion, eliminarProducto);

module.exports = router;