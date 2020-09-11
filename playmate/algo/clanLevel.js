let playerTownHallLevels;
let townHallCount;
let level;
let predominantTownHallLevel;

function countNumberOfEachTownHall(){
    townHallCount = {};
    for (let i=0;i<playerTownHallLevels.length;i++) {
        let townHall = playerTownHallLevels[i];
        if(!townHallCount[townHall]){
            townHallCount[townHall] = 1;
        } 
        else {
            townHallCount[townHall]++;
        }
    }
}

function getAllPlayerTownHallLevelArray(allPlayerDetails) {
    playerTownHallLevels = [];
    allPlayerDetails.map(playerDetails => {
        playerDetails = playerDetails.data;
        playerTownHallLevels.push(playerDetails.townHallLevel);
    })
}

function getTownHallStatus(allPlayerDetails) {
    let high = 0;
    let mid = 0;
    let low = 0;
    let flag = 0;

    getAllPlayerTownHallLevelArray(allPlayerDetails);
    countNumberOfEachTownHall();
    for (townHall=1;townHall<=13;townHall++){
        if(townHallCount[townHall] == playerTownHallLevels.length){
            level = 'Only Town hall ' + townHall+'s';
            predominantTownHallLevel = townHall;
            flag = 1;
        }
    }

    if (flag == 0){
        for (townHall=11;townHall<=13;townHall++){
            if(townHallCount[townHall] > 0)
                high += townHallCount[townHall];
        }

        for (townHall=8;townHall<=10;townHall++){
            if(townHallCount[townHall] > 0)
                mid += townHallCount[townHall];
        }

        for (townHall=1;townHall<=7;townHall++){
            if(townHallCount[townHall] > 0)
                low += townHallCount[townHall];
        }

        if(high>0 && mid==0 && low==0)
            level = 'High level THs';
        if(high==0 && mid>0 && low==0)
            level = 'Mid level THs';
        if(high==0 && mid==0 && low>0)
            level = 'Low level THs';
        if(high>0 && mid>0 && low==0)
            level = 'Mid to high level THs';
        if(high==0 && mid>0 && low>0)
            level = 'Low to mid level THs';
        if(high>0 && low>0)
            level = 'All level THs';

        let townHalls = Object.keys(townHallCount);
        predominantTownHallLevel = townHalls[0];
        for (let x in townHalls) {
            if (townHallCount[predominantTownHallLevel] < townHallCount[townHalls[x]]){
                predominantTownHallLevel = townHalls[x];
            }
        }
    }

    return {
        level: level,
        predominantTownHall: predominantTownHallLevel,
        high: high,
        mid: mid,
        low: low,
        townHallCount: townHallCount
    }
}

module.exports = {
    getTownHallStatus
}