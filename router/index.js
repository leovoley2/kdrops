const express = require('express');
const { Router, urlencoded } = require('express');
const nodemailer = require('nodemailer');
const Sequelize = require('sequelize');
const Codigo = require('../models/codigo');
const validar = require('express-validator');
const fs = require('fs');
const util = require('util');
const ejs = require('ejs');


const Op = Sequelize.Op;
const moment = require('moment');

const router = express.Router();

module.exports = function() {
    router.get('/', (req, res) => {
        res.render('home')
    });

    router.get('/biotin', (req, res) => {
        res.render('biotin')
    });

    router.get('/breast', (req, res) => {
        res.render('breast')
    });

    router.get('/classic', (req, res) => {
        res.render('classic')
    });

    router.get('/glutex', (req, res) => {
        res.render('glutex')
    });

    router.get('/silver', (req, res) => {
        res.render('silver')
    });

    router.get('/muscle', (req, res) => {
        res.render('muscle')
    });

    router.get('/contacto', (req, res) => {
        res.render('contacto')
    });

    router.get('/busqueda', async (req, res) => {
        // leer datos de la url 
    const { codigo } = req.query;
   
 
    // filtrar los meetis por los terminos de busqueda
    const meetis = await Codigo.findAll({ 
        where :  { 
            codigo : { [Op.iLike] :  '%' + codigo + '%' }
        }
    });

    // pasar los resultados a la vista
    res.render('busqueda', {
        nombrePagina : 'Resultados Búsqueda',
        meetis, 
        moment
    })
    })

    router.post('/send-email', async (req, res) => {

         // compilarlo
    const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));

        const { name, email, phone, message} = req.body

        contentHTML = `
            <h1>User information</h1>
            <ul>
                <li>Username: ${name}</li>
                <li>User email: ${email}</li>
                <li>Phone: ${phone}</li>
            </ul>
            <p>${message}</p>
        `;

        let transport = nodemailer.createTransport("SMTP",{
            service: "Gmail",
            auth: {
                user: 'leovoley2@gmail.com',
            pass: 'Italia_15' 
            }
        });
    // configurar las opciones del email
    const opcionesEmail = {
        from : 'kdrops oficial <leovole2@gmail.com>',
        to : req.body.email,
        subject: req.body.name,
        phone: req.body.phone,
        message: req.body.message
    }
     // enviar el mail
 SMTPTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
        res.render('errorMensaje');
    }else{
       console.log("Message sent"); 
       res.render('enviado');
    }
})
    });
    return router;
}