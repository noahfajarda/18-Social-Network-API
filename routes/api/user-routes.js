
const router = require('express').Router();
const { User, Thought } = require("../../models")

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get('/', async (req, res) => {
    try {
        const user = await User.find().populate("thoughts");
        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//TODO - ROUTE THAT CREATES A NEW USER
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ "_id": req.params.userId });
        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            {
                // find the matching userID
                _id: req.params.userId
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
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
})

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete('/:userId', async (req, res) => {
    try {
        // find the user & delete them
        const user = await User.findOneAndDelete(
            {
                _id: req.params.userId
            }
        );
        if (!user) {
            res.status(400).json("No User With This ID.")
        }
        // delete the thoughts that belong to the user
        await Thought.deleteMany(
            {
                _id: {
                    // look for an id in the user's thought IDs
                    $in: user.thoughts
                }
            }
        )
        res.status(200).json(`Successfully deleted user: ${user.username}`);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put('/:userId/friends/:friendId', async (req, res) => {
    // i.e.: /steph/friends/klay
    try {
        const user = await User.updateOne(
            {
                // find the matching userID
                _id: req.params.userId
            },
            {
                // update anything from friends
                $addToSet: {
                    friends: req.params.friendId
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

    // first check if friend exists
    // then add ONLY the friend ID to the friends array in the specific user
})

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.update(
            {
                // find the matching userID
                _id: req.params.userId
            },
            {
                // delete friend with specific id 
                $pull: {
                    friends: req.params.friendId
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

module.exports = router;
