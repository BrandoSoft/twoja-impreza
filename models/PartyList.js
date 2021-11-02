const mongoose = require ('mongoose');

const partyListSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    place:{
        type: String,
        required: true,
    },
    organizer:{
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Party', partyListSchema);