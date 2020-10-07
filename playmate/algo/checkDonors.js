const Olf = require('../oneLineFunctions');
function checkSiege(allPlayersDetails){
    let siegeDonorCount = 0;
    let countPoints;
    let siegePoints = allPlayersDetails.map((playerDetails) => {
        playerDetails = playerDetails.data;
        countPoints = 0
        playerDetails.troops.map((troop) => {
            if(troop.name == 'Wall Wrecker') countPoints+=0.25;
            if(troop.name == 'Stone Slammer') countPoints+=0.25;
            if(troop.name == 'Stone Slammer') countPoints+=0.25;
            if(troop.name == 'Siege Barracks') countPoints+=0.25;
        })
        return countPoints;
    })
    /* siegePoints = Olf.removeElement(siegePoints, 0); */
    console.log(siegePoints);
    let x = siegePoints.reduce((a,b) => a+b);
    console.log(x);
    return "15";
        /* total: siegePoints.length,
        points: siegePoints */
}

module.exports = {
    checkSiege: checkSiege,
}