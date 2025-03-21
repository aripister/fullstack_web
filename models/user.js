const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usrSchema = new Schema({

	name:{
		type: String,
		required:true
    },
    pin:{
		type: String,
		required:true
	},
	isActive:{
		type: Boolean,
		required:true,
        default: true
	}

	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
});


const Usr = mongoose.model('users',usrSchema);
module.exports = Usr;