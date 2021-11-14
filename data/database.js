const {database_name, database_pass} = require("../config");
const mongoose = require("mongoose");
const PartyList = require("../models/PartyList");
const {formatter} = require("../utils/formatter");
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
        data = {}
    } else {
        let {date} = data;

        date = {
            $gte: new Date(date.firstDate),
            $lte: new Date(date.secondDate),
                    }
        console.log('>>>>',date)
    }
    // console.log(new Date('2000-11-25'))






    // const ageArray = [];
    // const infoAge = Object
    //     .entries(info.age)
    //     .filter(([key, value]) => value === true)
    //     .forEach(el => ageArray.push(el[0]))
    //
    // const categoryArray = [];
    // const infoCategory = Object
    //     .entries(info.checklist).filter(([key, value]) => value === true)
    //     .forEach(el => categoryArray.push(el[0]))

    // console.log(categoryArray)
    // console.log(ageArray)


    PartyList.find({
        date: {
            $gte: new Date(),
            $lte: new Date(),
        }
    }).lean().sort({date: 1})
        .then(data => {
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