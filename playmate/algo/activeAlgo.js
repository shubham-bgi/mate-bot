class ActiveAlgo {

    getParametersForClan(playerDetails) {
        this.playersCount = playerDetails.length;
        this.totalClanDonationRation = 0;
        this.totalClanAttackWins = 0;
        playerDetails.forEach( playerDetail => {
            playerDetail = playerDetail.data;
            //console.log(playerDetail.donations, '-----------', playerDetail.donationsReceived, '-------------', playerDetail.attackWins);
            this.totalClanDonationRation += playerDetail.donations + playerDetail.donationsReceived;
            this.totalClanAttackWins += playerDetail.attackWins;
        });
        return {
            attackWins: this.totalClanAttackWins/this.playersCount,
            donationRation: this.totalClanDonationRation/this.playersCount
        }
    }

    getParametersForPlayer(playerDetails) {
        return {
            attackWins: playerDetails.attackWins,
            donationRation: playerDetails.donations+playerDetails.donationReceived
        }
    }

    getAttackWinAndDonationPoints(playerDetails, isItForClan) {
        let parameters;
        if(isItForClan) {
            parameters = this.getParametersForClan(playerDetails);
        } else {
            parameters = this.getParametersForPlayer(playerDetails);
        }
        let attackWinsPoints = Math.round(parameters.attackWins / this.standardClanParameters.attackWins*100)/10;
        let donationPoints = Math.round(parameters.donationRation / this.standardClanParameters.donationRation*100)/10;
        return {
            attackWinsPoints: attackWinsPoints,
            donationRationPoints: donationPoints,
            attackWins: Math.round(parameters.attackWins),
            donationRation: Math.round(parameters.donationRation)
        }
    }

    getLastMonthsLastMonday() {
        let d = new Date();
        let y = new Date();
        y.setUTCDate(15)
        y.setMonth(y.getMonth()+1)
        y.setUTCDate(0);
        while (y.getUTCDay() !== 1) { // Roll the days backwards until Monday.
            y.setUTCDate(y.getUTCDate() - 1);
        }
        if(y.getDate() <= d.getDate()) {
            y.setUTCHours(5,0,0,0);
            return y;
        }
        d.setUTCHours(5,0,0,0);
        d.setUTCDate(0);
        while (d.getUTCDay() !== 1) {
        d.setUTCDate(d.getUTCDate() - 1);
        }
        return d; 
    }
    
    calculateTimeDifference () {
        let lastMonthMonday = this.getLastMonthsLastMonday();
        console.log('monday', lastMonthMonday);
        let d = new Date();
        let differnce = (d.getTime() - lastMonthMonday.getTime())/(1000*60*60*24);
        return differnce;
    }
    
    setStandardParameters() {
        const time = this.calculateTimeDifference(); 
        const standardAttacksWonPerDay = 8;
        const standardDonationRationPerDay = 700;
        this.standardClanParameters = {
            attackWins: Math.round(standardAttacksWonPerDay*time),
            donationRation: Math.round(standardDonationRationPerDay*time)
        }
    }
}

module.exports = {
    ActiveAlgo
}