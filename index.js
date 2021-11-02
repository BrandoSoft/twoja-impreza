const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv').config();

const { handlebarsHelpers, } = require('./handlebars-helpers');
const { homeRouter, } = require("./routs/home");
const { addRouter, } = require("./routs/add");
const { archiveRouter, } = require("./routs/archive");
const { userPartyRouter } = require("./routs/user-party");
const { userAccountRouter, } = require("./routs/user-account");

const port = process.env.PORT;
const host = process.env.HOST;

const login = process.env.DBNAME;
const pass = process.env.DBPASS;

// Routing
const index = express();
index.use(express.static('./public'));
index.use('/', homeRouter);
index.use('/', addRouter);
index.use('/', archiveRouter);
index.use('/', userPartyRouter);
index.use('/', userAccountRouter);

// handlebars config
index.engine('.hbs', hbs({ extname: 'hbs', helpers: handlebarsHelpers }));
index.set('view engine', '.hbs');

// Database url
const url = `mongodb+srv://${login}:${pass}@cluster0.xll9q.mongodb.net/twojaImprezaDatabase?retryWrites=true&w=majority`;

mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    )
    .then(console.log("Mongo DB connected :)"))
    .catch(err => console.log(err));

// Import party model
const PartyList = require('./models/PartyList')

// route for saving diary
index.post('/add-party-to-db', (req, res) =>{
    const Data = new PartyList({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
    })
    console.log(Data);
    res.send("ZAPIS");
})


index.listen(3000, () => {
    console.log(`Working on http://localhost:${port}`)
})