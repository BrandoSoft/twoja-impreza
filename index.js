const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

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
const app = express();
app.use(express.static('./public'));
app.use('/', homeRouter);
app.use('/', addRouter);
app.use('/', archiveRouter);
app.use('/', userPartyRouter);
app.use('/', userAccountRouter);

// handlebars config
app.engine('.hbs', hbs({ extname: 'hbs', helpers: handlebarsHelpers }));
app.set('view engine', '.hbs');

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

// Body-Parser Middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// route for saving diary
app.post('/add-party-to-db', (req, res) =>{
    // res.send(req.body)

    const {title, description, date} = req.body;
    console.log(req.body)
    const Data = new PartyList({
        title,
        description,
        date,
    })
    console.log(Data);
    res.send("ZAPISAno");
})


app.listen(3000, () => {
    console.log(`Working on http://localhost:${port}`)
})