const { response } = require('express');
const { ObjectId } = require('mongodb');
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = ['productos', 'usuarios', 'categorias','roles'];

const buscarUsuarios = async (termino = '', res = response) => {
    if(ObjectId.isValid(termino)){
        const usuario = await Usuario.findById(termino);
        return res.json( { results:(usuario)?[usuario]:[]} );
    }
    const rex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({ 
        $or:[{ nombre:rex }, { correo:rex } ], 
        $and:[{ estado:true }]
    });
    res.json( { results:usuarios } );
};

const buscarProductos = async (termino = '', res = response) => {
    if(ObjectId.isValid(termino)){
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json( { results:(producto)?[producto]:[]} );
    }
    const rex = new RegExp(termino, 'i');
    
    const productos = await Producto.find({ nombre:rex, estado:true }).populate('categoria','nombre');
    res.json( { results:productos } );
};
const buscarCategorias = async (termino = '', res = response) => {
    if(ObjectId.isValid(termino)){
        const categoria = await Categoria.findById(termino);
        return res.json( { results:(categoria)? [categoria]:[]} );
    }
    const rex = new RegExp(termino, 'i');
    
    const categorias = await Categoria.find({ nombre:rex, estado:true });
    res.json( { results:categorias } );
};

const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({ msg:`las colecciones permitidas son ${coleccionesPermitidas.join(', ')}` });
    }

    switch (coleccion) {
        case 'productos':
             buscarProductos(termino, res);
             break;
        case 'usuarios':
             buscarUsuarios(termino, res);
             break;
        case 'categorias':
             buscarCategorias(termino, res);
             break;
        case 'roles':
            return buscarRoles(termino, res);
        default:
            return res.status(400).json({ msg: 'No se encontraron coincidencias' });
    }
}
module.exports = { buscar };
