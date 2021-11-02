const express = require('express');

const {PARTY_INFO} = require("../data/party-info");
const homeRouter = express.Router();
const eventsTable = require("./eventsTable")

homeRouter
    .get('/', (req, res) =>{
        res.render( 'sites/home/home', {
            info:PARTY_INFO,
            events: eventsTable,
        })
    });

module.exports = {
    homeRouter,
}