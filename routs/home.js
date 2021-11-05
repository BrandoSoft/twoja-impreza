const express = require('express');

const PartyList = require("../models/PartyList");
const homeRouter = express.Router();


homeRouter
    .get('/home', (req, res) => {
        PartyList.find().lean()
            .then(data => {
                res.render('sites/home/home', {
                    info: data,
                })
            })
            .catch(error => console.error(error))
    })

    .get('/', (req, res) => {
        res.redirect("/home")
    })


module.exports = {
    homeRouter,
}