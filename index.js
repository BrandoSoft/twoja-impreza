const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const {handlebarsHelpers,} = require('./handlebars-helpers');
const {homeRouter,} = require("./routs/home");
const {addRouter,} = require("./routs/add");
const {archiveRouter,} = require("./routs/archive");
const {userPartyRouter} = require("./routs/user-party");
const {userAccountRouter,} = require("./routs/user-account");


const {port} = require('./config')

// Routing
const app = express();
app.use(express.static('./public'));
app.use('/', homeRouter);
app.use('/', addRouter);
app.use('/', archiveRouter);
app.use('/', userPartyRouter);
app.use('/', userAccountRouter);

// handlebars config
app.engine('.hbs', hbs({extname: 'hbs', helpers: handlebarsHelpers}));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())


app.listen(port, () => {
    console.log(`Working on http://localhost:${port}`)
})