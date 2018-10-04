const express = require('express');
var tedious = require('tedious');
var Connection = tedious.Connection;
var Request = tedious.Request;

const app = express();

var users = [];

//should be in own .config 
//but for the purpose of this test app I don't care
//also firewall should keep out unwanted connections
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
            throw err
        }
        else
        {
            //connection success
            console.log("Connected to Azure...")
            var request = new Request(
                "SELECT firstName, lastName \
                 FROM users \
                 WHERE isDeleted = 0",
                function(err, rowCount, rows) {
                    if(err) throw err

                    //empty user array in case of delete
                    users = []

                    //loop through Azure data to fill user array
                    for (let index in rows) {
                        
                        //write users to console for debugging 
                        console.log("loop " + index + ": " + rows[index][1].value + ", " + rows[index][0].value)//JSON.stringify(rows[index]))

                        users[index] = {

                            firstName:  rows[index][0].value,
                            lastName:   rows[index][1].value
                        };
                    }
                    res.json(users);
                }
            );
            connection.execSql(request);
        }
    });
})

//api/users lives at :5000/api/users
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
