const express = require('express');
const bodyParser = require('body-parser');
const PartyList = require("../models/PartyList");
const { connectDataBase } = require('../data/database')
const mongoose = require("mongoose");

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const eventsRouter = express.Router();


// Database url
connectDataBase();

eventsRouter
    .get('/add', (req, res) => {
        res.render('sites/add/add', {})
    })

    .get('/added', (req, res) => {
        res.render('sites/add/added', {})
    })

   .post('/add-to-db', urlencodedParser, (req, res) => {
    const Data = new PartyList(req.body)
    Data.save()
       .then(()=>{ res.render('sites/add/added', req.body)})
        .catch(error => console.log(error))
   })

   .get('/get-event-id/:id', (req, res) => {
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
    eventsRouter,
}