const {database_name, database_pass} = require("../config");
const mongoose = require("mongoose");
const PartyList = require("../models/PartyList");
const url = `mongodb+srv://${database_name}:${database_pass}@cluster0.xll9q.mongodb.net/twojaImprezaDatabase?retryWrites=true&w=majority`;

function connectDataBase(){
    mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
        .then(console.log("Mongo DB connected :)"))
        .catch(err => console.error(err));
}


function findAndRender(req, res, options){
    const { category, data } = options;
    PartyList.find(data).lean().sort({date: 1})

        .then(data => {
            res.render('sites/home/home', {
                info: data,
                follow: true,
                unfollow: false,
                category,
            })
        })
        .catch(error => console.error(error))
}

module.exports = {
    connectDataBase,
    findAndRender,
}