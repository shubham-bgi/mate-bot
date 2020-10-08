const mongoose = require("mongoose");

let ClanDetailsSchema = new mongoose.Schema({
    discordID : {
        type : String,
        required : "Required"
    },
    clanTag : {
        type : String,
        required : "Required"
    },
    clanName: {
        type: String,
        required: "Required"
    },
    clanLevel : {
        type : Number,
        required : "Required"
    },
    members : {
        type : Number,
        required : "Required"
    },
    clanWarLeague : {
        type : String,
        required : "Required"
    },
    activityPoints : {
        type : Number,
        required : "Required"
    },
    points: {
        type: Object,
        required: "Required"
    },
    maxPoints: {
        type: Number,
        required: "Required"
    },
    clanPoints : {
        type : Number,
        required : "Required"
    },
    clanVersusPoints : {
        type : Number,
        required : "Required"
    },
    warWins: {
        type: Number,
        required: "Required"
    },
    warLosses: {
        type: Number,
        required: "Required"
    },
    warTies: {
        type: Number,
        required: " Required"
    },
    location : {
        type : Object
    },
    warFrequency : {
        type : String
    },
    isFWA: {
        type: Boolean,
        default: false
    },
    onlyTownHall: {
        type: Number
    },
    searching: {
        type: Boolean,
        default: true
    },
    searchingByUpdate: {
        type: Boolean,
        default: true
    },
    searchingByAdmin:{
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model("clanDetails", ClanDetailsSchema)