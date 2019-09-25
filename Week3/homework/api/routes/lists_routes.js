const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    const listName = req.body.listName;
    const userIdReference = req.body.userIdReference;
    res.status(201).json({
        message: 'Handling POST requests to list',
        info: ` the list name is: ${listName} for the user with ID: ${userIdReference}`,
    });
});

router.delete('/:listId', (req, res, next) => {
    const listId = req.params.listId;
    res.status(200).json({
        message: `Deleted list with ID ${listId}`,
    });
});

router.patch('/:listId', (req, res, next) => {
    const listId = req.params.listId;
    const listReminder = req.body.listReminder;
    res.status(200).json({
        message: `Updated list with ID ${listId}`,
        info: ` the list has a reminder and it is: ${listReminder}`,
    });
});

module.exports = router;