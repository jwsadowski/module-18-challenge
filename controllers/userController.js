const User = require('../Models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID'}) 
          : res.json(user)
        ) 
        .catch((err) => res.status(500).json(err));  
    },
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        console.log(req.body)
        User.findOneAndUpdate(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        console.log(req.body)
        User.findOneAndDelete(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    }
};