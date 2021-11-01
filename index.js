const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv').config();

const {handlebarsHelpers} = require('./handlebars-helpers');
const {homeRouter} = require("./routs/home");
const {addRouter} = require("./routs/add");
const {archiveRouter} = require("./routs/archive");
const {userPartyRouter} = require("./routs/user-party");
const {userAccountRouter} = require("./routs/user-account");


const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

const login = process.env.DBNAME;
const pass = process.env.DBPASS;

// Routing

app.use('/', homeRouter);
app.use('/', addRouter);
app.use('/', archiveRouter);
app.use('/', userPartyRouter);
app.use('/', userAccountRouter);

// handlebars config

app.engine('.hbs', hbs({
    extname: 'hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));

// Database url

const url = `mongodb+srv://${login}:${pass}@cluster0.xll9q.mongodb.net/twojaImprezaDatabase?retryWrites=true&w=majority`;

mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("Mongo DB connectes"))
    .catch(err => console.log(err));

// Import party model
const PartyList = require('./models/PartyList')

// route for saving diary
app.post('/add-party-to-db', (req, res) =>{
    const Data = new PartyList({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
    })

    Data.save()
        .then(()=>{
            res.redirect('/home')
        })
        .catch(err=> console.log(err));
})

app.listen(port, host, () => {
    console.log(`Working on ${host}:${port}`)
})