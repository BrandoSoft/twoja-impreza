const express = require('express');

const userRouter = express.Router();

userRouter
    .get('/account', (req, res) => {
        res.render('sites/user-account/user-account', {
        })
    })
    .get('/party', (req, res) => {
        res.render('sites/user-party/user-party', {
        })
    });

module.exports = {
    userRouter,
}