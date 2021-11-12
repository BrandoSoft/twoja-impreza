const express = require('express');

const {verifyAccount} = require("./auth-utils");
const {findAndRender} = require("../data/database");
const {CATEGORY} = require("../data/checkboxList");
const homeRouter = express.Router();


homeRouter
    .get('/home', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)){
            //ZALOGOWANY
            findAndRender(req, res, {
                category: CATEGORY,
            });
        } else {
            //NIEZALOGOWANY
            findAndRender(req, res, {
                category: CATEGORY,
            });
        }
    })
    .post('/home', (req, res) => {
        console.log(req.body);
        if (verifyAccount(req.cookies.yourPartyToken)){
            //ZALOGOWANY
            findAndRender(req, res, {
                category: CATEGORY,
            });
        } else {
            //NIEZALOGOWANY
            findAndRender(req, res, {
                category: CATEGORY,
            });
        }
    })

    .get('/', (req, res) => {
        res.redirect("/home")
        }
    )


module.exports = {
    homeRouter,
};