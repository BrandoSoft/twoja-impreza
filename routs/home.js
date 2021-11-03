const express = require('express');

const {PARTY_INFO} = require("../data/party-info");
const PartyList = require("../models/PartyList");
const homeRouter = express.Router();
const {handlebarsHelpers} = require('../utils/handlebars-helpers')

homeRouter
    .get('/', (req, res) => {

        PartyList.find().lean()
            .then(data => {

                console.log(data)

                res.render('sites/home/home', {
                    info: data,
                })
            })
            .catch(error => console.log(error))

    })
    .get('/party/:id', (req, res) => {
        PartyList.findOne({
            _id: req.params.id,
        })
            .then(data =>{
                res.render('sites/home/party-info', {
                    data:data
                })
            })
    })

module.exports = {
    homeRouter,
}