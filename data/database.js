const {database_name, database_pass} = require("../config");
const mongoose = require("mongoose");
const PartyList = require("../models/PartyList");
const {formatter} = require("../utils/formatter");
const {AGE, CATEGORY} = require("../data/checkboxList");
const url = `mongodb+srv://${database_name}:${database_pass}@cluster0.xll9q.mongodb.net/twojaImprezaDatabase?retryWrites=true&w=majority`;

function connectDataBase() {
    mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
        .then(console.log("Mongo DB connected :)"))
        .catch(err => console.error(err));
}


function findAndRender(req, res, options) {
    let {category, data, age} = options;


    if (data === undefined) {
        data = {};
        data.age = {};
        for (const element of age) {
            data.age[`${element}`] = false;
        }
        data.checklist = {};
        for (const element of CATEGORY) {
            data.checklist[`${element}`] = false;
        }
        data.date = {};
        data.date.startDate = new Date('11-11-1900');
        data.date.finishDate = new Date('11-11-2100');


    }
    if (data.searchParameters === undefined) {
        data.searchParameters = ''
    }
    if (data.date === undefined) {
        data.date = {}
        data.date.startDate = new Date('11-11-1900')
        data.date.finishDate = new Date('11-11-2100')
    }


    console.log('cala data >>>', data, 'koniec')
    // console.log('age >>>', data.age)
    // console.log('category >>>', data.checklist)


    const ageArray = [];
    Object
        .entries(data.age)
        .filter(([key, value]) => value === true)
        .forEach(el => ageArray.push(el[0]))


    const categoryArray = [];
    Object
        .entries(data.checklist).filter(([key, value]) => value === true)
        .forEach(el => categoryArray.push(el[0]))

    console.log(data.date, categoryArray)
    PartyList.find({
            $and: [
                    {
                    date: {
                        $gte: data.date.startDate,
                        $lte: data.date.finishDate,
                    }
                    },
                    {
                        category: categoryArray
                    },

            ]
        }
    ).lean().sort({date: 1})
        .then(data => {
            // console.log(data)
            res.render('sites/home/home', {
                info: data,
                follow: true,
                unfollow: false,
                category,
                age,
            })
        })
        .catch(error => console.error(error))
}

module.exports = {
    connectDataBase,
    findAndRender,
}