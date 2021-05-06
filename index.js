const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('cookie-session');
const cookieParser = require('cookie-parser');
const routes = require('./router/index');



// Configuración y Modelos BD
const db = require('./config/db');
    require('./models/codigo');
    db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error));

// Variables de Desarrollo
require('dotenv').config({path: 'variables.env'});

// crear el servidor 
const app = express();

// habilitar ejs como template engine 
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body parser, leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }));

// para que entienda un formulario
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.use(session());

// Ubicación vistas
app.set('views', path.join(__dirname, './views'));

// archivos staticos
app.use(express.static('public'));

// habilitar cookie parser
app.use(cookieParser());

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave : false,
    saveUninitialized : false
}))

// Agrega flash messages
app.use(flash());

// Middleware (usuario logueado, flash messages, fecha actual)
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

// rutas de la app
app.use('/', routes());
//leer el host  y el puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
//Agrega el puerto
app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});
