function getLastMonthLastMonday() {
    var d = new Date();
    d.setDate(1); // Roll to the first day of ...
    d.setMonth(d.getMonth()); // ... the next month.
    do { // Roll the days backwards until Monday.
      d.setDate(d.getDate() - 1);
    } while (d.getDay() !== 1);
    return d;
  }

function calculateTimeDifference () {
    let lastMonthMonday = new Date(2020,7,31,0,0,0,0)//months are 0-11
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