const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const testingDatabase = {
    users: [{
        id: 123,
        name: 'John',
        email: 'john@gmail.com',
        password: '123456',
        entries: 0,
        joined: new Date()
    },{
        id: 225,
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
};


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
        testingDatabase.login.push({
           id: 522,
           email: email,
           password: hash 
        });
        console.log(testingDatabase.login);
    });
    const newUser = {
        id: 183,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    }
    testingDatabase.users.push(newUser);
    res.status(201).json(testingDatabase.users[testingDatabase.users.length-1]);
});

app.post('/signin', (req, res) => {
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
    }*/

    if (req.body.email === testingDatabase.users[0].email &&
        req.body.password === testingDatabase.users[0].password) {
        res.status(200).json('OK');    
    } else {
        res.status(403).json('Invalid email')
    }
    
});

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    if (testingDatabase.users.some(user => {
        return user.id === Number(id);
    })) {
        const user = testingDatabase.users.find(user => {
            return user.id === Number(id);
        })
        res.status(200).json(user);
    } else {
        res.status(404).json('Not found');
    }
});

app.put('/image',(req, res) => {
    const {id} = req.body;
    if(testingDatabase.users.some(user => {
        return user.id === Number(id)})) {
        const user = testingDatabase.users.find(user => user.id === Number(id));
        const indexOfUser = testingDatabase.users.findIndex(user => user.id === Number(id))
        console.log('[USER]',user)
        user.entries++;
        console.log('[USER]',user)
        testingDatabase.users.splice(indexOfUser,1,user);
        res.status(200).json(testingDatabase.users);
    } else {
        res.status(404).json('User not found');
    }
   
})

/*
API planning
/ --> res = this is working 
/signin --> POST = success/fail
/register --> POST = user
/profile/:id --> GET = user
/image --> PUT --> user  
*/



