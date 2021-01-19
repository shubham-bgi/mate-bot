const Algo = require('../algo');
const RushedAlgo = Algo.RushedAlgo;
const ActiveAlgo = Algo.ActiveAlgo;
const WarTypeAlgo = Algo.WarTypeAlgo;
const ArmiesAlgo = Algo.ArmiesAlgo;
let armiesAlgo = new ArmiesAlgo();
let rushedAlgo = new RushedAlgo();
let activeAlgo = new ActiveAlgo();
let warTypeAlgo = new WarTypeAlgo();
const TownHallStatus = Algo.ClanTownHallLevel;
const CheckSiege = Algo.CheckSiege;
const MaxDonationPoints = Algo.CalculateMaxDonationPoints;
const OverAllPoints = Algo.overallPoints;

(function init() {
    "use strict";
    activeAlgo.setStandardParameters();
    console.log('Updated activity parameters...');
    setTimeout(init, 900000)
}());

function getMetricsForMembersOfClan(memberDetails, clanDetails, warLog) {
    const rushedMetrics = rushedAlgo.checkClanRushed(memberDetails);
    //nonRushPoints, maxPoints, type
    const activeMetrics = activeAlgo.getAttackWinAndDonationPoints(memberDetails, true);
    //attackWinsPoints, donationRationPoints, attackPoints, donationRation
    const townHall = TownHallStatus(memberDetails);
    //type, predominantTownHall, high: no of th b/w 11-13, low, mid, townHallCount: no of each townhall
    const siegeDonors = CheckSiege(memberDetails);
    //count: no of siege donors, points: clan points for siege donors
    const war = warTypeAlgo.checkClanWarType(clanDetails, rushedMetrics.nonRushPoints, warLog);
    //type, winRate, lastFifteenWarWinRate, totalWars, points
    const maxDonation = MaxDonationPoints(memberDetails, clanDetails.clanLevel);
    //units: name of units the clan can donate max, points
    const overallPoints = OverAllPoints(clanDetails,rushedMetrics, activeMetrics, siegeDonors, maxDonation, war);
    
    return {
        points: overallPoints,
        war: war,
        rushedMetrics: rushedMetrics,
        activeMetrics: activeMetrics,
        townHall: townHall,
        siegeDonors: siegeDonors,
        maxDonation: maxDonation,
    }
}

function getMetricForBase(playerDetails) {
    const rushedMetrics = rushedAlgo.checkRushed(playerDetails);
    const playerArmies = armiesAlgo.checkPlayerArmies(playerDetails);
    const playerActivity = activeAlgo.getAttackWinAndDonationPoints(playerDetails);
    return {
        rushedMetrics: rushedMetrics,
        playerArmies: playerArmies,
        playerActivity: playerActivity
    }
}

module.exports = {
    getMetricsForMembersOfClan: getMetricsForMembersOfClan,
    getMetricForBase: getMetricForBase
}