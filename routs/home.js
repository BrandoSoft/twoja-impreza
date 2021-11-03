const express = require('express');

const {PARTY_INFO} = require("../data/party-info");
const homeRouter = express.Router();

homeRouter
    .get('/home', (req, res) =>{
        res.render( 'sites/home/home', {
            info:PARTY_INFO,
        })
    })
    .get('/', (req, res) =>{
    res.redirect("/home")
});

module.exports = {
    homeRouter,
}