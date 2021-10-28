const express = require('express');
const hbs = require('express-handlebars');

const {handlebarsHelpers} = require('./handlebars-helpers');
const {homeRouter} = require("./routs/home");
const {addRouter} = require("./routs/add");
const {archiveRouter} = require("./routs/archive");
const {userPartyRouter} = require("./routs/user-party");
const {userAccountRouter} = require("./routs/user-account");




const app = express();
const PORT = 3005;

app.engine('.hbs', hbs({
    extname: 'hbs',
    helpers: handlebarsHelpers,
}));

app.use(express.static(__dirname + '/public'));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/', addRouter);
app.use('/', archiveRouter);
app.use('/', userPartyRouter);
app.use('/', userAccountRouter);




app.listen(PORT, 'localhost')