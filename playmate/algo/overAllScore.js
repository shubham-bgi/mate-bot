const cwl = require("../standardData/cwl")

function getCwlPoints(clanLeague) {
    const leagueRank = cwl[clanLeague];
    return Math.round((leagueRank/0.18))/10;
}

function getTrophyPoints(clanPoints) {
    return Math.round((clanPoints/500))/10;
}

function overallPoints(clanDetails, rushedMetrics, activeMetrics, siegeDonors, maxDonation, war) {
    let cwlPoints = getCwlPoints(clanDetails.warLeague.name);
    let clanLevelPoints = clanDetails.clanLevel/5;
    const trophyPoints = getTrophyPoints(clanDetails.clanPoints);
    const versusTrophyPoints = getTrophyPoints(clanDetails.clanVersusPoints);
    const membersPoints = clanDetails.members/5;
    let overAllPoints = cwlPoints + clanLevelPoints + trophyPoints + versusTrophyPoints + war.points + activeMetrics.attackWinsPoints + activeMetrics.donationRationPoints + rushedMetrics.nonRushPoints + rushedMetrics.maxPoints + siegeDonors.points + maxDonation.points + membersPoints;
    overAllPoints = Math.round((overAllPoints/12)*10)/10;
    return { 
        CWL: cwlPoints,
        clanLevel: clanLevelPoints,
        trophy: trophyPoints,
        versusTrophy: versusTrophyPoints,
        members: membersPoints,
        overall: overAllPoints
    }
}
 
module.exports = {
    overallPoints: overallPoints
}