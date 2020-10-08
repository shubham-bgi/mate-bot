const Olf = require('../oneLineFunctions');
const { readJson } = require('../utils');
const siegeNames = ['Wall Wrecker', 'Stone Slammer', 'Battle Blimp', 'Siege Barracks'] 
function checkSiege(allPlayersDetails){
    let countPoints;
    let totalPoints = 0;
    let siegePoints = allPlayersDetails.map((playerDetails) => {
        playerDetails = playerDetails.data;
        countPoints = 0
        playerDetails.troops.map((troop) => {
            if(siegeNames.includes(troop.name)) countPoints+=0.25;
        })
        return countPoints;
    })
    siegePoints = Olf.removeElement(siegePoints, 0);
    if(siegePoints.lenght > 0)
    {
        totalPoints = siegePoints.reduce((a,b) => a+b) * Math.max(...siegePoints);
    }
    return {
        total: siegePoints.length,
        points: Math.round(totalPoints/0.5)/10
    } 
}

function calculateMaxDonationPoints(allPlayerDetails, clanLevel) {

    /* let maxTroopsLevel = readJson('json/troops.json');
    siegeNames.map(name => delete maxTroopsLevel[name]);
    for(troop in maxTroopsLevel) {
        maxTroopsLevel[troop] = maxTroopsLevel[troop]["11"];
    }

    let maxSpellsLevel = readJson('json/spells.json');
    delete maxSpellsLevel["Clone Spell"];
    for(spell in maxSpellsLevel) {
        maxSpellsLevel[spell] = maxSpellsLevel[spell]["11"];
    }
    maxAttackUnitsLevel = {...maxTroopsLevel, ...maxSpellsLevel}; */
    const notToIncludeThese = [
        "Super Barbarian", 
        "Super Archer", 
        "Super Wall Breaker", 
        "Super Giant", 
        "Sneaky Goblin", 
        "Clone Spell", 
        "Super Valkyrie", 
        "Inferno Dragon", 
        "Super Witch", 
        'Wall Wrecker', 
        'Stone Slammer', 
        'Battle Blimp', 
        'Siege Barracks'
    ]
    let donationLevelUpgrade = 0;
    if(clanLevel >= 10) 
    donationLevelUpgrade = 2;
    else if(clanLevel >= 5) 
    donationLevelUpgrade = 1;

    let maxUnitsClanCanDonate = [];
    let maxDonationPoints = allPlayerDetails.map(playerDetails => {
        playerDetails = playerDetails.data;
        let count = 0;
        let donationLevel;
        for(i = 0; i < playerDetails.troops.length; i++) {
            donationLevel = playerDetails.troops[i].level + donationLevelUpgrade;
            if (playerDetails.troops[i].village === 'home' && !notToIncludeThese.includes(playerDetails.troops[i].name) && donationLevel >= playerDetails.troops[i].maxLevel) {
                count++;
                if(maxUnitsClanCanDonate.indexOf(playerDetails.troops[i].name) === -1) {
                    maxUnitsClanCanDonate.push(playerDetails.troops[i].name);
                }
            }
        }
        for(j = 0; j < playerDetails.spells.length; j++) {
            
            donationLevel = playerDetails.spells[j].level + donationLevelUpgrade;
            if (playerDetails.spells[j].village === 'home' && !notToIncludeThese.includes(playerDetails.spells[j].name) && donationLevel >= playerDetails.spells[j].maxLevel) {
                count++;
                if(maxUnitsClanCanDonate.indexOf(playerDetails.spells[j].name) === -1) {
                    maxUnitsClanCanDonate.push(playerDetails.spells[j].name);
                }
            } 
        }
        /* let playerAttackUnits = {...playerDetails.troops,...playerDetails.spells}
        console.log(playerAttackUnits);
        let count = 0;
        for(unit in playerAttackUnits) {
            donationLevel = unit.level + donationLevelUpgrade;
            if (!siegeNames.includes(unit.name) && unit.name != "Clone Spell" && donationLevel >= maxAttackUnitsLevel[unit.name]) {
                count++;
                if(maxUnitsClanCanDonate.indexOf(unit.name) === -1) {
                    maxUnitsClanCanDonate.push(unit.name);
                }
            }
        } */
        return count/33;
    });
    
    let totalMaxDonationPoitns = (Math.round(maxDonationPoints.reduce((a,b) => a+b)/0.5*maxUnitsClanCanDonate.length/33)/10);
    return {
        units: maxUnitsClanCanDonate,
        points: totalMaxDonationPoitns
    }
}

module.exports = {
    checkSiege: checkSiege,
    calculateMaxDonationPoints: calculateMaxDonationPoints
}