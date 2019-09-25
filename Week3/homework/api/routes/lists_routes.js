const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to list',
    });
});

router.patch('/:listId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated list!',
    });
});

router.delete('/:listId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted list!',
    });
});

module.exports = router;