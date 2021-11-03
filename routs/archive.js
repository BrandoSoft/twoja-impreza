const express = require('express');

const archiveRouter = express.Router();

archiveRouter
    .get('/events', (req, res) => {
        res.render('sites/archive/archive', {
        })
    })

module.exports = {
    archiveRouter,
}