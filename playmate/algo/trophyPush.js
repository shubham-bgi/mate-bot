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
    "9" : "2400",
    "10": "2800",
    "11": "3200",
    "12": "3600",
    "13": "4000" 
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
    if (trophyDeviation > 1.6)
        return 'Born To Push';
    else if (trophyDeviation > 1.3) 
        return 'Hard core Trophy Pusher';
    else if (trophyDeviation > 1)
        return 'Trophy Pusher';
    else if (trophyDeviation > 0.7)
        return 'Farmer';
    else if (trophyDeviation > 0.5)
        return 'Hard core Farmer';
    else
        return 'Born to Farm';
}

module.exports = {   
    checkTrophyPushForPlayer,
    checkTrophyPushForClan
}
