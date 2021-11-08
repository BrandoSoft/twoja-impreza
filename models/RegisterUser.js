const mongoose = require ('mongoose');

const RegisterUserSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    login:{
        type: String,
        required: true,
    },
   password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    idHash:{
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('RegisterUser', RegisterUserSchema);
