const express = require('express');

const {PARTY_INFO} = require("../data/party-info");
const homeRouter = express.Router();

homeRouter
    .get('/', (req, res) =>{
        res.render( 'sites/home/home', {
            info:PARTY_INFO,
        })
    });

module.exports = {
    homeRouter,
}