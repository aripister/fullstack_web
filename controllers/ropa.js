require('mongoose');
const Ropa = require('../models/ropa');

// Get prendas de ropa por tipo (parteSuperior, parteInferior, zapato )
const getAllRopaByTipo = async (limit,offset,tipo) => {

    const personajes = await Ropa.find({tipo: tipo}).limit(limit).skip(offset);

    return personajes;
}

//get prenda de Ropa por nombre
const getRopaByName = async(name) => {
    const prenda = await Ropa.findOne({ name:name});
    return prenda;
}

module.exports = { getAllRopaByTipo, getRopaByName}