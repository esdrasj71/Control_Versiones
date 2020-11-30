const mysql = require('mysql');
console.log('Conectando a la base de datos');

var conection = mysql.createConnection({
    host: 'mysql-15388-0.cloudclusters.net',
    port: '15388',
    user: 'andres',
    password: '123andres',
    database: 'proyectogg'
})


module.exports = conection;

// el cotejamiento: utf8_spanish2_ci
