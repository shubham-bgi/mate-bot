const Constants = require('../constants.js');
const Utils =  require('../utils.js');

const standardTrophiesPerTownHall = { 
    "1" : "200",
    "2" : "400",
    "3" : "600",
    "4" : "800",
    "5" : "1000",
    "6" : "1200",
    "7" : "1600",
    "8" : "2000",
    "9" : "2600",
    "10": "3200",
    "11": "4100",
    "12": "4700",
    "13": "5300" 
}



let playerType;
let TrophyDeviation;
let clanTrophyDeviation = [];

function calculatePercentDeviation(playerDetails) {
    let playerTrophyDeviation;
    let playerCurrentTrophies = playerDetails.;
    playerTrophyDeviation = playerCurrentTrophies/standardTrophiesPerTownHall[playerDetails.townHallLevel];
    return playerTrophyDeviation;
}

function checkTrophyPushType(TrophyDeviation) {
    if (TrophyDeviation > 1) 
    playerType = 'Trophy Pusher';
    else
    playerType = 'Farmer';
    return playerType;
}

module.exports = {
    calculatePercentDeviation
}
