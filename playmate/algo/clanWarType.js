const {checkFWA} = require('../multipleUse/checkFWA');

class warType {
    checkClanWarType(clanDetails, clanRushPoints, warLog){
        let type;
        if (!clanDetails.isWarLogPublic) { 
            return {
                type: 'Private War Log',
                total: 'Private War Log',
                winRate: 'Private War Log',
                lastFifteenWarWinRate: 'Private War Log',
                points: 0
            }
        }
        if (checkFWA(clanDetails.description)) { 
            type = 'War Farmers'; 
        }

        let warWinRate = this.getWarWinRate(clanDetails);
        let lastFifteenWarWinRate = this.getLastFifteenWarsWinRate(warLog);
        if (!lastFifteenWarWinRate) { lastFifteenWarWinRate = warWinRate; }
        if (warWinRate > 75 && clanRushPoints >= 9) {
            type = 'Serious War clan';
        } else if (warWinRate > 50 && clanRushPoints > 5) {
            type = 'Casual War clan';
        } else {
            type = 'Noobs in war';
        }

        return {
            type: type,
            total: this.totalWars,
            winRate: warWinRate,
            lastFifteenWarWinRate: lastFifteenWarWinRate,
            points: Math.round((lastFifteenWarWinRate + warWinRate)/2)/10
        }
    }

    getWarWinRate(clanDetails){
        this.totalWars = clanDetails.warWins + clanDetails.warLosses + clanDetails.warTies;
        if(this.totalWars == 0) { return 0; }
        return Math.round(clanDetails.warWins/this.totalWars * 100);
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