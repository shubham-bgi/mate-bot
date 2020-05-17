const Constants = require('../constants.js');
const Utils =  require('../utils.js');

const getUrl = Utils.getUrl;
const playerByTagUrl = Constants.playerByTagUrl;
const playersByClanTagUrl = Constants.playersByClanTagUrl;
const clanByTagUrl = Constants.clanByTagUrl;
const axios = Constants.axios;

class ActiveAlgo {

    constructor() {
        this.clanDonations = 0;
        this.clanAttackWins = 0;
        this.playersCount;
        this.count = 0;
        this.playerActive = 0;
    }

     checkClanActive(clanTag) {
        console.log('******************');
        this.getClanDetails(clanTag);
    }

     getClanDetails(clanTag) {
        const url =  getUrl(clanByTagUrl) + encodeURIComponent(clanTag) + playersByClanTagUrl;
        axios.get(url)
        .then(response => {
            console.log('Clan Players Count: ' + response.data.items.length);
            this.playersCount = response.data.items.length;
            this.getAllPlayerDetails(response.data.items);
        })
        .catch(error => {
            console.log(error);
        });
    }

     getAllPlayerDetails(players) {
        players.map((player) => {
            this.getPlayerDetails(encodeURIComponent(player.tag));
        })
    }

     getPlayerDetails(playerTag) {
        const url = getUrl(playerByTagUrl) + playerTag ;
        axios.get(url)
        .then(response => {
            //console.log(`********* Player ${response.data.name} *************`);
            this.calculate(response.data);
        })
        .catch(error => {
            console.log(error.response);
            console.log(`*********** Got Error for player tag ${playerTag} *********`);
        });
    }

    getActiveAlgoParametersForClan( playerDetails ) {
        this.clanDonations = 0;
        this.clanAttackWins = 0;
        this.playersCount = playerDetails.length;
        playerDetails.forEach( playerDetail => {
            playerDetail = playerDetail.data || playerDetail;
            this.clanDonations += playerDetail.donations + playerDetail.donationsReceived;
            this.clanAttackWins += playerDetail.attackWins;
        });

        console.log('Clan donations' + this.clanDonations);
        console.log('Clan attack wins' +  this.clanAttackWins);

        return {
            clanDonations: this.clanDonations/this.playersCount,
            clanAttackWins: this.clanAttackWins/this.playersCount
        }
    }

    getActiveMetricForClan( topClanPlayerDetails, playerDetails) {
        console.log("**** Top clan *****");
        let topClanParamters = this.getActiveAlgoParametersForClan(topClanPlayerDetails);
        console.log("**** Clan ***")
        let clanParameters = this.getActiveAlgoParametersForClan(playerDetails);

        let attackWinsDiversionFromTopClan = clanParameters.clanAttackWins / topClanParamters.clanAttackWins;
        let clanDonationDiversionFromTopClan = clanParameters.clanDonations / topClanParamters.clanDonations;

        console.log('Attack wins diversion '+ attackWinsDiversionFromTopClan);
        console.log('Donations diversion' + clanDonationDiversionFromTopClan);

        return (attackWinsDiversionFromTopClan * 0.5 + clanDonationDiversionFromTopClan * 0.5);
    }

     calculate(playerDetails) {
        this.clanDonations += playerDetails.donations + playerDetails.donationsReceived;
        this.clanAttackWins += playerDetails.attackWins;
        this.count++;
        if(playerDetails.attackWins > 185) {
            this.playerActive += 1;
        }
        if(this.count == this.playersCount) {
            console.log("Clan donations: "+this.clanDonations);
            console.log("Clan Attack Wins: "+this.clanAttackWins);
            console.log("Average donations: " + this.clanDonations/this.playersCount);
            console.log("Average Attack wins: " + this.clanAttackWins/this.playersCount);
            console.log("Player more than 185 attack wins " + this.playerActive);
        }
    }

}

module.exports = {
    ActiveAlgo
}