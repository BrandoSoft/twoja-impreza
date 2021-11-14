const express = require('express');
const bodyParser = require('body-parser');
const PartyList = require("../models/PartyList");
const jwt = require("jsonwebtoken");


const {CATEGORY, AGE} = require("../data/checkboxList");
const {verifyAccount} = require("../utils/auth-utils");


const {connectDataBase} = require('../data/database')
const mongoose = require("mongoose");
const {formatter} = require("../utils/formatter");

const urlencodedParser = bodyParser.urlencoded({extended: false})

const eventsRouter = express.Router();

// Database url
connectDataBase();

eventsRouter
    .get('/add', (req, res) => {
        if (verifyAccount(req.cookies.yourPartyToken)) {
            // ZALOGOWANY
            res.render('sites/add/add', {
                category: CATEGORY,
                age: AGE,
            })
        } else {
            //NIEZALOGOWANY
            res.render('sites/user-account/register-login-form', {})
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


    .post('/add-to-db', urlencodedParser, (req, res) => {

        const info = formatter(req.body)
        const ageArray = [];
        const infoAge = Object
            .entries(info.age)
            .filter(([key, value]) => value === true)
            .forEach(el => ageArray.push(el[0]))

        const categoryArray = [];
        const infoCategory = Object
            .entries(info.checklist).filter(([key, value]) => value === true)
            .forEach(el => categoryArray.push(el[0]))

        const {name, description, date, time, place, organizer} = req.body;

        const Data = new PartyList({
            name, description, date, time, place, organizer,
            age: ageArray,
            category: categoryArray,
        })
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
    .post('/get-events', (req, res) => {
        console.log(req.body)
        const info = formatter(req.body)
        const ageArray = [];
        const infoAge = Object
            .entries(info.age)
            .filter(([key, value]) => value === true)
            .forEach(el => ageArray.push(el[0]))

        const categoryArray = [];
        const infoCategory = Object
            .entries(info.checklist).filter(([key, value]) => value === true)
            .forEach(el => categoryArray.push(el[0]))

        PartyList.find(
            {$and: [
                    {date: {
                        // $gte: new Date(req.body.date1.dateInstance),
                        // $lte: new Date(req.body.date2.dateInstance)
                            $gte: new Date(2019-11-16),
                            $lte: new Date(2022-11-16),
                    }},
                    {$and:[
                            { category: categoryArray },
                            { age: ageArray}
                        ]}
                ]}).lean()
            .then(data => {
                console.log(data)
                res.render('sites/home/home', {
                    info: data,
                    follow: true,
                    unfollow: false,
                    category: CATEGORY,
                    age: AGE,
                })
            })
            .catch(error => console.error(error))

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