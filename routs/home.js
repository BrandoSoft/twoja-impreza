const express = require('express');

const {PARTY_INFO} = require("../data/party-info");
const PartyList = require("../models/PartyList");
const homeRouter = express.Router();
const {handlebarsHelpers} = require('../utils/handlebars-helpers')

homeRouter
    .get('/', (req, res) =>{

        PartyList.find().lean()
            .then(data => {

                console.log(data)

                res.render( 'sites/home/home', {
                    info:data,
                })
            })
            .catch(error => console.log(error))

    });

module.exports = {
    homeRouter,
}