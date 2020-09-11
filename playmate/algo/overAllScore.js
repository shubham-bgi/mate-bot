const cwl = require("../json/cwl")

function getCwlPoints(clanLeague) {
    const leagueRank = cwl[clanLeague];
    return Math.round((leagueRank/18)*100)/10;
}

function getTrophyPoints(clanPoints) {
    return Math.round((clanPoints/50000)*100)/10;
}

function overallPoints(clanDetails, clanActivityFeel, nonRushPoints, last15WarWinRate, warWinRate) {
    let cwlPoints = getCwlPoints(clanDetails.warLeague.name);
    let clanLevelPoints = clanDetails.clanLevel;
    if (clanLevelPoints > 10) { clanLevelPoints = 10; }
    const trophyPoints = getTrophyPoints(clanDetails.clanPoints);
    const versusTrophyPoints = getTrophyPoints(clanDetails.clanVersusPoints);
    
    return { cwl: cwlPoints,
        level: clanLevelPoints,
        trophy: trophyPoints,
        versusTrophy: versusTrophyPoints,
        last15War: last15WarWinRate/10,
        activityFeel: clanActivityFeel,
        nonRush: nonRushPoints,
        warWin: warWinRate/10,
        overall: Math.round((cwlPoints + clanLevelPoints + trophyPoints + versusTrophyPoints + last15WarWinRate/10 + clanActivityFeel + nonRushPoints + warWinRate/10) * 6.25) / 10,//add all the points and making it base of 50
    }
}

module.exports = {
    overallPoints: overallPoints
}