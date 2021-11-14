const mongoose = require ('mongoose');

const partyListSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,

    },
    date:{
        type: Date,
        required: true,
    },
    time:{
        type: String,

    },
    place:{
        type: String,

    },
    organizer:{
        type: String,

    },
    followers: {
        type: [String],
    },
    age: {
        type: [String],
            },
    category: {
        type: [String],
    },

});

module.exports = mongoose.model('Party', partyListSchema);