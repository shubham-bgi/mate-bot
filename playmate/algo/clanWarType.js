const olf = require('../oneLineFunctions');

class warType {
    checkClanWarType(clanDetails, clanRushPoints, warLog){
        let type;
        if (!clanDetails.isWarLogPublic) { 
            type  = 'War Log not visible';
            return {
                type: type
            }
        }
        if (olf.checkFWA(clanDetails.description)) { 
            type = 'Farm War alliance'; 
        }

        let warWinRate = this.getWarWinRate(clanDetails);
        let lastFifteenWarWinRate = this.getLastFifteenWarsWinRate(warLog);
        if (!lastFifteenWarWinRate) { lastFifteenWarWinRate = warWinRate; }
        if (warWinRate > 75 && clanRushPoints >= 9) {
            type = 'Serious War clan';
        } else if (warWinRate > 50 && clanRushPoints > 5) {
            type = 'Casual War clan';
        } else {
            type = 'Not a war clan';
        }

        return {
            type: type,
            winRate: warWinRate,
            lastFifteenWinRate: lastFifteenWarWinRate
        }
    }

    getWarWinRate(clanDetails){
        let totalWars = clanDetails.warWins + clanDetails.warLosses + clanDetails.warTies;
        return Math.round(clanDetails.warWins/totalWars * 100);
    }

    getLastFifteenWarsWinRate(warLog){
        let count = 0;
        if(warLog.length>15) {
            for (let i = 0; i<15; i++) {
                if (warLog[i].result == 'win') { count++; }
            }
            return Math.round((count/15) * 100); 
        } else {
            return false;
        }
    }
}

module.exports = {
    warType
}