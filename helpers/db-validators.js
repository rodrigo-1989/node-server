const { Categoria,Usuario, Role, Producto } = require('../models');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id: ${ id } no existe :(`);
    }
}

const existeCategoria = async( id ) => {
    const existe = await Categoria.findById(id);
    if ( !existe ) {
        throw new Error(`La Categoria con id: ${ id } no existe :(`);
    }
}

const existeProducto= async( id ) => {
    const existe = await Producto.findById(id);
    if ( !existe ) {
        throw new Error(`El producto con id: ${ id } no existe :(`);
    }
}
const collectionesPermitidas = (coleccion ='', colecciones = []) => {
    if ( !colecciones.includes(coleccion) ) {
        throw new Error(`La colección: ${ coleccion } no está permitida`);
    }
    return true;
}

module.exports = { esRoleValido, emailExiste, existeUsuarioPorId, existeCategoria, existeProducto, collectionesPermitidas };

