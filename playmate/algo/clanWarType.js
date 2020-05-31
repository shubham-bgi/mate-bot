const Utils = require('../utils');
const readJson = Utils.readJson;

let clanRushLevel = 'Non Rushed';
let totalWars = clanWarsLost + clanWarsWon + clanWarsTie;
let warWinRate = clanWarsWon / totalWars * 100;
let clanWarTpye = '';

class warType{
    constructor(){
        this.fwaClans = readJson('json/farmWarAllianceClans');
    }

    checkClanWarType(clanWarRecord){ 
        if (clanWarRecord.lost == null) {
            console.log('War log is not public');
        }
        let warWinRate = getWarWinRate(clanWarRecord);


        if (clanWarsTie > clanWarsLost && clanWarsTie > clanWarsWon)
            clanWarTpye = 'Farm War alliance';
        
        else if (warWinRate > 75 && clanRushLevel == 'Non Rushed')
            clanWarTpye = 'Serious War clan';
        
        else if (warWinRate > 50 && clanRushLevel != 'Rushed')
            clanWarTpye = 'Casual War clan';
        else
            clanWarTpye = 'Clan Wars are fun';
        
        console.log('Clan War Type - ' + clanWarTpye); 
        console.log('War Win rate - ' + Math.round(warWinRate) +'%');

    }

    getWarWinRate(clanWarRecord){
        let totalWars = clanWarRecord.won + clanWarRecord.lost + clanWarRecord.tie;
        return clanWarRecord.won/totalWars;
    }

    
}
