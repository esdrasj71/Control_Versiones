const express= require('express');
const mysql= require('mysql');

const bodyParser=require('body-parser');

const PORT = process.env.PORT || 3000;

const app=express();

app.use(bodyParser().json());

//mysql
const connection=  mysql.createConnection({
    host     : 'localhost',
    user     : 'localhost',
    password : '',
    database : 'GG'
});
