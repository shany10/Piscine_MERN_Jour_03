const express = require('express');
const app = express();
const config = require('../config.js');
const fs = require('fs');
var bodyParser = require('body-parser');
app.use(express.json());   
app.use(express.urlencoded());

const { MongoClient } = require("mongodb");
const { isStringObject } = require('util/types');
const uri = "mongodb+srv://shany:shany@cluster0.1xqbrsv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function add_user_to_db(email , password) {
    try {
      const database = client.db('mern-pool');
      const user = database.collection('users');
      // Query for a movie that has the title 'Back to the Future'
    

      const query = { email: email , password: password};
      await user.insertOne(query);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  
app.set('view engine', 'ejs');

app.route('/register')
  .get((req, res) => {
    res.render('register')
  })
  .post((req, res) => {
    const body = req.body;
    if(body.pwd == body.confirm_pwd) {
        add_user_to_db(body.email , body.pwd);
    }
    res.render('home', {email: body.email} )
  })



// app.post('/register', (req, res) => {

//     console.log(req.query);
//     res.render('register');
// });

app.get('/login', (req, res) => {
    res.render('login');
})


app.listen(config.port, () => {
    
});