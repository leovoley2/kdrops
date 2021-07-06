const express = require('express');
const router = express.Router();


const homeController = require('../controller/homeController');



module.exports = function() {
    router.get('/', homeController.proyectoHome);
    router.get('/productos', homeController.productoBiotin);
    router.get('/biotin', homeController.biotin);
    router.get('/breat', homeController.productoBreat);
    router.get('/glutex', homeController.productoGlutex);
    router.get('/silver', homeController.productoSilver);
    router.get('/clasic', homeController.productoClasic);
    router.get('/musclet', homeController.productoMusclet);
    router.get('/nosotros', homeController.nosotros);
    router.get('/promociones', homeController.promociones);
    router.get('/preguntas', homeController.preguntas);

   

    return router;
}