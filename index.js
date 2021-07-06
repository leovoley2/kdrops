const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const router = require('./routes');
require('dotenv').config({path: 'variables.env'});

const app = express();


// habilitar EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//ubicacion de las vistas
app.set('views', path.join(__dirname, './views'));

//archivos estaticos
app.use(express.static('public'));

//Routing
app.use('/', router());

// Agregar el Puerto 
app.listen(process.env.PORT, () => {
    console.log('El servidor esta funcionando');
});