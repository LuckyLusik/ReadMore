const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create an Item
// @access  Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        author: req.body.author,
        title: req.body.title,
        userId: req.body.userId,
        votedIds: req.body.votedIds,
        imageURL: req.body.imageURL,
        description: req.body.description,
        rate: req.body.rate
    });
    newItem.save()
    .then(item => res.json(item));
});

// @route   UPDATE api/items/:id
// @desc    UPDATE an Item
// @access  Private
router.put('/:id', auth, (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, {new: false, useFindAndModify: false}, () => {})
        .then((updatedBook) => res.json(updatedBook))
        .catch(err => res.status(404).json({success: false}));
});

// @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;