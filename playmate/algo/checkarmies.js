class ArmiesAlgo {
    constructor()   {
    this.warArmies = require('../standardData/armies.json');
    }

    checkPlayerArmies(playerDetails) {
        if(playerDetails.townHallLevel < 3) {
            return 'None, upgrade!';
        }
        let armies = this.warArmies[playerDetails.townHallLevel];
        let count;
        let doableArmies = [];
        let playerAttackUnits = this.getPlayerAttackUnits(playerDetails);
        for (let i = 0; i<armies.length; i++) {
            let army = armies[i];
            count = 0;
            for (let y in army) {
                if (playerAttackUnits[y]) {
                    if (army[y] <= playerAttackUnits[y]){
                        
                        count ++;
                    }
                }
                else { break; }
            }
            if (count == Object.keys(army).length - 2) {
                doableArmies = doableArmies.concat(armies[i]);
            }
        }
        
        if(doableArmies.length == 0) { doableArmies = 'None, upgrade!'; }
    return doableArmies;
    }

    getPlayerAttackUnits(playerDetails) {
        let spellUnits = {...playerDetails.spells};
        let spellUnitsKeys = Object.keys(spellUnits);
        let playerSpellUnits = {};
        for (let x in spellUnitsKeys) {
            if(spellUnits[spellUnitsKeys[x]].village != 'builderBase')
            playerSpellUnits[spellUnits[x].name] = spellUnits[x].level;
        }

        let troopUnits = {...playerDetails.troops};
        let troopUnitsKeys = Object.keys(troopUnits);
        let playerTroopUnits = {};
        for (let y in troopUnitsKeys) {
            if(troopUnits[troopUnitsKeys[y]].village != 'builderBase')
            playerTroopUnits[troopUnits[y].name] = troopUnits[y].level;
        }

        let heroUnits = {...playerDetails.heroes};
        let heroUnitsKeys = Object.keys(heroUnits);
        let playerHeroUnits = {};
        for (let z in heroUnitsKeys) {
            if(heroUnits[heroUnitsKeys[z]].village != 'builderBase')
            playerHeroUnits[heroUnits[z].name] = heroUnits[z].level;
        }

        let playerAttackUnits = { ...playerSpellUnits, ...playerHeroUnits, ...playerTroopUnits};

    return playerAttackUnits;
    }
}

module.exports = {
    ArmiesAlgo
}