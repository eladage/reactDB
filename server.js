const express = require('express');
var tedious = require('tedious');
var Connection = tedious.Connection;
var Request = tedious.Request;

const app = express();
const mysql = require('mysql');
const mssql = require('mssql');
var users = [];
var xUsers = [];
var dbstatus = "";
var test = [];

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'user'
});


var config = {
    userName: 'eladage',
    password: 'secure123!',
    server: 'xofflinesync.database.windows.net',
    options: {
        database: 'xUserDB',
        encrypt: true,
        rowCollectionOnRequestCompletion: true
    }
}


app.get('/api/xUsers', (req, res) => {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if(err) {
            callback(err);
        }
        else 
        {
            console.log("Connected to Azure...")
            var request = new Request(
                "SELECT * FROM users",
                function(err, rowCount, rows) {
                    if(err) throw err
                    
                    
                    //console.log(rows)
                    for (let index = 0; index < rows.length; index++) {
                        test[index] = rows[index]
                        
                        xUsers[index] = {
                            id:         rows[index].id, 
                            firstName:  rows[index].firstName,
                            lastName:   rows[index].lastName,
                            sex:        rows[index].sex,
                            age:        rows[index].age
                        };
                        console.log(xUsers[index].firstName)
                    }

                    res.json(xUsers);
                    
                }
            );
            connection.execSql(request);
        }
    });
})

console.log(test[0]);

db.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
    dbstatus = "connected."
    
    app.get('/api/users', (req, res) => {
        db.query('SELECT * FROM user', function(err, results) {
            if (err) throw err
            for (let index = 0; index < results.length; index++) {
                users[index] = {
    
                    id:         results[index].id, 
                    firstName:  results[index].firstName,
                    lastName:   results[index].lastName,
                    sex:        results[index].sex,
                    age:        results[index].age
                }
                
                //console.log(users[index].id)

                // console.log(results[index].id)
                // console.log(results[index].firstName)
                // console.log(results[index].lastName)
                // console.log(results[index].sex)
                // console.log(results[index].age)
                // console.log("\n")
                
            }

            res.json(users);
        
        })

    })
})


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);