const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');
const fs = require('fs');
const util = require('util');
const ejs = require('ejs');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

let transport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: 'leovoley2@gmail.com',
    pass: 'Italia_15' 
    }
});

exports.enviarEmail = function (res, req) {

    // compilarlo
    const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));
    
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
}