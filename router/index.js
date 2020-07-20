const express = require('express');
const { Router, urlencoded } = require('express');
const nodemailer = require('nodemailer');
const Sequelize = require('sequelize');
const Codigo = require('../models/codigo');
const validar = require('express-validator');

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
    const meetis = await Codigo.findOne({ 
        where :  { 
            codigo : { [Op.eq] :  '%' + codigo + '%' }
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

       let transporte = nodemailer.createTransport({
        host : emailConfig.host,
        port : emailConfig.port, 
        auth: {
            user: emailConfig.user, 
            pass: emailConfig.pass
        }
    });
    const info = await transporte.sendMail({
            from : 'Voleywebcamp <leovoley2@gmail.com.com>',
            to : opciones.usuario.email,
            subject: opciones.subject,
            html
            });
        res.send('recibido');
    });
    return router;
}