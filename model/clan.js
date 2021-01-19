const mongoose = require('mongoose');

let ClanSchema = new mongoose.Schema({
    discordID : {
            type : String,
            required: "Required"
        },
    clans: [{
        name: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            required: true
        },
        tag: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: "Required"
        },
        dateAdded:{
            type: Date,
            dafault: Date.now
        }
    }]
});

module.exports = mongoose.model("Clans", ClanSchema)