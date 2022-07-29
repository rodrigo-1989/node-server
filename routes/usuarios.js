const { Router } = require('express');
const { body,check } = require('express-validator');

const { validarCampos,validarJWT,esAdminRole,tieneRole} =require('../middlewares');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    body('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    body('correo', 'El correo no es válido').isEmail(),
    body('correo').custom(emailExiste),
    body('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;