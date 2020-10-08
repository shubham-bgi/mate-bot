const cwl = require("../json/cwl")

function getCwlPoints(clanLeague) {
    const leagueRank = cwl[clanLeague];
    return Math.round((leagueRank/0.18))/10;
}

function getTrophyPoints(clanPoints) {
    return Math.round((clanPoints/500))/10;
}

function overallPoints(clanDetails, clanActivityFeel, nonRushPoints, last15WarWinRate, warWinRate, siegePoints, maxDonoPoints) {
    let cwlPoints = getCwlPoints(clanDetails.warLeague.name);
    let clanLevelPoints = clanDetails.clanLevel/5;
    const trophyPoints = getTrophyPoints(clanDetails.clanPoints);
    const versusTrophyPoints = getTrophyPoints(clanDetails.clanVersusPoints);
    const warPoints = Math.round((last15WarWinRate+warWinRate)/2)/10;
    return { 
        cwl: cwlPoints,
        level: clanLevelPoints,
        trophy: trophyPoints,
        versusTrophy: versusTrophyPoints,
        war: warPoints,
        activity: clanActivityFeel,
        nonRush: nonRushPoints,
        maxDonation: maxDonoPoints,
        siege: siegePoints,
        overall: Math.round((cwlPoints + clanLevelPoints + trophyPoints + versusTrophyPoints + warPoints + clanActivityFeel + nonRushPoints + siegePoints + maxDonoPoints) / 0.9) / 10,//add all the points and making it base of 10
    }
}
 
module.exports = {
    overallPoints: overallPoints
}