//librerias externas
require('dotenv').config();
const fs = require('fs');
const express = require("express");
const moment = require('moment');
const debug = require('debug')('myapp');
const morgan = require("morgan");

//modulos internos
const { readFile, writeFile} = require("./src/files.js");
const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'My App';
const FILE_NAME = "./db/person.json";
const FILE_NAME_ACCESS = "./db/acces.json"; 
process.env.DEBUG = '*';

app.use(morgan("dev"));
app.set("views", "./src/views");
app.set("view engine", "ejs");

//declarar un arreglo para guardar los accesos sin que se borren

//RUTA DE PRUEBA 
app.get("/persons", (req, res) => {
  //debug para ver que se esta ejecutando la ruta
  debug('Processing /persons route');

//crear el archivo acces.json
  if (!fs.existsSync(FILE_NAME_ACCESS)) {
    debug('Creating acces.json file...');
    writeFile(FILE_NAME_ACCESS, '[]');
  }

    const acces = readFile(FILE_NAME_ACCESS); 
    debug('Acces:',   acces);//debug que sirve para ver que se esta ejecutando el archivo acces.json
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

    acces.push(currentTime);

    const accesJson = JSON.stringify(acces);

    writeFile(FILE_NAME_ACCESS, accesJson); 

    //leer el archivo products.json
    const persons = readFile(FILE_NAME);

    const filteredPersons = persons.filter(person => {
        const ageInYears = person.age;  //ageInYears tomará el valor de la edad de la persona
        const ageInDays = ageInYears * 365; //ageInDays tomará el valor de la edad de la persona en dias
        return ageInDays > 5475; //Filtra personas mayores de 5475 días (15 años)
      });
      debug('Filtered persons:', filteredPersons);//debug que sirve para ver que se esta ejecutando el archivo persons.json
      res.render('index', {  filteredPersons : filteredPersons});

  });

  app.listen(PORT, () =>
  console.log(`${APP_NAME} is running on http://localhost:${PORT}`) //sirve para ver en que puerto esta corriendo el servidor
);
