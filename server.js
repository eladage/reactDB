const express = require('express');
const app = express();
const mysql = require('mysql');
var users = [];

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'user'
});


db.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')


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