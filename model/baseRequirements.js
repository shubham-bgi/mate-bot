const mongoose = require("mongoose");

const sumOfHeroesSchema = new mongoose.Schema({
    townHallLevel: {
        type: Number
    },
    sumOfHeroes: {
        type: Number
    }
});

const heroLevelsSchema = new mongoose.Schema({
    townHallLevel: {
        type: Number
    },
    heroLevels: {
        type: [Number]
    }
});

const warStarsSchema = new mongoose.Schema({
    townHallLevel: {
        type: Number
    },
    warStars: {
        type: [Number]
    }
});

const BaseRequirementsSchema = new mongoose.Schema({

    discordID : {
        type : String,
        required : "Required"
    },
    clanTag : {
        type : String,
        required : "Required"
    },
    minimumTownHallLevel: {
        type : Number,
        default: 1
    },
    nonRushPoints: {
        type : Number,
        default: -1
    },
    maxPoints:{
        type : Number,
        default: -1
    },
    activityPoints:{
        type: Number,
        default: -1
    },
    trophies: {
        type : Number,
        default: -1
    },
    versusTrophies: {
        type : Number,
        default: -1
    },
    onlyTownHall: {
        type : Number,
        default: 0
    },
    isFWA: {
        type : Boolean,
        default: false
    },
    sumOfHeroes: {
        type: [sumOfHeroesSchema]
    },
    heroLevels: {
        type: [heroLevelsSchema]
    },
    warStars: {
        type: [warStarsSchema]
    },
    searching: {
        type: Boolean,
        default: true
    },
    searchingByAdmin:{
        type: Boolean,
        default: true
    },
    searchingByUpdate: {
        type: Boolean,
        default: true
    },
    totalPlayersFound: {
        type: Number,
        default: 0
    },
    lastSearchDate: {
        type: Date,
        default: Date.now
    },
    lastUpdateDate: {
        type: Date,
        default: Date.now
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("BaseRequirements", BaseRequirementsSchema)