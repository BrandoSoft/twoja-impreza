const express = require('express');
const hbs = require('express-handlebars');

const {handlebarsHelpers} = require('./handlebars-helpers');




const app = express();

app.engine('.hbs', hbs({
    extname: 'hbs',
    helpers: handlebarsHelpers,
}));

app.use(express.static(__dirname + '/public'));
app.set('view engine', '.hbs')



app.listen(3003, 'localhost')