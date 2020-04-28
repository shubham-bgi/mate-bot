import Constants from './constants.js';
import { getUrl } from './utils.js';

const playerByTagUrl = Constants.playerByTagUrl;
const playersByClanTagUrl = Constants.playersByClanTagUrl;
const clanByTagUrl = Constants.clanByTagUrl;
const axios = Constants.axios;

export default class ActiveAlgo {

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