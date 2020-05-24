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

function checkTrophyPushForPlayer(playerDetails) {
    let playerTrophyDeviation = calculatePercentDeviation(playerDetails);
    return checkTrophyPushType(playerTrophyDeviation);
}

function checkTrophyPushForClan(allPlayerDetails) {
    let totalPercentageDeviation = 0;
    allPlayerDetails.forEach( playerDetail => {
        playerDetail = playerDetail.data;
        totalPercentageDeviation += calculatePercentDeviation(playerDetail);
    });
    let averagePercentageDeviation = totalPercentageDeviation / allPlayerDetails.length;
    return checkTrophyPushType(averagePercentageDeviation);
}

function calculatePercentDeviation(playerDetail) {
    let playerTrophyDeviation = playerDetail.trophies / standardTrophiesPerTownHall[playerDetail.townHallLevel];
    return playerTrophyDeviation;
}

function checkTrophyPushType(trophyDeviation) {
    if (trophyDeviation > 1) 
        return 'Trophy Pusher';
    
    return 'Farmer';
}

module.exports = {
    checkTrophyPushForPlayer,
    checkTrophyPushForClan
}
