const mysql = require('mysql');
console.log('Conectando a la base de datos');

var conection = mysql.createConnection({
    host: 'mysql-15391-0.cloudclusters.net',
    port: '15391',
    user: 'julio',
    password: 'TFVYO12N',
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
