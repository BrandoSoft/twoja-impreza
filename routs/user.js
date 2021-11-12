const express = require('express');
const {verifyAccount, createAccount, checkUserInDB, logoutUser, verifyLoginAndMail} = require("./auth-utils");
const PartyList = require("../models/PartyList");

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
                    console.log('pierwszy if', result)
                    res.send('jest juz uzytkownik')
                } else {
                    console.log('2 if', result)
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
                {followers: 'fea20954992bd5b838fe39af1dd456616afd34c2446525a6a2d6c94dfce60915190638...' }
            ).lean()
                .sort({date: 1})
                .then(data => {
                    res.render('sites/user-party/user-party', {
                        info: data,
                    })
                })
                .catch(error => console.error(error))


        // followers: 'fea20954992bd5b838fe39af1dd456616afd34c2446525a6a2d6c94dfce60915190638...' } }

        // res.render('sites/user-party/user-party', {})
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