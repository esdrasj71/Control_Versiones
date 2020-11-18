const mysql = require('mysql');
console.log('Conectando a la base de datos');

var conection = mysql.createConnection({
    host: '172.107.32.129',
    port: '15390',
    user: 'kevin',
    password: '49853095',
    database: 'proyectogg'
})


conection.connect(function(err){
    if(err){
        console.log('Error de conexion'+ err.stack);
    }else{
        console.log('conexion exitosa');
    }
})
    
module.exports = conection;
// el cotejamiento: utf8_spanish2_ci
