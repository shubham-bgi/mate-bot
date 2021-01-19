let playerTownHallLevels;
let townHallCount;
let type;
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

function getAllPlayerTownHallLevelArray(memberDetails) {
    playerTownHallLevels = [];
    memberDetails.map(playerDetails => {
        playerDetails = playerDetails.data;
        playerTownHallLevels.push(playerDetails.townHallLevel);
    })
}

function getTownHallStatus(memberDetails) {
    let high = 0;
    let mid = 0;
    let low = 0;
    let flag = 0;

    getAllPlayerTownHallLevelArray(memberDetails);
    countNumberOfEachTownHall();
    for (townHall=1;townHall<=13;townHall++){
        if(townHallCount[townHall] == playerTownHallLevels.length){
            type = 'Only ' + townHall+'s';
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

        

        let townHalls = Object.keys(townHallCount);
        predominantTownHallLevel = townHalls[0];
        for (let x in townHalls) {
            if (townHallCount[predominantTownHallLevel] < townHallCount[townHalls[x]]){
                predominantTownHallLevel = townHalls[x];
            }
        }

        if(high>0 && mid==0 && low==0)
            type = 'High Level';
        if(high==0 && mid>0 && low==0)
            type = 'Mid Level';
        if(high==0 && mid==0 && low>0)
            type = 'Low Level';
        if(high>0 && mid>0 && low==0)
            type = 'Mid - High Level';
        if(high==0 && mid>0 && low>0)
            type = 'Low - Mid Level';
        if(high>0 && low>0)
            type = 'All Level';
        
        type = type + ', Mostly ' + predominantTownHallLevel + 's'
    }

    return {
        type: type,
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