var mysql= require('mysql');
connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin",
    database:"healthapp"
});

module.exports=connection;
