const handleSignin = (db, bcrypt) => (req, resp) => { // advanced syntax
    const {email, password} = req.body;
    
    db('login').join('users','users.email', '=', 'login.email').where('users.email', email)
    .select('*')
    .then(response => {
        if (response.length) {
            bcrypt.compare(password, response[0].hash, function(err, res){
                if (res) {
                    resp.status(200).json(response[0]);
                } else {
                    resp.status(404).json('Wrong credentials');
                }  
            });    
        } else {
            resp.status(404).json('Wrong credentials');
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
        
    }

module.exports = {
    handleSignin //ES6 syntax
}