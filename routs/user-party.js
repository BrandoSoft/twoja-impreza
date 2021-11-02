const express = require('express');

const userPartyRouter = express.Router();

userPartyRouter
    .get('/twoje-imprezy', (req, res) => {
        res.render('sites/user-party/user-party', {
        })
    });

module.exports = {
    userPartyRouter,
}