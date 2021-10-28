const express = require('express');

const addRouter = express.Router();

addRouter
    .get('/dodaj-ogloszenie', (req, res) => {
        res.render('add/add', {
        })
    });

module.exports = {
    addRouter,
}