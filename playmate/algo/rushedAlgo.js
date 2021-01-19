class RushedAlgo {
    constructor()  {
        this.maxLevels = require('../standardData/maxUnitLevelByTH.json'); // conatins max units levels at each Townhall level
    }

    checkClanRushed(memberDetails) {
        let totalPlayerNonRushPoints = 0;
        let totalPlayerMaxPoints = 0;
        let x, y;
        memberDetails.map(playerDetails =>{
            x = this.checkRushed(playerDetails.data);
            totalPlayerNonRushPoints+=x.nonRushPoints;
            totalPlayerMaxPoints+=x.maxPoints;
        }) 
        let clanNonRushPoints = Math.round((totalPlayerNonRushPoints/memberDetails.length)*10)/10;
        let clanMaxPoints = Math.round((totalPlayerMaxPoints/memberDetails.length)*10)/10;
        let type = this.getType({nonRushPoints: clanNonRushPoints, maxPoints: clanMaxPoints});
        return {
            nonRushPoints: clanNonRushPoints,
            maxPoints: clanMaxPoints,
            type: type
        }
    }

    checkRushed(playerDetails) {
        this.playerDetails = playerDetails;
        if (this.playerDetails.townHallLevel == 1) {
            return {
                nonRushPoints: 10,
                maxPoints: 10,
                type: 'Maxed'
            }
        }
        this.nonRushedUnitsCount = 0;
        this.maxUnitsCount = 0;
        let maxTroops = this.maxLevels[this.playerDetails.townHallLevel]["troops"];
        let maxHeroes = this.maxLevels[this.playerDetails.townHallLevel]["heroes"];
        let maxSpells = this.maxLevels[this.playerDetails.townHallLevel]["spells"];
        let rushTroops = this.maxLevels[this.playerDetails.townHallLevel - 1]["troops"];
        let rushHeroes = this.maxLevels[this.playerDetails.townHallLevel - 1]["heroes"];
        let rushSpells = this.maxLevels[this.playerDetails.townHallLevel - 1]["spells"];
        this.fetchPlayerMaxUnitsCounts(this.playerDetails.troops,maxTroops);
        if(maxHeroes) {this.fetchPlayerMaxUnitsCounts(this.playerDetails.heroes, maxHeroes)};
        if(maxSpells) {this.fetchPlayerMaxUnitsCounts(this.playerDetails.spells, maxSpells)};
        this.fetchPlayerRushUnitsCounts(this.playerDetails.troops, rushTroops);
        if(rushHeroes) {this.fetchPlayerRushUnitsCounts(this.playerDetails.heroes, rushHeroes)};
        if(rushSpells) {this.fetchPlayerRushUnitsCounts(this.playerDetails.spells, rushSpells)};
        
        let totalPlayerRushUnit = rushTroops.length;
        if(rushHeroes){ totalPlayerRushUnit+=rushHeroes.length }
        if(rushSpells){ totalPlayerRushUnit+=rushSpells.length }
        let totalPlayerMaxUnit = maxTroops.length;
        if(maxHeroes){ totalPlayerMaxUnit+=maxHeroes.length }
        if(maxSpells){ totalPlayerMaxUnit+=maxSpells.length }
        let playerNonRushPoints =  Math.round((this.nonRushedUnitsCount/ totalPlayerRushUnit) * 100)/10;
        let playerMaxPoints = Math.round((this.maxUnitsCount/ totalPlayerMaxUnit) * 100 )/10;
        let type = this.getType({nonRushPoints: playerNonRushPoints, maxPoints: playerMaxPoints});
        return {
            nonRushPoints: playerNonRushPoints,
            maxPoints: playerMaxPoints,
            type: type
        }
    }

    fetchPlayerMaxUnitsCounts(attackUnits, unitMaxLevels) {
        for(let Unit of attackUnits) {
            if(Unit.village != "builderBase") {    
                for(let maxUnit of unitMaxLevels) {
                    if(Unit.name == maxUnit.name) {
                        if(Unit.level >= maxUnit.level) {
                            this.maxUnitsCount++;
                        }
                    }
                }
            }
        }
    }
    fetchPlayerRushUnitsCounts(attackUnits, unitRushLevels) {
        for(let Unit of attackUnits) {
            if(Unit.village != "builderBase") { 
                for(let rushUnit of unitRushLevels) {
                    if(Unit.name == rushUnit.name) {
                        if(Unit.level >= rushUnit.level) {
                            this.nonRushedUnitsCount++;
                        }
                    }
                }
            }
        }
    }

    getType(points) {
        if(points.maxPoints > 9.5 && points.nonRushPoints > 9.5)
            return 'Maxed';
        if(points.maxPoints > 4 && points.nonRushPoints > 9.3)
            return 'Semi Maxed';
        if(points.nonRushPoints > 9.1)
            return 'Non Rushed';
        if(points.nonRushPoints > 4)
            return 'Semi Rushed';
        return 'Rushed';
    }
}
module.exports = {
    RushedAlgo
}