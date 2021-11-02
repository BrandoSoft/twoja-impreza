const mongoose = require ('mongoose');

const partyListSchema = new mongoose.Schema({
    title:{
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
    start:{
        type: Date,
        required: true,
    },
    end:{
        type: Date,
        required: true,
    }

});

module.exports = mongoose.model('Party', partyListSchema);