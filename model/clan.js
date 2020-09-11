const mongoose = require('mongoose');

let ClanSchema = new mongoose.Schema({
    discordID : {
        type : String,
        required : true
    },
    clans : [{
        tag : {
            type : String,
            required : true
        },
        type : {
            type : String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model("Clans", ClanSchema)