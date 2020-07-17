const Sequelize = require('sequelize');
const db = require('../config/db');


const Productos = db.define('producto', {
    id : {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement : true
    }, 
    codigo: {
        type: Sequelize.INTEGER,
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