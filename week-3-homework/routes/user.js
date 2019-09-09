var express = require('express');
var router = express.Router();
const usersRepo = require('../modules/usersRepository');

// In this file we will define all possible routes related with mony transfer
// A get request to country will give you the list of all users
router.get('/user', async (req, res) => {
    try {
        const result = await usersRepo.getUsers();
        res.render('users', { "userList": result });
    } catch(e) {
        throw e;
        res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
    }
});

// This is the first request, we ask the form to be rendered
router.get('/user/addTransfer', function (request, response) {
    return response.render('form-transfer-post');
});

/*
This other way of executing would have a problem when an error interrupts the sequence between 
the two updates 
router.post('/user/submit-form-transfer-dangerous', async (req, res) => {
    try { 
    var amountToTransfer = req.body.transferAmount ;
    console.log(amountToTransfer);
    let rowsModified = await usersRepo.addMoney(1, amountToTransfer);
    throw err;
    rowsModified = await usersRepo.addMoney(2, -amountToTransfer);
    console.log(rowsModified.affectedRows + ' rows modified');
    } catch (e) { 
       console.info('Doing nothing' ); // do nothing
    }
    res.redirect('users'); 
}); */

// this is called when the submit button is pressed. 
// since we are using transactions we are ready to have a problem between the two statements
router.post('/user/submit-form-transfer-post', async (req, res) => { 
    try { 
    var amountToTransfer = req.body.transferAmount ;
    rowsModified = await usersRepo.transferWithTransaction(2, 1, amountToTransfer);
    } catch (e) { 
       throw e;
    }
    res.redirect('../user/'); 
}); 

module.exports = router;