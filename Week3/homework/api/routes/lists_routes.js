const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to list',
    });
});

router.patch('/:listId', (req, res, next) => {
    const listId = req.params.listId;
    res.status(200).json({
        message: `Updated list with ID ${listId}`,
    });
});

router.delete('/:listId', (req, res, next) => {
    const listId = req.params.listId;
    res.status(200).json({
        message: `Deleted list with ID ${listId}`,
    });
});

module.exports = router;