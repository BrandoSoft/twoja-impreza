const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

const { handlebarsHelpers, } = require('./handlebars-helpers');
const { homeRouter, } = require("./routs/home");
const { addRouter, } = require("./routs/add");
const { archiveRouter, } = require("./routs/archive");
const { userPartyRouter } = require("./routs/user-party");
const { userAccountRouter, } = require("./routs/user-account");
const { port, database_name, database_pass } = require("./config");

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
const url = `mongodb+srv://${database_name}:${database_pass}@cluster0.xll9q.mongodb.net/twojaImprezaDatabase?retryWrites=true&w=majority`;

mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    )
    .then(console.log("Mongo DB connectes"))
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

index.listen(port, () => {
    console.log(`Working on  http://localhost:${port}`)
})