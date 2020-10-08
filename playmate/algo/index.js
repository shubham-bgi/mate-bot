module.exports = {
    RushedAlgo: require('./rushedAlgo.js').RushedAlgo,
    ActiveAlgo: require('./activeAlgo.js').ActiveAlgo,
    ArmiesAlgo: require('./checkarmies.js').ArmiesAlgo,
    WarTypeAlgo: require('./clanWarType').warType,
    TrophyPushForPlayer: require('./trophyPush.js').checkTrophyPushForPlayer,
    TrophyPushForClan: require('./trophyPush.js').checkTrophyPushForClan,
    ClanTownHallLevel: require('./clanLevel.js').getTownHallStatus,
    CheckSiege: require('./checkDonors').checkSiege,
    CalculateMaxDonationPoints: require('./checkDonors').calculateMaxDonationPoints,
    GetPlayerWarTag: require('./playerWarStarsTag').getPlayerWarTag,
    overallPoints: require('./overAllScore').overallPoints
}