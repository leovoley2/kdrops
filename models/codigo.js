const Sequelize = require('sequelize');
const db = require('../config/db');


const Productos = db.define('producto', {
    id : {
        type: Sequelize.STRING, 
        primaryKey: true,
        autoIncrement : true
    }, 
    codigo: {
        type: Sequelize.STRING(8),
        allowNull: false,
        validate : {
            notEmpty : {
                msg : 'El codigo no puede ir vacio'
            }
        }
    },
}, {
    timestamps: false
});
module.exports = Productos;