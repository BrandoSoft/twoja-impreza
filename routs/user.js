const express = require('express');
const jwt = require("jsonwebtoken");


const PartyList = require("../models/PartyList");

const {verifyAccount, createAccount, checkUserInDB, logoutUser, verifyLoginAndMail} = require("../utils/auth-utils");


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
    .post('/register', async (req, res) => {
        if (req.body.password === req.body.password2) {
            const info = verifyLoginAndMail(req, res);

            info.then(function (result) {
                if (!(result.length < 1)) {

                    res.send('jest juz uzytkownik')
                } else {
                    createAccount(req, res)
                }
            })
        } else {
            res.send('hasla rozne od siebie')
        }
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
            res.render('sites/user-account/register-login-form', {})
        }
    })

    .get('/events', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)) {
            //ZALOGOWANY


            PartyList.find(
                {followers: jwt.decode(req.cookies.yourPartyToken).idHash }
            ).lean()
                .sort({date: 1})
                .then(data => {
                    res.render('sites/user-party/user-party', {
                        info: data,
                        follow: false,
                    })
                })
                .catch(error => console.error(error))
            }
else
{
    //NIEZALOGOWANY
    res.render('sites/user-party/event-login', {})
}

})
.
post('/login', (req, res) => {
    checkUserInDB(req, res, '/user');
})

    .post('/events/login', (req, res) => {

        checkUserInDB(req, res, '/user/events');
    })

module.exports = {
    userRouter,
}