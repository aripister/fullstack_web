const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ropaSchema = new Schema({

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
	},
    tipo:{
		type: String,
		required:true,

	}
    

	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;

    }
});

const Ropa = mongoose.model('ropas', ropaSchema);
module.exports = Ropa;