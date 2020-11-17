const mysql = require('mysql');
console.log('Conectando a la base de datos');

var conection = mysql.createConnection({
    host: '204.2.63.54',
    port: '15388',
    user: 'andres',
    password: '123andres',
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
