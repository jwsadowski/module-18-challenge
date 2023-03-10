const Thought = require('../Models/Thought');
const userController = require('./userController');

console.log(Thought)

module.exports = {
    getThoughts(req, res) {
        console.log('route hit')
        Thought.find()
        .then((thoughts) => {
            console.log('thoughts', thoughts)
            res.json(thoughts) 
        })
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
           ? res.status(404).json({ message: 'No thought found with that ID'})
           : res.json(thought)
           )
           .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(500).json
        (err));
    },
    updateThought(req, res) {
        console.log(req.body)
        console.log(req.params)
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtid},
            { $set: req.body },
            { runValidators: true, new: true })
        
        .then((thought) => { 
            console.log(thought)
            res.json(thought)
            })
        .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findByIdAndUpdate(req.params.id, { $push: {reactions: req.body} })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.thoughtId)
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findByIdAndDelete(req.params.id), { $pull: {reactions: req.body} }
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    }
};
