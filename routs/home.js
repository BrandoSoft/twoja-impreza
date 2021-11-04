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

    .post('/test2', (req, res) => {

        PartyList.find({name: "seedot"}).lean()
            .then(data => {
                res.render('sites/home/home', {
                    info: data,
                })
            })
            .catch(error => console.error(error))

    })
    .post('/test', (req, res) => {


        PartyList.find({name: "seedot"}).lean()
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