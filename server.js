const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const app = express();
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'ForensicScience2021',
      database : 'smart-brain'
    }
  });


app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send("success");
});

app.post('/signin', signin.handleSignin(knex, bcrypt));

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)});

app.put('/image', (req, res) => {image.handleImage(req, res, knex)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});





/*
/ --> res = this is working
/signin --> POST res = success/fail
/register --> POST res = user(object)
/profile/;userId --> GET = user
/image --> PUT --> user

*/