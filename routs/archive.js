const express = require('express');

const archiveRouter = express.Router();

archiveRouter
    .get('/archiwum-imprez', (req, res) => {
        res.render('archive/archive', {
        })
    });

module.exports = {
    archiveRouter,
}