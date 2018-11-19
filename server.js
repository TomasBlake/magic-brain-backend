const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Antolos1125',
        database: 'smart_brain'
    }
});

/*db.select('*').from('users').then(data => {
    console.log(data)
});*/

/*const testingDatabase = {
    users: [{
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: '123456',
        entries: 0,
        joined: new Date()
    },{
        id: '225',
        name: 'Denny',
        email: 'denny@gmail.com',
        password: '123456*',
        entries: 0,
        joined: new Date()
    }],
    login: [
        {
            id: '',
            password: '',
            email: '',
        }
    ]
};*/


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.listen(3000, () => {
    console.log('app is running on port 3000');
});

app.get('/',(req, res) => {
    res.status(200).json(testingDatabase.users);
});

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    
    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email:email
            })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(users => {
                res.status(201).json(users[0]);
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => {
            res.status(400).json('unable to registrate')
        });
    })
        
    });
        /*db('login').insert({
            hash: hash,
            email: email
        }).then(console.log);
    });
    db('users')
    .returning('*')
    .insert({
        name: name,
        email: email, 
        joined: new Date()
    }).then(user => {
        res.status(201).json(user[0]);
    }).catch(err => {
        res.status(400).json('Unable to register');
    });*/
});

app.post('/signin', (req, resp) => {
const {email, password} = req.body;

db('users').join('login','users.email', '=', 'login.email').where('users.email', email)
.select('*')
.then(response => {
    if (response.length) {
        bcrypt.compare(password, response[0].hash, function(err, res){
            if (res) {
                resp.status(200).json(response[0]);
            } else {
                resp.status(404).json('Any relation did not find');
            }  
        });    
    } else {
        resp.status(404).json('Any relation did not find');
    }
})
.catch(err => {
    console.log(err);
})

/*bcrypt.compare(password,, function(err, res) {

});

db('users').join('login', 'users.email', '=', 'login.email')
.where({email: email}).returning('*')*/

    /*// Load hash from your password DB.
    bcrypt.compare(req.body.password, testingDatabase.login[1].password, function(err, res) {
    // res == true
    console.log('[GUESS1]', res)
    });
    bcrypt.compare("veggies", testingDatabase.login[1].password, function(err, res) {
    // res = false
    console.log('[GUESS2]', res)
    });
    if (req.body.email === testingDatabase.users[0].email &&
        req.body.password === testingDatabase.users[0].password) {
        res.status(200).json('OK');    
    } else {
        res.status(403).json('Invalid email');    
    }

    if (req.body.email === testingDatabase.users[0].email &&
        req.body.password === testingDatabase.users[0].password) {
        res.status(200).json(testingDatabase.users[0]);    
    } else {
        res.status(403).json('Invalid email')
    }*/
    
});

app.put('/profile/:id', (req, res) => {
    const {id} = req.params;
    db.select('*').from('users').where({id}) // ES6 pokud má property i value stejné označení
    .then(users => {
        if (users.length) {
            res.status(200).json(users[0]);    
        } else {
            res.status(404).json('user not found');
        }
        
    }).catch(err => {
        res.status(400).json(err);
    })
    
    /*if (testingDatabase.users.some(user => {
        return user.id === id;
    })) {
        const user = testingDatabase.users.find(user => {
            return user.id === id;
        })
        console.log('[PROFILE/RESPONSE]', user);
        res.status(200).json(user);
    } else {
        res.status(404).json('Not found');
    }*/
});

app.put('/image',(req, res) => {
    const {id} = req.body;
    db('users').returning('*').where({id}).increment('entries', 1)
    .then(users => {
        console.log(users);
        if (users.length) {
            res.status(200).json(users[0]);
        } else {
            res.status(404).json('user not found');
        }
    }).catch(err => {

    });
    
    /*if(testingDatabase.users.some(user => {
        return user.id === id})) {
        const user = testingDatabase.users.find(user => user.id === id);
        const indexOfUser = testingDatabase.users.findIndex(user => user.id === id)
        console.log('[USER]',user)
        user.entries++;
        console.log('[USER]',user)
        testingDatabase.users.splice(indexOfUser,1,user);
        res.status(200).json(user);
    } else {
        res.status(404).json('User not found');
    }*/
})

/*
API planning
/ --> res = this is working 
/signin --> POST = success/fail
/register --> POST = user
/profile/:id --> GET = user
/image --> PUT --> user  
*/



