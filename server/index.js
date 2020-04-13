// importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const router = require('./routes');

const configs = require('./config');
const db = require('./config/database');

require('dotenv').config({path : 'variables.env'});

db.authenticate().then(
    () => console.log('DB conectada')
).catch(error => console.log(error))

//Configurar express
const app = express();

//Habilitar pug
app.set('view engine', 'pug');

//Añadir las vistar
app.set('views', path.join(__dirname, './views'))

//Cargar una carpeta estatic llamada public
app.use(express.static('public'))

//Validar si estamos en desarrollo o en produccion
const config = configs[app.get('env')];

//Variable para el sitio web
app.locals.titulo = config.nombresitio;

//Muestra el año actual y genera la ruta
app.use((req, res, next)=> {
    res.locals.fechaActual = new Date().getFullYear();
    res.locals.ruta = req.path;
    return next();
});

//Ejecutamos el body parser
app.use(bodyParser.urlencoded({extended: true}))


//Cargar las rutas
app.use('/', router())

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '3000';
app.listen(port, host, ()=> console.log("El servidor esta funcionando"));