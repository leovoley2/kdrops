const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');
const fs = require('fs');
const util = require('util');
const ejs = require('ejs');

let transport = nodemailer.createTransport({
    host : emailConfig.host,
    port : emailConfig.port, 
    auth: {
        user: emailConfig.user, 
        pass: emailConfig.pass
    }
});

exports.enviarEmail = async (opciones) => {
    console.log(opciones);

    // compilarlo
    const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));
    
    // crear el HTML
    const html = compilado({ url : opciones.url });

    // configurar las opciones del email
    const opcionesEmail = {
        from : 'kdrops oficial <leovole2@gmail.com>',
        to : opciones.usuario.email,
        subject: opciones.subject,
        html
    }

    // enviar el mail
    const sendEmail = util.promisify(transport.sendMail, transport);
    return sendEmail.call(transport, opcionesEmail);
}