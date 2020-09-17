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
        townHallLevel: {
            type: Number,
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
        dateAdded: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model("Bases", BaseSchema)