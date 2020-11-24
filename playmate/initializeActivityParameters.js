function getLastMonthLastMonday() {
    var d = new Date();
    d.setUTCHours(05,00,00,00);
    d.setUTCDate(0);
    while (d.getUTCDay() !== 1) { // Roll the days backwards until Monday.
      d.setUTCDate(d.getUTCDate() - 1);
    } 
    return d;
}

function calculateTimeDifference () {
    let lastMonthMonday = getLastMonthLastMonday();
    let d = new Date();
    let differnce = (d.getTime() - lastMonthMonday.getTime())/(1000*60*60*24);
    return differnce;
}

function intializeActivtyParameters() {
    const time = calculateTimeDifference(); 
    const maxAttacksWonPerDay = 8;
    const maxDonationRationPerDay = 700;
    return {
        clanAttackWins: Math.round(maxAttacksWonPerDay*time),
        clanDonations: Math.round(maxDonationRationPerDay*time)
    }
}

module.exports = {
    initializeActivityParameters: intializeActivtyParameters
} 