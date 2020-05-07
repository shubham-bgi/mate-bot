const Utils = require('./utils.js');
const  Constants = require('./constants.js');

const getUrl = Utils.getUrl;

class Api {
    static getPlayerDetails(playerTag) {
        const url = getUrl(Constants.playerByTagUrl) + encodeURIComponent(playerTag) ;
        return Constants.axios.get(url)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.log(error.response);
                    console.log(`*********** Got Error for player tag ${playerTag} *********`);
                });
    }

     static getClanDetails(clanTag) {
        const url =  getUrl(Constants.clanByTagUrl) + encodeURIComponent(clanTag) + Constants.playersByClanTagUrl;
        return Constants.axios.get(url)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.log(error);
                });
    }

    static  getAllPlayerDetails(clanData) {
        let playerRequests = [];
        let players = clanData.items;
        players.map((player) => {
            playerRequests.push(Api.createPlayerRequest(encodeURIComponent(player.tag)));
        })
        return Constants.axios.all(playerRequests)
                .then(Constants.axios.spread((...allPlayersData) => {
                    return allPlayersData;
                }))
                .catch(errors => {
                    console.log(error);
                })
    }

    static createPlayerRequest(playerTag) {
        const url = getUrl(Constants.playerByTagUrl) + playerTag ;
        return Constants.axios.get(url);
    }
}

module.exports = {
    getPlayerDetails: Api.getPlayerDetails,
    getClanDetails: Api.getClanDetails,
    getAllPlayerDetails: Api.getAllPlayerDetails
}