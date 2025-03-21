require('mongoose');
const Usr = require('../models/user');

// Metodo para agregar un usuario nuevo con el pin encriptado
const addUser = async (name,pin,isActive) => {

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(pin)
        .digest('hex');
    let existUser = await Usr.findOne({ name: name, pin: cryptoPass });
    console.log(existUser);
    if(!existUser) {
        console.log("entre");
        
        const usr = new Usr(
            {              
                name: name,
                pin:cryptoPass,
                isActive:isActive
            
            }
        );

        let user = await usr.save(); 
        console.log("usuario nuevo");
        console.log(user);
        return { user }; 

    }else{
        console.log("false");
        return false;
    }
}   


const getAllUsers = async (limit,offset) => {

    const users = await Usr.find({}).limit(limit).skip(offset);

    return users;
}

//get user por nombre y su pin encriptado
const getUser = async(name,pin) => {
    
    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(pin)
        .digest('hex');

    const user = await Usr.findOne({ name:name, pin:cryptoPass });

    // await Usr.findOne({ _id: req.params.id })

    return user;
}


module.exports = { addUser, getAllUsers, getUser}