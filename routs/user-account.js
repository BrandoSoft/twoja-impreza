const express = require('express');

const userAccountRouter = express.Router();

userAccountRouter
    .get('/panel-uzytkownika', (req, res) => {
        res.render('user-account/user-account', {
        })
    });

module.exports = {
    userAccountRouter,
}