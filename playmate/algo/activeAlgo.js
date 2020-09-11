const Constants = require('../constants.js');
const Utils =  require('../utils.js');
const player = require('../../bot/commands/base.js');
const initializeActivityParameters = require('F:/playmate/playmate/initializeActivityParameters.js')

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
        let x = (this.clanDonations/this.playersCount);
        let y = (this.clanAttackWins/this.playersCount);
        /* console.log('Clan donations' + x);
        console.log('Clan attack wins' +  y); */

        return {
            clanDonations: this.clanDonations/this.playersCount,
            clanAttackWins: this.clanAttackWins/this.playersCount
        }
    }

    initializeTopClanActiveParameters() {
        this.topClanParamters = initializeActivityParameters.initializeActivityParameters();
    }

    getActiveMetricForClan(playerDetails) {
        //console.log("**** Top clan *****");
        //this.topClanParamters = this.getActiveAlgoParametersForClan(topClanPlayerDetails);
        //console.log("**** Clan ***")

        let clanParameters = this.getActiveAlgoParametersForClan(playerDetails);

        let attackWinsPoints = clanParameters.clanAttackWins / this.topClanParamters.clanAttackWins;
        let clanDonationPoints = clanParameters.clanDonations / this.topClanParamters.clanDonations;

        //console.log('Attack wins diversion '+ attackWinsPoints);
        //console.log('Donations diversion' + clanDonationPoints);

        let activePoints = Math.round((attackWinsPoints*0.5 + clanDonationPoints*0.5)*100)/10;
        let status;
        if (activePoints > 15)
            status = 'Legendary activity';
        else if(activePoints > 10)
            status = 'Broke the activity meter';
        else if(activePoints>7)
            status = 'Extremely Active';
        else if(activePoints>5)
            status = 'Very Active';
        else if(activePoints>2)
            status = 'Fairly Active';
        else if(activePoints>1)
            status = 'Low Activity';
        else if(activePoints == 0)
            status = 'Dead clan';
        else
            status = 'Very Low Activity'
            
        let activityFeel = Math.round(activePoints * this.playersCount / 5) / 10;
        return {
            activityPoints: activePoints,
            activityFeel: activityFeel,
            status: status
        }

    }

    getActiveMetricForPlayer(playerDetails) {
        let attackWinsPoints = playerDetails.attackWins/this.topClanParamters.clanAttackWins;
        let donationPoints = (playerDetails.donations+playerDetails.donationsReceived)/this.topClanParamters.clanDonations;
        let activePoints = (Math.round((attackWinsPoints*0.5 + donationPoints*0.5)*100)/10).toFixed(1);
        let status;
        if (activePoints > 15)
            status = 'Legendary activity';
        else if(activePoints > 10)
            status = 'Broke the activity meter';
        else if(activePoints>9)
            status = 'Extremely Active';
        else if(activePoints>7)
            status = 'Very Active';
        else if(activePoints>5)
            status = 'Active';
        else if(activePoints>2)
            status = 'Low Activity';
        else if(activePoints == 0)
            status = 'Dead Base';
        else 
            status = 'Very Low Activity';

        return {
            activityPoints: activePoints,
            status: status
        }
    }

    getClanActivityLeaderBoard(clanDetails) {
        let activityLeaderboard = clanDetails.map((playerDetails) => {
            return {
                name: playerDetails.name,
                tag: playerDetails.tag,
                activityPoints: this.getActiveMetricForPlayer(playerDetails)
            }
        })
        activityLeaderboard.sort((firstPlayer,secondPlayer) => secondPlayer.activityPoints.activityPoints - firstPlayer.activityPoints.activityPoints);
    return activityLeaderboard;
    }



     calculate(playerDetails) {
        this.clanDonations += playerDetails.donations + playerDetails.donationsReceived;
        this.clanAttackWins += playerDetails.attackWins;
    }

}

module.exports = {
    ActiveAlgo
}