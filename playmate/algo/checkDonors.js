const Olf = require('../multipleUse/oneLineFunctions');
const {siegeNames, notToInclude, troopNames, spellNames} = require('../standardData/checkDonors.json');
//const memberDetails = require('./testDataAllPlayersDetails.json');
//calculateMaxDonationPoints(memberDetails, 10);
function checkSiege(memberDetails){
    let countPoints;
    let totalPoints = 0;
    let siegePoints = memberDetails.map((playerDetails) => {
        playerDetails = playerDetails.data;
        countPoints = 0
        playerDetails.troops.map((troop) => {
            if(siegeNames.includes(troop.name)) countPoints+=0.25;
        })
        return countPoints;
    })
    siegePoints = Olf.removeElement(siegePoints, 0);
    if(siegePoints.length > 0)
    {
        totalPoints = siegePoints.reduce((a,b) => a+b) * Math.max(...siegePoints);
    }
    return {
        count: siegePoints.length,
        points: Math.round(totalPoints/0.5)/10
    }
}

function calculateMaxDonationPoints(memberDetails, clanLevel) {
    let donationLevelUpgrade = 0;
    if(clanLevel >= 10) 
    donationLevelUpgrade = 2;
    else if(clanLevel >= 5) 
    donationLevelUpgrade = 1;
    let maxUnitsClanCanDonate = [];
    let troopCount = 0;
    let siegeCount = 0;
    let spellCount = 0;
    let totalUnitsCount = siegeNames.length + troopNames.length + spellNames.length;
    let maxDonationPoints = memberDetails.map(playerDetails => {
        playerDetails = playerDetails.data;
        let count = 0;
        let donationLevel;
        for(i = 0; i < playerDetails.troops.length; i++) {
            donationLevel = playerDetails.troops[i].level + donationLevelUpgrade;
            if (playerDetails.troops[i].village === 'home' && !notToInclude.includes(playerDetails.troops[i].name)) {
                if (donationLevel >= playerDetails.troops[i].maxLevel) {
                    count++;
                    if(maxUnitsClanCanDonate.indexOf(playerDetails.troops[i].name) === -1) {
                        maxUnitsClanCanDonate.push(playerDetails.troops[i].name);
                    }
                }
            }
        }
        for(j = 0; j < playerDetails.spells.length; j++) {
            donationLevel = playerDetails.spells[j].level + donationLevelUpgrade;
            if (playerDetails.spells[j].village === 'home' && !notToInclude.includes(playerDetails.spells[j].name)) {
                if(donationLevel >= playerDetails.spells[j].maxLevel) {
                    count++;
                    if(maxUnitsClanCanDonate.indexOf(playerDetails.spells[j].name) === -1) {
                        maxUnitsClanCanDonate.push(playerDetails.spells[j].name);
                    }
                }
            }
        }

        return count/totalUnitsCount;
    });

    maxUnitsClanCanDonate.map(unit => {
        if(troopNames.includes(unit)) {
            troopCount++;
        }
        if(siegeNames.includes(unit)) {
            siegeCount++;
        }
        if(spellNames.includes(unit)) {
            spellCount++;
        }
    })
    
    let troopStatus = troopCount.toString() + '/' + troopNames.length.toString();
    let siegeStatus = siegeCount.toString() + '/' + siegeNames.length.toString();
    let spellStatus = spellCount.toString() + '/' + spellNames.length.toString();
    //console.log(troopStatus,siegeStatus, spellStatus);
    //console.log(maxUnitsClanCanDonate);
    let totalMaxDonationPoitns = (Math.round(maxDonationPoints.reduce((a,b) => a+b)/0.5*maxUnitsClanCanDonate.length/totalUnitsCount)/10);//totalpoints and then multipllying it with the percentage of different type of units whole clan can donate
    return {
        units: maxUnitsClanCanDonate,
        points: totalMaxDonationPoitns,
        troopStatus: troopStatus,
        siegeStatus: siegeStatus,
        spellStatus: spellStatus
    }
}

module.exports = {
    checkSiege: checkSiege,
    calculateMaxDonationPoints: calculateMaxDonationPoints
}