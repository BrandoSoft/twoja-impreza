const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const {handlebarsHelpers,} = require('./utils/handlebars-helpers');
const {homeRouter,} = require("./routs/home");
const {eventsRouter,} = require("./routs/events");
const {archiveRouter,} = require("./routs/archive");
const {userRouter,} = require("./routs/user");
const {port} = require('./config')

const app = express();

// handlebars config
app.engine('.hbs', hbs({extname: 'hbs', helpers: handlebarsHelpers}));
app.set('view engine', '.hbs');

// Routing
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/events', eventsRouter);
app.use('/archive', archiveRouter);
app.use('/user', userRouter);
app.use('/', homeRouter);

app.listen(port, () => {
    console.log(`Working on http://localhost:${port}`)
})