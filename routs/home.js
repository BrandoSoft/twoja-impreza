const express = require('express');

const {verifyAccount} = require("../utils/auth-utils");
const {findAndRender} = require("../data/database");
const {CATEGORY, AGE} = require("../data/checkboxList");
const { formatter } = require("../utils/formatter");
const homeRouter = express.Router();


homeRouter
    .get('/home', (req, res) => {

        if (verifyAccount(req.cookies.yourPartyToken)){
            //ZALOGOWANY
            findAndRender(req, res, {
                category: CATEGORY,
                age: AGE,
                data: {},
            });
        } else {
            //NIEZALOGOWANY
            findAndRender(req, res, {
                category: CATEGORY,
                age: AGE,
                data: {},
            });
        }
    })
    .post('/home', (req, res) => {
        console.log("BEZ FORMATTERA", req.body)
        console.log("FORMATTER", formatter(req.body))
        if (verifyAccount(req.cookies.yourPartyToken)){
            //ZALOGOWANY
            findAndRender(req, res, {
                category: CATEGORY,
                age: AGE,
                // data: {},
                // formatData: formatter(req.body),
            });
        } else {
            //NIEZALOGOWANY
            // console.log(formatter(req.body)) //@TODO To wypisuje ten nowy format wyszukiwania
            findAndRender(req, res, {
                category: CATEGORY,
                age: AGE,//służy do formatowania checklisty -> wszystkie kategorie są w data/checkboxList.js
                // data: {}, // To jes to co zrobił Artur -> służy chyba do renderowania
                // formatData: formatter(req.body), // To sformatowana dane, które mają zastąpić (chyba) data
            });
        }
    })

    .get('/', (req, res) => {
        res.redirect("/home")
        }
    )


module.exports = {
    homeRouter,
};