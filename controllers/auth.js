require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

//variable para simular la sesion para la primer entrega
var session = "";

const login = async(name,pin) => {

    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(pin)
        .digest('hex');

    const  result = await Usr.findOne({ name: name, isActive:true, pin:cryptoPass })
    
    if (result){
            // retorno token
            //jwt.sign('payload','secret_key','options')
            //const token = jwt.sign({ foo: 'bar' }, 'secret_key');
            session = name;    
            const token = jwt.sign({ user: result }, secret_key, { expiresIn: "1h" });
            return token;
    }
    return null; // retorno null si es invalido el login

}

const getUserLogueado = async() => {
    const str = "El usuario logueado es: ";
    return str + session;
}

module.exports = {login,getUserLogueado}