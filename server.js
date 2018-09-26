const express = require('express');
var tedious = require('tedious');
var Connection = tedious.Connection;
var Request = tedious.Request;

const app = express();

const mssql = require('mssql');

var users = [];
var test = [];

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


app.get('/api/users', (req, res) => {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if(err) {
            callback(err);
        }
        else
        {
            console.log("Connected to Azure...")
            var request = new Request(
                "SELECT firstName, lastName FROM users Where firstName is not null AND lastName is not null",
                function(err, rowCount, rows) {
                    if(err) throw err
                    
                    //res.send(JSON.stringify(rows))
                    console.log(JSON.stringify(rows))
                    console.log(rows)
                    //for (let index = 0; index < rows.length; index++) {
                    for (let index in rows) {
                        //test[index] = rows[index]



                        console.log("loop: " + index + " " + rows[index].value)
                        users[index] = {
                            //id:         rows[index].id,
                            firstName:  rows[index].firstName,
                            lastName:   rows[index].lastName
                            //sex:        rows[index].sex,
                            //age:        rows[index].age
                        };
                        console.log(users[index].firstName)
                    }
                    res.json(users);
                }
            );
            connection.execSql(request);
        }
    });
})

console.log(test[0]);

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
