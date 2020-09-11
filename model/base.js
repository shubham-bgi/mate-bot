const mongoose = require('mongoose');

let BaseSchema = new mongoose.Schema({
    discordID : {
        type : String,
        required : true
    },
    bases: [{
        name: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model("Bases", BaseSchema)