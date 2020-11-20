const mysql = require('mysql');
console.log('Conectando a la base de datos');

var conection = mysql.createConnection({
    host: 'mysql-15390-0.cloudclusters.net',
    port: '15390',
    user: 'kevin',
    password: '49853095',
    database: 'proyectogg'
})


module.exports = conection;

// el cotejamiento: utf8_spanish2_ci
