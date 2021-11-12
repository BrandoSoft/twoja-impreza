const express = require('express');
const bodyParser = require('body-parser');
const PartyList = require("../models/PartyList");
const jwt = require("jsonwebtoken");

const {verifyAccount} = require("../utils/auth-utils");


const {connectDataBase} = require('../data/database')
const mongoose = require("mongoose");

const urlencodedParser = bodyParser.urlencoded({extended: false})

const eventsRouter = express.Router();

// Database url
connectDataBase();

eventsRouter
    .get('/add', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)) {
            //ZALOGOWANY
            res.render('sites/add/add', {})
        } else {
            //NIEZALOGOWANY
            res.render('sites/add/add', {})
        }
    })

    .get('/added', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)) {
            //ZALOGOWANY
            res.render('sites/add/added', {})
        } else {
            //NIEZALOGOWANY
            res.render('sites/add/added', {})
        }
    })

    //Do metod poniżej nie dodawałem weryfikacji
    .post('/add-to-db', urlencodedParser, (req, res) => {
        const Data = new PartyList(req.body)
        Data.save()
            .then(() => {
                res.render('sites/add/added', req.body)
            })
            .catch(error => console.log(error))
    })

    .post('/add-to-db', urlencodedParser, (req, res) => {
        const Data = new PartyList(req.body)
        Data.save()
            .then(() => {
                res.render('sites/add/added', req.body)
            })
            .catch(error => console.log(error))
    })

    .get('/get-event-id/:id', (req, res) => {
        PartyList.findOne({
            _id: req.params.id,
        })
            .then(data => {
                res.render('sites/home/party-info', {
                    data: data
                })
            })
    })


    .get('/add-follower/:id', (req, res) => {
        PartyList.updateOne(
            {_id: req.params.id},
            {$addToSet: {followers: jwt.decode(req.cookies.yourPartyToken).idHash}},
        ).then(data => console.log(data))
            .catch(err => console.log(err))
        res.redirect('/')

    })
    .get('/remove-follower/:id', (req, res) => {
        PartyList.updateOne(
            {_id: req.params.id},
            {$pull: {followers: jwt.decode(req.cookies.yourPartyToken).idHash}},
        ).then(data => console.log(data))
            .catch(err => console.log(err))
        res.redirect('/user/events')

    })

    .get('/get-events-by-id/:id', (req, res) => {
        PartyList.find({
            _id: req.params.id,
        })
            .then(data => {
                res.send(data)
            })

    })

    .post('/get-events-by-date', (req, res) => {
        console.log(req.body)
        PartyList.find({
            date: {
                $gte: new Date(req.body.date1.dateInstance),
                $lte: new Date(req.body.date2.dateInstance)
            }
        }).lean()
            .then(data => {
                res.render('sites/home/home', {
                    info: data,
                })
            })
            .catch(error => console.error(error))
    })


module.exports = {
    eventsRouter,
}