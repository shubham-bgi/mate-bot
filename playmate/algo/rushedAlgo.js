const Utils = require('../utils');
const readJson = Utils.readJson;

class RushedAlgo {
    constructor()  {
        this.troopsMaxLevels = readJson('json/troops.json'); // conatins max troops levels at each Townhall level
        this.spellsMaxLevels = readJson('json/spells.json'); // contains max spells levels at each Townhall level
        this.herosMaxLevels = readJson('json/heroes.json');   // contains max heroes levels at each Townhall level
    }

    checkClanRushed(allPlayerDetails) {  //checks the rush & max points of whole clan
        let allPlayersRushAndMaxPoints = [];       // Array containing all the players rush points and their statuses in a object with properties playerRushPoints,playerMaxPoints  
        allPlayerDetails.map(playerDetails =>{
            allPlayersRushAndMaxPoints.push(this.checkRushed(playerDetails.data)); //checks each player rush and max points and push into the array
        })
        let percentagePerPlayer = 100/allPlayersRushAndMaxPoints.length; //percentage each person signifies in the clan
        let clanRushPoints = 0;
        let clanMaxPoints = 0;
        
        for (let i = 0;i < allPlayersRushAndMaxPoints.length;i++){ 
            clanRushPoints += percentagePerPlayer*allPlayersRushAndMaxPoints[i].playerRushPoints/100;
            clanMaxPoints += percentagePerPlayer*allPlayersRushAndMaxPoints[i].playerMaxPoints/100;
        }
        clanRushPoints = Math.round(clanRushPoints*10)/10;
        clanMaxPoints = Math.round(clanMaxPoints*10)/10;
        let rushStatus;
        let maxStatus;
        
        if(clanRushPoints == 0){
            rushStatus = 'Totally Rushed';
        } else if( clanRushPoints < 5) {
            rushStatus = 'Mostly Rushed';
        } else if(clanRushPoints < 7) {
            rushStatus = 'Somewhat Non-Rushed';
        } else if(clanRushPoints < 9) {
            rushStatus = 'Mostly Non-Rushed';
        } else if(clanRushPoints < 10) {
            rushStatus = 'Non Rushers';
        } else if(clanRushPoints == 10) {
            rushStatus = 'Only Non Rushers';
        }

        if(clanMaxPoints == 0){
            maxStatus = 'Newbies';
        } else if( clanMaxPoints < 5) {
            maxStatus = 'Mostly Newbies';
        } else if(clanMaxPoints < 7) {
            maxStatus = 'Some Max players';
        } else if(clanMaxPoints < 9) {
            maxStatus = 'Mostly Maxers';
        } else if(clanMaxPoints < 10) {
            maxStatus = 'Maxers';
        } else if(clanMaxPoints == 10) {
            maxStatus = 'Only Maxers';
        }


        return {
            rushStatus: rushStatus,
            clanRushPoints: clanRushPoints,
            clanMaxPoints: clanMaxPoints,
            maxStatus: maxStatus
        }
    }

    checkRushed(playerDetails) {
        this.playDetails = playerDetails;
        this.townHallLevel = this.playDetails.townHallLevel;
        this.compareLabLevelForRush = this.townHallLevel - 3;
        this.compareLabLevelForMax = this.townHallLevel - 2;

        this.rushedUnitsCount = 0;
        this.nonRushedUnitsCount = 0;
        this.maxUnitsCount = 0;
        this.nonMaxUnitsCount = 0;

        this.rushStatus = '';
        this.maxStatus = '';

        let playerRushPoints = 0;

        if(this.compareLabLevelForRush < 1) {
            console.log(`Rushed cannot be checked for
                        townhall level ${this.townhallLevel}
                        of player ${this.playDetails.tag} - ${this.playDetails.name}`);
            //return;
        }

        this.fetchPlayerRushAndMaxUnitsCounts(this.playDetails.troops, this.troopsMaxLevels);
        this.fetchPlayerRushAndMaxUnitsCounts(this.playDetails.heroes, this.herosMaxLevels);
        this.fetchPlayerRushAndMaxUnitsCounts(this.playDetails.spells, this.spellsMaxLevels);
        

        let totalPlayerUnit = this.playDetails.troops.length + this.playDetails.heroes.length + this.playDetails.spells.length;
        
        if(this.rushedUnitsCount == 0) {
            this.rushStatus = "Unrushed base";
            playerRushPoints = 10;
        } else  if(this.nonRushedUnitsCount == 0) {
            this.rushStatus = "Rushed as sh*t";
            playerRushPoints = 0;

        } else {
            playerRushPoints =  Math.round((this.nonRushedUnitsCount/ totalPlayerUnit) * 100)/10;
            if(playerRushPoints < 5) {
                this.rushStatus = "Extremely Rushed";
            } else if(playerRushPoints < 9) {
                this.rushStatus = "A lil' rushed";
            } else {
                this.rushStatus = "Tiny Bit Rushed";
            }
        }

        if(this.nonMaxUnitsCount == 0) {
            this.playerMaxPoints = 10;
            this.maxStatus = "Max out of the fing mind";
        } else if(this.maxUnitsCount == 0){
            this.playerMaxPoints = 0;
            this.maxStatus = "Newbie, you gon' learn";
        } else {
            this.playerMaxPoints = Math.round((this.maxUnitsCount/ totalPlayerUnit) * 100 )/10;
            if(this.playerMaxPoints < 5) {
                this.maxStatus = "Long way to maxing it out";
            } else if(this.playerMaxPoints < 9) {
                this.maxStatus = "Will max out in some time";
            } else {
                this.maxStatus = "Just a tiny bit not max";
            }
        }

        return {
            playerRushPoints: playerRushPoints,
            rushStatus: this.rushStatus,
            playerMaxPoints: this.playerMaxPoints,
            maxStatus: this.maxStatus
        }
    }

    fetchPlayerRushAndMaxUnitsCounts(attackUnits, unitMaxLevels) {
        for(let Unit of attackUnits) {
            const unitName = Unit.name;
            const unitLevel = Unit.level;
            const unitLevelToCheckRush = this.getUnitRushLevel(unitName, unitMaxLevels);
            const unitLevelToCheckMax = this.getUnitMaxLevel(unitName, unitMaxLevels);

            if (unitLevel < unitLevelToCheckRush) {
                this.rushedUnitsCount++;
            } else {
                this.nonRushedUnitsCount++;
                if (unitLevel < unitLevelToCheckMax) {
                    this.nonMaxUnitsCount++;
                } else {
                    this.maxUnitsCount++;
                }
            }
        }
    }

    getUnitRushLevel(unitName, unitMaxLevels) {
        const UnitExist = unitMaxLevels[unitName];
        return UnitExist && UnitExist[this.compareLabLevelForRush.toString()];
    }
    getUnitMaxLevel(unitName, unitMaxLevels) {
        const UnitExist = unitMaxLevels[unitName];
        return UnitExist && UnitExist[this.compareLabLevelForMax.toString()];
    }
}

module.exports = {
    RushedAlgo
}