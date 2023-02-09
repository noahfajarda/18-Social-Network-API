
const router = require('express').Router();
const { User, Thought } = require("../../models")

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get('/', async (req, res) => {
    try {
        const user = await User.find();
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
router.get('/:userId', (req, res) => {

})

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            {
                _id: req.params.userId
            },
            {
                $set: req.body
            },
            {
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
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put('/:userId/friends/:friendId', (req, res) => {

})

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete('/:userId/friends/:friendId', (req, res) => {

});

module.exports = router;
