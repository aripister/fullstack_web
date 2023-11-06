require('mongoose');
const PersonajeDefault = require('../models/personaje');
const PersonajeCreado = require('../models/personajeCreado');
const RopaController = require('../controllers/ropa');

const getAllPersonajesDefault = async (limit,offset) => {

    const personajes = await PersonajeDefault.find({}).limit(limit).skip(offset);

    return personajes;
}

//get personajeDefault por nombre
const getPersonajeDefaultByName = async(name) => {

    const pjDefault = await PersonajeDefault.findOne({ name:name});

    return pjDefault;
}


// crear un personaje
const addNuevoPersonajeCreado = async (userId,name,personaje, parteSuperior, parteInferior, zapatos) => {

        const pjDefault = await getPersonajeDefaultByName(personaje);
        const parteSup = await RopaController.getRopaByName(parteSuperior);
        const parteInf = await RopaController.getRopaByName(parteInferior);
        const zap = await RopaController.getRopaByName(zapatos);

        const personajeCreado = new PersonajeCreado(
            {              
                userId: userId,           
                name: name,
                personaje: pjDefault,
                parteSuperior: parteSup,
                parteInferior: parteInf,
                zapato: zap
            
            }
        );
      
        let nuevo = await personajeCreado.save(); 
        console.log("Personaje nuevo ha sido creado");
        console.log(nuevo);      
        return { nuevo }; 

}



//get ultimos personajes creados (puede usarse tanto para el ultimo como para los ultimos 5 segun param limit)
const getUltimosPersonajesCreados = async(limit,offset) => {

    const ultimosPersonajes = await PersonajeCreado.find().sort({createdAt: -1 }).limit(limit).skip(offset);

    return ultimosPersonajes;
}


// Get personajes creados por el usuario previamente

const getPersonajesPorUsuario = async(limit,offset,usuario) => {
    console.log(usuario);
    const personajesPorUsuario = await PersonajeCreado.find({ userId: usuario}).sort({createdAt: -1 }).limit(limit).skip(offset);

    return personajesPorUsuario;
}

  

module.exports = { getAllPersonajesDefault, addNuevoPersonajeCreado, getUltimosPersonajesCreados, getPersonajesPorUsuario }
