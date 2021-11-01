const express = require('express');
const hbs = require('express-handlebars');
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

app.use('/', homeRouter);
app.use('/', addRouter);
app.use('/', archiveRouter);
app.use('/', userPartyRouter);
app.use('/', userAccountRouter);

app.engine('.hbs', hbs({
    extname: 'hbs',
    helpers: handlebarsHelpers,
}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', '.hbs');

//databaseurl
const url = `mongodb+srv://${process.env.DBNAME}:${process.env.DBPASS}@cluster0.xll9q.mongodb.net/twojaImprezaDatabase?retryWrites=true&w=majority`;



app.listen(port, host, ()=>{
    console.log(`Working on ${host}:${port}`)
})