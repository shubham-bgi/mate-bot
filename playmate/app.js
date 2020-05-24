const Algo = require('./algo');
const RushedAlgo = Algo.RushedAlgo;
const ActiveAlgo = Algo.ActiveAlgo;

const Utils = require('./utils.js');
const Constants = require('./constants.js');

const Api = require('./api.js');

const readJson = Utils.readJson;
const writeJsonClanData = Utils.writeJsonClanData;
const readJsonClanData = Utils.readJsonClanData;
const getUrl = Utils.getUrl;



//activeAlgo.checkClanActive('#9RL9CJQV');
//activeAlgo.check('#LVJVJ2QL');

let playerTag = 'Y8JCPRYU9';
let clanTag = '#9RL9CJQV';
let playerName = 'bibyeo';
//let playerDetails = readJson(`./json/data/${clanTag}/${playerTag}-${playerName}.json`);
let rushedAlgo = new RushedAlgo();
let activeAlgo = new ActiveAlgo();

playerTag = '#LOYJOJOO8';
playerTag = '#8CPVOPRJ9';

(function init() {
    getTopClanDetails(Constants.TOP_PLAYER_CLAN_TAG);
})();

function getTopClanDetails(topClanTag) {
    Api.getClanDetails(topClanTag)
    .then( clanData => {
        Api.getAllPlayerDetails(clanData)
        .then( allPlayersData => {
            allPlayersData = allPlayersData.map((playerData) => {
                return playerData.data;
            })
            writeJsonClanData(Constants.TOP_PLAYER_CLAN_TAG, { clanData: clanData, playersData: allPlayersData });
        })
    })
}

//getPlayerCommandDetails(playerTag, undefined)


function getPlayerCommandDetails(playerTag, botMsgChannel) {
    Api.getPlayerDetails(playerTag)
        .then( playerDetails => {
            getMetricForPlayer(playerDetails, botMsgChannel);``
        });
}

function getClanCommandDetails(clanTag, botMsgChannel) {
    Api.getClanDetails(clanTag)
        .then( clanData => {
            Api.getAllPlayerDetails(clanData)
            .then( allPlayersData => {
                getMetriceForAllPlayersOfClan(allPlayersData, clanData, botMsgChannel);
            })
        })
}

function getMetriceForAllPlayersOfClan(allPlayersData, clanData, botMsgChannel) {
    //console.log(allPlayersData);
    //console.log(clanData);
    //console.log(allPlayersData.length);

    const rushedMetrics = rushedAlgo.checkClanRushed(allPlayersData);
    console.log('********* Rushed Metrics ************');
    console.log(rushedMetrics);

    const activeMetric = activeAlgo.getActiveMetricForClan(readJsonClanData(Constants.TOP_PLAYER_CLAN_TAG).playersData, allPlayersData);
    console.log('******** Active Metrics *********');
    console.log(activeMetric);

    const pushMetric = trophyPush.checkTrophyPushType(allPlayersData);
    console.log('********* Trophy Push Metrics ************');
    console.log(pushMetric);

    if(!botMsgChannel) { return; }
    botMsgChannel.send("You are "+ rushedMetrics.status);
    botMsgChannel.send("Rushed stats "+ rushedMetrics.clanRushPercentage);
    botMsgChannel.send("Your clan activeness "+ activeMetric);
    botMsgChannel.send("Trophy Push stat "+ pushMetric);
}


function getMetricForPlayer(playerDetails, botMsgChannel) {
        const result = rushedAlgo.checkRushed(playerDetails);
        console.log(result);
        if(!botMsgChannel) { return; }
        botMsgChannel.send("You are "+result.status);
        botMsgChannel.send("Rushed stats"+result.metrics);
}

module.exports = {
    getPlayerCommandDetails: getPlayerCommandDetails,
    getClanCommandDetails: getClanCommandDetails
}
