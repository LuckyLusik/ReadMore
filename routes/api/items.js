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
    const { title, author } = req.body;
    Item.find({
        author: { $regex: `^${author[0]}$`, $options: 'i' },
        title: { $regex: `^${title}$`, $options: 'i' }
    }, function (err, results) {
        if(results.length) {
            res.status(400).json({ msg: 'This book already exists.' });
        } else {
            const upperCaseTitle = (title) =>
                {
                    let arrayOfLetters = title.split(' ');
                    var result = [];
                    for(let titleOne of arrayOfLetters){
                        result.push(titleOne.charAt(0).toUpperCase() + titleOne.slice(1).toLowerCase());
                    }
                    return result.join(' ');
                }
            const authorFull = [upperCaseTitle(author[0]), upperCaseTitle(author[1])];
            const newItem = new Item({
                author: authorFull,
                title: upperCaseTitle(req.body.title),
                userId: req.body.userId,
                votedIds: req.body.votedIds,
                imageURL: req.body.imageURL,
                description: req.body.description,
                rate: req.body.rate
            });
            newItem.save()
            .then(item => res.json(item));
        }
    })
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