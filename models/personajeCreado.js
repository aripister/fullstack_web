const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personajeCreadoSchema = new Schema({
    userId:{
		type: String,
		required:true
    },
	name:{
		type: String,
		required:true
    },
    personaje:{
		type: Object,
		required:true,
	},
    parteSuperior:{
		type: Object,
		required:true
	},
	parteInferior:{
		type: Object,
		required:true,
	},
    zapato:{
		type: Object,
		required:true,
	}
	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});

const PersonajeCreado = mongoose.model('personajescreados', personajeCreadoSchema);
module.exports = PersonajeCreado;