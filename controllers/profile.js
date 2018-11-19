const handleProfile = (req, res, db) => {
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
}

module.exports = {
    handleProfile: handleProfile
};