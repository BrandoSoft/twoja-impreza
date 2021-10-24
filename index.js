const express = require('express');
const hbs = require('express-handlebars');

const {handlebarsHelpers} = require('./handlebars-helpers');
const {homeRouter} = require("./routs/home");




const app = express();

app.engine('.hbs', hbs({
    extname: 'hbs',
    helpers: handlebarsHelpers,
}));

app.use(express.static(__dirname + '/public'));
app.set('view engine', '.hbs')

app.use('/', homeRouter)



app.listen(3003, 'localhost')