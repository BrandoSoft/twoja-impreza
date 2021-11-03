const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { database_pass, database_name } = require('../config')


const PartyList = require("../models/PartyList");

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const addRouter = express.Router();


// Database url
const url = `mongodb+srv://${database_name}:${database_pass}@cluster0.xll9q.mongodb.net/twojaImprezaDatabase?retryWrites=true&w=majority`;

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

    const body = req.body;

    const Data = new PartyList(body)


    Data.save()
       .then(()=>{
        res.render('sites/add/added', body)

   });

})


module.exports = {
    addRouter,
}