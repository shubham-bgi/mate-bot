const standardWarStars = { 
                            "1" : "50",
                            "2" : "50",
                            "3" : "50",
                            "4" : "50",
                            "5" : "50",
                            "6" : "75",
                            "7" : "150",
                            "8" : "250",
                            "9" : "400",
                            "10": "700",
                            "11": "1000",
                            "12": "1200",
                            "13": "1450" 
                        }

function getPlayerWarTag(playerDetails){
    let warStarsDeviation = getStarsDeviation(playerDetails.warStars,playerDetails.townHallLevel);

    if(warStarsDeviation > 1.5)
        status = 'War Addict';
    else if(warStarsDeviation > 1)
        status = 'War Player';
    else if(warStarsDeviation > 0.7)
        status = 'Casual War Player';
    else if(warStarsDeviation > 0.5)
        status = 'Not really into war';
    else 
        status = 'War Noob';

    return{
        status: status,
        deviation: warStarsDeviation
    }
}

function getStarsDeviation(warStars,townHallLevel) {
    return warStars/standardWarStars[townHallLevel];
}

module.exports = {
    getPlayerWarTag
}