'use strict';
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const listController = require('../list/listController');

router.post('/', listController.createList);

router.delete('/:listId', listController.deleteList);

router.patch('/:listId', listController.addReminder);

module.exports = router;