const express = require('express');

const addRouter = express.Router();

addRouter
    .get('/dodaj-ogloszenie', (req, res) => {
        res.render('sites/add/add', {
        })
    })


module.exports = {
    addRouter,
}