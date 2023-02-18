
const router = require('express').Router();
const { Thought, Reaction, User } = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
router.get('/', async (req, res) => {
    try {
        const thought = await Thought.find();
        res.status(200).json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post('/', async (req, res) => {
    try {
        // 'thoughtText', 'username'
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({
            _id: req.body.userId
        },
            {
                $push: {
                    thoughts: thought._id
                }
            },
            {
                new: true
            })

        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOne({ "_id": req.params.thoughtId });
        res.status(200).json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//TODO: ROUTE TO UPDATE A THOUGHT
router.put('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            {
                // find the matching thoughtID
                _id: req.params.thoughtId
            },
            {
                // update anything from req.body
                $set: req.body
            },
            {
                // simple way to validate from model
                runValidators: true,
                new: true
            }
        );
        res.status(200).json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', async (req, res) => {
    try {
        // find the user & delete them
        const thought = await Thought.findOneAndDelete(
            {
                _id: req.params.thoughtId
            }
        );
        if (!thought) {
            res.status(400).json("No Thought With This ID.")
        }
        res.status(200).json(`Successfully deleted thought: ${thought._id}`);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        // then associate the reaction to the thought
        const user = await Thought.findOneAndUpdate(
            {
                // find the matching thoughtID
                _id: req.params.thoughtId
            },
            {
                // add the reaction
                $addToSet: {
                    reactions: req.body
                }
            },
            {
                // simple way to validate from model
                runValidators: true,
                new: true
            }
        );
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        // then associate the reaction to the thought
        const user = await Thought.findOneAndUpdate(
            {
                // find the matching thoughtID
                _id: req.params.thoughtId
            },
            {
                // remove the reaction
                $pull: {
                    reactions: {
                        reactionId: req.params.reactionId
                    }
                }
            },
            {
                // simple way to validate from model
                runValidators: true,
                new: true
            }
        );
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
})

module.exports = router;
