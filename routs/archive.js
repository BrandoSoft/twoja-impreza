const express = require('express');
const {verifyAccount} = require("../utils/auth-utils");

const archiveRouter = express.Router();

archiveRouter
    .get('/events', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)){
            //ZALOGOWANY
            res.render('sites/archive/archive', {})
        } else {
            //NIEZALOGOWANY
            res.render('sites/archive/archive', {})
        }
    })

module.exports = {
    archiveRouter,
}