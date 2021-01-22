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
        type: Number
    }
});

let RegisteredClanSchema = new mongoose.Schema({
    discordID : {
        guild:{
            type: String,
            required: "Required"
        },
        channel:{
            type: String,
            required: "Required"
        },
        role:{
            type: String,
            default: null
        }
    },
    clanDetails : {
        type : Object,
        required : "Required"
    },
    clanMetrics: {
        type: Object,
        required: "Required"
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
    },
    searchSetByUser: {
        type: Boolean,
        default: true
    },
    searchSetByAdmin: {
        type: Boolean,
        default: true
    },
    areDetailsUpdated:{
        type: Boolean,
        default: true
    },
    totalPlayersFound:{
        type: Number,
        default: 0
    },
    baseRequirements: {
        townHallLevel: {
            type : Number,
            default: 30
        },
        warLeagueTownHallLevel: {
            type: Number,
            default: 30
        },
        nonRushPoints: {
            type : Number,
            default: -1
        },
        maxPoints:{
            type : Number,
            default: -1
        },
        attackWinsPoints: {
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
        needWarFarmers: {
            type: Boolean,
            default: false
        },
        lifetimeDonation: {
            type: Number,
            default: 0
        },
        sumOfHeroes: {
            type: [sumOfHeroesSchema],
            required : "Required"
        },
        heroLevels: {
            type: [heroLevelsSchema],
            required : "Required"
        },
        warStars: {
            type: [warStarsSchema],
            required : "Required"
        }
    }
})

module.exports = mongoose.model("RegisteredClan", RegisteredClanSchema);