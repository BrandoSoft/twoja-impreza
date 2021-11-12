const express = require('express');

const {verifyAccount} = require("../utils/auth-utils");
const {findAndRender} = require("../data/database");
const {CATEGORY} = require("../data/checkboxList");
const homeRouter = express.Router();


homeRouter
    .get('/home', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)){
            //ZALOGOWANY
            findAndRender(req, res, {
                category: CATEGORY,
                data: {},
            });
        } else {
            //NIEZALOGOWANY
            findAndRender(req, res, {
                category: CATEGORY,
                data: {},
            });
        }
    })
    .post('/home', (req, res) => {
        console.log(req.body);
        if (verifyAccount(req.cookies.yourPartyToken)){
            //ZALOGOWANY
            findAndRender(req, res, {
                category: CATEGORY,
                data: {},
            });
        } else {
            //NIEZALOGOWANY
            findAndRender(req, res, {
                category: CATEGORY,
                data: {},
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