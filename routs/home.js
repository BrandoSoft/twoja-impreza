const express = require('express');

const {verifyAccount} = require("./auth-utils");
const {findAndRender} = require("../data/database");
const homeRouter = express.Router();


homeRouter
    .get('/home', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)){
            //ZALOGOWANY
            findAndRender(req, res, {})
        } else {
            //NIEZALOGOWANY
            findAndRender(req, res, {})
        }
    })

    .get('/', (req, res) => {
            if (verifyAccount(req.cookies.yourPartyToken)) {
                //ZALOGOWANY
                res.redirect("/home")
            } else {
                //NIEZALOGOWANY
                res.redirect("/home")
            }
        }
    )
    .get('/', (req, res) => {
        res.redirect("/home")

    })


module.exports = {
    homeRouter,
};