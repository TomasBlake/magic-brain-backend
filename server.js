const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const getAllUsers = require('./controllers/getAllUsers');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Antolos1125',
        database: 'smart_brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.listen(3000, () => {
    console.log('app is running on port 3000');
});

app.get('/', (req, res) => { getAllUsers.handleGetAllUsers(req, res, db)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.post('/signin', signin.handleSignin(db, bcrypt)); //advanced syntax
app.put('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db)});

/*
API planning
/ --> res = this is working 
/signin --> POST = success/fail
/register --> POST = user
/profile/:id --> GET = user
/image --> PUT --> user  
*/



