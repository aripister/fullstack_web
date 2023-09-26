const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const personajeSchema = new Schema({

	name:{
		type: String,
		required:true
    },
    description:{
		type: String,
		required:true
	},
	ruta:{
		type: String,
		required:true,
        default: ""
	}

	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;

    }
});


const PersonajeDefault = mongoose.model('personajes', personajeSchema);
module.exports = PersonajeDefault;