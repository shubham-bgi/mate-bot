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
                    console.log('Error status '+ error.response.status);
                    console.log(`*********** Got Error for player tag ${playerTag} *********`);
                });
    }

     static getClanMembersDetails(clanTag) {
        const url =  getUrl(Constants.clanByTagUrl) + encodeURIComponent(clanTag) + Constants.playersByClanTagUrl;
        return Constants.axios.get(url)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.log(error);
                });
    }

    static getClanDetails(clanTag) {
        const url =  getUrl(Constants.clanByTagUrl) + encodeURIComponent(clanTag);
        return Constants.axios.get(url)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.log(error);
                });
    }

    static getWarLog(clanTag) {
        const url =  getUrl(Constants.clanByTagUrl) + encodeURIComponent(clanTag) + Constants.warLogByTagUrl;
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
                    console.log(errors);
                })
    }

    static createPlayerRequest(playerTag) {
        const url = getUrl(Constants.playerByTagUrl) + playerTag ;
        return Constants.axios.get(url);
    }
}

module.exports = {
    getPlayerDetails: Api.getPlayerDetails,
    getClanMembersDetails: Api.getClanMembersDetails,
    getClanDetails: Api.getClanDetails,
    getAllPlayerDetails: Api.getAllPlayerDetails,
    getWarLog: Api.getWarLog
}