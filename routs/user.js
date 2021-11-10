const express = require('express');
const {verifyAccount, createAccount, checkUserInDB, logoutUser} = require("./auth-utils");

const userRouter = express.Router();

userRouter
    .get('/', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)) {
            //ZALOGOWANY
            res.render('sites/user-account/user-account', {})
        } else {
            //NIEZALOGOWANY
            res.render('sites/user-account/register-login-form', {})
        }
    })
    .post('/register', (req, res) => {
        createAccount(req, res);
    })

    .post('/login', (req, res) => {

        checkUserInDB(req, res, '/user');
    })
    .get('/logout', (req, res) => {
        logoutUser(req, res);
    })


    .get('/account', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)) {
            //ZALOGOWANY
            res.render('sites/user-account/user-account', {})
        } else {
            //NIEZALOGOWANY
            res.render('sites/user-account/user-account', {})
        }
    })

    .get('/events', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)) {
            //ZALOGOWANY
            res.render('sites/user-party/user-party', {})
        } else {
            //NIEZALOGOWANY
            res.render('sites/user-party/event-login', {})
        }

    })

    .post('/events/login', (req, res) => {

        checkUserInDB(req, res, '/user/events');
    })

module.exports = {
    userRouter,
}