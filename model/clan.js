const mongoose = require('mongoose');

let ClanSchema = new mongoose.Schema({
    discordID : {
        type : String,
        required : true
    },
    clans : [{
        name: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            required: true
        },
        tag : {
            type : String,
            required : true
        },
        type : {
            type : String
        },
        dateAdded: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model("Clans", ClanSchema)