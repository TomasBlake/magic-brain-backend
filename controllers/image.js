const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').returning('*').where({id}).increment('entries', 1)
    .then(users => {
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
}

module.exports = {
    handleImage: handleImage
};