const {database_name, database_pass} = require("../config");
const mongoose = require("mongoose");
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

module.exports = {
    connectDataBase,
}