const express = require('express');
const { getToken, verifyAccount, createAccount} = require("./auth-utils");

const userRouter = express.Router();

userRouter
    .post('/login', (req, res) => {
        getToken(req, res);
    })
    .post('/registry', (req, res) => {
        createAccount(req, res);
    })
    .get('/account', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)){
            //ZALOGOWANY
            res.render('sites/user-account/user-account', {})
        } else {
            //NIEZALOGOWANY
            res.render('sites/user-account/user-account', {})
        }
    })
    .get('/events', (req, res) => {
        res.render('sites/user-party/user-party', {
        })
    });

module.exports = {
    userRouter,
}