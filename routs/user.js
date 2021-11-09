const express = require('express');
const {getToken, verifyAccount, createAccount, checkUserInDB} = require("./auth-utils");

const userRouter = express.Router();

userRouter
    .get('/', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)) {
            //ZALOGOWANY
            res.render('sites/user-account/register-login-form', {})
        } else {
            //NIEZALOGOWANY
            res.render('sites/user-account/register-login-form', {})
        }
    })
    .post('/register', (req, res) => {
        createAccount(req, res);
    })

    .post('/login', (req, res) => {
        // getToken(req, res);
        checkUserInDB(req, res);
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
        res.render('sites/user-party/user-party', {})
    });

module.exports = {
    userRouter,
}