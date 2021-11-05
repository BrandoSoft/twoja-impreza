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

    .post('/test', (req, res) => {
        console.log(req.body.date1.dateInstance)
        console.log(req.body.date2.dateInstance)

        PartyList.find({date: {$gte: new Date(req.body.date1.dateInstance), $lte: new Date(req.body.date2.dateInstance)}}).lean()
            .then(data => {
                res.render('sites/home/home', {
                    info: data,
                })
            })
            .catch(error => console.error(error))
    })


module.exports = {
    homeRouter,
}