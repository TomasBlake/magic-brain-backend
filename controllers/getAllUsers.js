const handleGetAllUsers = (req, res, db) => {
    db.select('*').from('users')
    then(users => {
        res.status(200).json(users);
    });
    
}

module.exports = {
    handleGetAllUsers: handleGetAllUsers
};