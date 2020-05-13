let playerTownHallLevel = ['8','8','8','8','8','8'];
let townHallCount = {};
let count;
let high = 0;
let mid = 0;
let low = 0;
let flag = 0;
let predominantTownHallLevel = 0;

    for (let i=0;i<playerTownHallLevel.length;i++) {
        let townHall = playerTownHallLevel[i];
        if(!townHallCount[townHall]){
            townHallCount[townHall] = 1;
        } 
        else {
            townHallCount[townHall]++;
        }
    }

console.log(townHallCount);

for (townHall=1;townHall<=13;townHall++){
    if(townHallCount[townHall] == playerTownHallLevel.length){
        console.log('Only Town hall ' + townHall+'s' ) 
        flag = 1;
    }
}

if (flag == 0){
    for (townHall=11;townHall<=13;townHall++){
        if(townHallCount[townHall] > 0)
            high = 1;
    }

    for (townHall=8;townHall<=10;townHall++){
        if(townHallCount[townHall] > 0)
            mid = 1;
    }

    for (townHall=1;townHall<=7;townHall++){
        if(townHallCount[townHall] > 0)
            low = 1;
    }

    if(high==1 && mid==0 && low==0)
        console.log('High level Town halls');
    if(high==0 && mid==1 && low==0)
        console.log('Mid level Town halls');
    if(high==0 && mid==0 && low==1)
        console.log('Low level Town halls');
    if(high==1 && mid==1 && low==0)
        console.log('Mid to high level Town halls');
    if(high==0 && mid==1 && low==1)
        console.log('Low to mid level Town halls');
    if(high==1 && low==1)
        console.log('All level Town halls');

    for (key in townHallCount){
        if (predominantTownHallLevel < townHallCount[key])
            predominantTownHallLevel = key;
        
    }


 //   predominantTownHallLevel = townHallCount[1];
 //   for (townHall=1;townHall<=13;townHall++){
 //       if (predominantTownHallLevel < townHallCount[townHall]){  
//            predominantTownHallLevel = townHall;
 //       }
 //   }
    console.log('Predominant Town hall levels - '+ predominantTownHallLevel)
}