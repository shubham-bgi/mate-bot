let siegeDonorCount;


function checkSiege(allPlayersDetails){
    siegeDonorCount = 0;
    allPlayersDetails.map((playerDetails) => {
        playerDetails = playerDetails.data;
        playerDetails.troops.map((troop) => {
            if(troop.name == 'Wall Wrecker'){
                siegeDonorCount ++;
            }
        })
    })
    return siegeDonorCount;
}

module.exports = {
    checkSiege: checkSiege,
}