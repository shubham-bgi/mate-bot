module.exports = {
    RushedAlgo: require('./rushedAlgo.js').RushedAlgo,
    ActiveAlgo: require('./activeAlgo.js').ActiveAlgo,
    ArmiesAlgo: require('./checkarmies.js').ArmiesAlgo,
    WarTypeAlgo: require('./clanWarType').warType,
    ClanTownHallLevel: require('./clanLevel.js').getTownHallStatus,
    CheckSiege: require('./checkDonors').checkSiege,
    CalculateMaxDonationPoints: require('./checkDonors').calculateMaxDonationPoints,
    overallPoints: require('./overAllScore').overallPoints
}