
const router = require('express').Router();
const { Thought, Reaction } = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
router.get('/', (req, res) => {
    Thought.find({}, (err, thoughts) => {
        res.status(200).json(thoughts)
    })
})

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post('/', async (req, res) => {
    try {
        // 'thoughtText', 'username'
        const thought = await Thought.create(req.body);
        res.status(200).json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', (req, res) => {

})

//TODO: ROUTE TO UPDATE A THOUGHT
router.put('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(req.body);
        res.status(200).json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', (req, res) => {

});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', (req, res) => {

});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', (req, res) => {

})

module.exports = router;
