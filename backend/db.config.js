var  mysql = require('mysql');

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'mydb',
    database:'hiring_portal_db',
});

db.connect(function(err){
    if(err){
        console.log('DB error', err);
        throw err;
       
    }
  });
  

module.exports = db;