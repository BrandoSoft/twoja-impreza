const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const urlq = require('url');

const PartyList = require("../models/PartyList");

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const addRouter = express.Router();

const login = process.env.DBNAME;
const pass = process.env.DBPASS;

// Database url
const url = `mongodb+srv://${login}:${pass}@cluster0.xll9q.mongodb.net/twojaImprezaDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(console.log("Mongo DB connected :)"))
    .catch(err => console.log(err));

addRouter
    .get('/dodaj-ogloszenie', (req, res) => {
        res.render('sites/add/add', {})
    })

    .get('/added', (req, res) => {
        res.render('sites/add/added', {})
    })

   .post('/add-party-to-db', urlencodedParser, (req, res) => {

    const {name, description, date, time, place, organizer} = req.body;

    const Data = new PartyList({
        name, description, date, time, place, organizer,
    })
       console.log(req.body)

    Data.save().then(()=>{
        res.render('sites/add/added', {
            name, description, date, time, place, organizer
        })

   });

})


module.exports = {
    addRouter,
}