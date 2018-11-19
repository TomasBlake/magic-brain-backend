const handleRegister = (req, res, db, bcrypt) => {
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
}

module.exports = {
    handleRegister: handleRegister
};