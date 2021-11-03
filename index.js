const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const {handlebarsHelpers,} = require('./handlebars-helpers');
const {homeRouter,} = require("./routs/home");
const {eventsRouter,} = require("./routs/add");
const {archiveRouter,} = require("./routs/archive");
const {userRouter,} = require("./routs/user-account");


const {port} = require('./config')

// Routing
const app = express();
app.use(express.static('./public'));
app.use('/events', eventsRouter);
app.use('/archive', archiveRouter);
app.use('/user', userRouter);
app.use('/', homeRouter);

// handlebars config
app.engine('.hbs', hbs({extname: 'hbs', helpers: handlebarsHelpers}));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())


app.listen(port, () => {
    console.log(`Working on http://localhost:${port}`)
})