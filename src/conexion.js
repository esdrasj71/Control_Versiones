const mysql = require('mysql');
console.log('Conectando a la base de datos');

var conection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
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
