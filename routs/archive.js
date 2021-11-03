const express = require('express');

const archiveRouter = express.Router();

archiveRouter
    .get('/party', (req, res) => {
        res.render('sites/archive/archive', {
        })
    })

module.exports = {
    archiveRouter,
}