const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

/******/
const UsrController = require('./controllers/user');
const AuthController = require('./controllers/auth');
const PersonajeController = require('./controllers/personajes');
const RopaController = require('./controllers/ropa');
//const Middleware = require('./middleware/auth-middleware');
//const MailController = require('./controllers/mail');


mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));


app.use(cors());
app.use(express.json());

http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
  });

app.get("/", (req, res) => {
    //res.send("Hola estoy funcionando.");
    res.status(200).json("Hola estoy funcionando.");
  });

// GET - POST - DELETE - PUT - PATCH 

app.post("/",(req,res) => {
    res.send("Llamada post");
});

// Get de todos los usuarios
app.get("/users",async (req,res) =>{
  let limit = req.query.limit;
  let offset = req.query.offset;

    try{
        const results = await UsrController.getAllUsers(limit,offset);
        console.log(results);
        res.status(200).json(results);
  
    }catch(error){
        res.status(500).send("Error. Intente más tarde.")
    }
  
  });

// Get Info de un usuario
app.get("/users/:name/:pin",async (req,res) =>{

    let name =  req.params.name;
    let pin =  req.params.pin;

    try{

      user = await UsrController.getUser(name, pin);
        console.log(user);
      res.status(200).json(user);

    }catch(error){
      res.status(500).send("Error");
    }

});

// Creo un nuevo usuario

app.post("/users",async (req,res) =>{
    
  let name = req.body.name;
  let pin = req.body.pin;
  let isActive = req.body.isActive;
  try{
    const result = await UsrController.addUser(name,pin,isActive);
    if(result){
      res.status(201).send("Usuario creado correctamente"); // 201
    }else{
      res.status(409).send("El usuario ya existe"); // 409
    }  
  }catch(error){
    res.status(500).send("Error al crear el usuario."); //500
  }  
  
});

// Login de usuario
app.post("/auth/login", async (req,res) => {

  const name = req.body.name;
  const pin = req.body.pin;
  try{
    const result = await AuthController.login(name,pin);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(401).send("Login invalido. Revise sus credenciales.")
    }
  }catch(error){
      res.status(500).send("Error");
  }  
})

// Ver nombre usuario logueado
app.get("/session",async (req,res) =>{

  try{
      const results = await AuthController.getUserLogueado();
      console.log(results);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente más tarde.")
  }

});


// PERSONAJES

// Get de todos los personajes default
app.get("/personajesDefault", async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await PersonajeController.getAllPersonajesDefault(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente más tarde.")
  }

});


// Creo un nuevo personaje con ropa 

app.post("/createPersonajeNuevo", async (req,res) =>{
    
  let userId = req.body.userId;
  let name = req.body.name;
  let personaje = req.body.personaje;
  let parteSuperior = req.body.parteSuperior;
  let parteInferior = req.body.parteInferior;
  let zapato = req.body.zapato;
  try{
    const result = await PersonajeController.addNuevoPersonajeCreado(userId,name,personaje, parteSuperior, parteInferior, zapato);

    res.status(201).send("personaje creado correctamente"); // 201

  }catch(error){
    res.status(500).send("Error al crear el personaje."); //500
  }  
  
});


// Get ultimos personajes nuevos creados

app.get("/personajesCreados", async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await PersonajeController.getUltimosPersonajesCreados(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente más tarde.")
  }

});


// Get Personajes que usuario haya generado previamente

app.get("/personajes/user", async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;
  let usuario = req.body.userId;

  try{
      const results = await PersonajeController.getPersonajesPorUsuario(limit,offset,usuario);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente más tarde.")
  }

});


// Get prendas de ropa por tipo de prenda(parteSuperior, parteInferior o zapatos) 

app.get("/ropa", async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;
  let tipo = req.query.tipo;

  try{
      const results = await RopaController.getAllRopaByTipo(limit,offset,tipo);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente más tarde.")
  }

});

