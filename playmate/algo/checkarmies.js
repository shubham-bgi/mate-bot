const Utils = require('../utils');
const player = require('../../bot/commands/base');
const readJson = Utils.readJson;

class ArmiesAlgo {
    constructor()   {
    this.warArmies = readJson('json/armies.json');
    }

    checkPlayerArmies(playerDetails) {

        let armies = this.warArmies[playerDetails.townHallLevel];
        let armiesList = Object.keys(armies);
        let armyAttackUnits;
        let count;
        let doableArmies = [];
        let playerAttackUnits = this.getPlayerAttackUnits(playerDetails);

        for (let i = 0; i<armiesList.length; i++) {
            let army = armies[armiesList[i]];
            armyAttackUnits = Object.keys(armies[armiesList[i]]);
            count = 0;
            for (let y = 0; y<armyAttackUnits.length; y++) {
                if (playerAttackUnits[armyAttackUnits[y]]) {
                    if (army[armyAttackUnits[y]] <= playerAttackUnits[armyAttackUnits[y]]){
                        count ++;
                    }
                }
                else { break; }
            }
            if (count == armyAttackUnits.length) {
                doableArmies = doableArmies.concat(armiesList[i]);
            }
        }
        if(doableArmies.length == 0) { doableArmies = 'No good armies right now.'; }
    return doableArmies;
    }

    getPlayerAttackUnits(playerDetails) {
        let spellUnits = {...playerDetails.spells};
        let spellUnitsKeys = Object.keys(spellUnits);
        let playerSpellUnits = {};
        for (let x in spellUnitsKeys) {
            playerSpellUnits[spellUnits[x].name] = spellUnits[x].level;
        }

        let troopUnits = {...playerDetails.troops};
        let troopUnitsKeys = Object.keys(troopUnits);
        let playerTroopUnits = {};
        for (let y in troopUnitsKeys) {
            playerTroopUnits[troopUnits[y].name] = troopUnits[y].level;
        }

        let heroUnits = {...playerDetails.heroes};
        let heroUnitsKeys = Object.keys(heroUnits);
        let playerHeroUnits = {};
        for (let z in heroUnitsKeys) {
            playerHeroUnits[heroUnits[z].name] = heroUnits[z].level;
        }

        let playerAttackUnits = { ...playerSpellUnits, ...playerHeroUnits, ...playerTroopUnits};

    return playerAttackUnits;
    }
}

module.exports = {
    ArmiesAlgo
}