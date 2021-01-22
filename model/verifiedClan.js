const mongoose = require("mongoose");

let verifiedClanSchema = new mongoose.Schema({
    discordID : {
        type : String,
        required: "Required"
    },
    clans : [{
        name: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model("VerifiedClan", verifiedClanSchema);