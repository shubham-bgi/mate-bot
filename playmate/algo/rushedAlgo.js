const Utils = require('../utils');
const readJson = Utils.readJson;

console.log(readJson);

class RushedAlgo {
    constructor()  {
        this.troopsMaxLevels = readJson('json/troops.json');
        this.spellsMaxLevels = readJson('json/spells.json');
        this.herosMaxLevels = readJson('json/heros.json');
    }

    checkClanRushed(allPlayerDetails) {
        let clanPlayerRush = [];
        //console.log(allPlayerDetails);
        allPlayerDetails.map(playerDetails =>{
            clanPlayerRush.push(this.checkRushed(playerDetails.data));
        })
        console.log(clanPlayerRush);
        let percentagePerPlayer = 100/clanPlayerRush.length;
        //console.log(percentagePerPlayer);
        let clanRushPercentage = 0;
        
        for (let i = 0;i < clanPlayerRush.length;i++){
            clanRushPercentage += percentagePerPlayer*clanPlayerRush[i].metrics;
        }
        clanRushPercentage = Math.round(clanRushPercentage/100);
        console.log('Clan Rush percentage ' + clanRushPercentage);
        return {
            clanRushPercentage: clanRushPercentage
        }
    }

    checkRushed(playerDetails) {
        this.playDetails = playerDetails;
        this.townHallLevel = this.playDetails.townHallLevel;
        this.compareLabLevel = this.townHallLevel - 3;

        this.rushedCount = 0;
        this.nonRushedCount = 0;
        this.notChecked = [];
        this.checked = [];
        this.status = '';

        if(this.compareLabLevel < 1) {
            console.log(`Rushed cannot be checked for
                        townhall level ${this.townhallLevel}
                        of player ${this.playDetails.tag} - ${this.playDetails.name}`);
            return;
        }

        console.log('\n********* Troops check:');
        this.fetchTroopsRushedCount(this.playDetails.troops, this.troopsMaxLevels);
        console.log('\n********* Heroes check:');
        this.fetchTroopsRushedCount(this.playDetails.heroes, this.herosMaxLevels);
        console.log('\n********* Spells check:');
        this.fetchTroopsRushedCount(this.playDetails.spells, this.spellsMaxLevels);

        if(this.rushedCount == 0) {
            this.status = "NON RUSHED";
            this.metrics = 100;
        } else  if(this.nonRushedCount == 0) {
            this.status = "RUSHED";
            this.metrics = 0;
        } else {
            this.metrics =  Math.round((this.nonRushedCount/ this.checked.length) * 100);
            this.status = "SEMI RUSHED";
        }

        return {
            metrics: this.metrics,
            status: this.status
        }

    }

    display(rushedMetrics) {
        console.log(`Rushed Count ${rushedMetrics.rushedCount}`);
        console.log(`Non rushed count ${rushedMetrics.nonRushedCount}`);
        console.log(`Not checked ${JSON.stringify(rushedMetrics.notChecked)}`);
        console.log(`Checked ${JSON.stringify(rushedMetrics.checked)}`);
        console.log(`Metrics ${rushedMetrics.metrics}`);

        return rushedMetrics;
    }

    fetchTroopsRushedCount(weapons, weaponMaxLevels) {


        console.log("Total count "+ weapons.length);
        for(let weapon of weapons) {
            const weaponName = weapon.name;
            const weaponLevel = weapon.level;
            const maxWeaponLevel = this.getWeaponMaxLevel(weaponName, weaponMaxLevels);

            if(!maxWeaponLevel) {
                this.notChecked.push(weaponName);
                continue;
            } else if (weaponLevel < maxWeaponLevel) {
                this.checked.push(weaponName);
                this.rushedCount++;
            } else {
                this.checked.push(weaponName);
                this.nonRushedCount++;
            }
        }
    }

    getWeaponMaxLevel(weaponName, weaponMaxLevels) {
        const weaponExist = weaponMaxLevels[weaponName];
        return weaponExist && weaponExist[this.compareLabLevel.toString()];
    }
}

module.exports = {
    RushedAlgo
}