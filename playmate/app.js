const Algo = require('./algo');
const RushedAlgo = Algo.RushedAlgo;

console.log(RushedAlgo);

const Utils = require('./utils.js');
const  Constants = require('./constants.js');

const readJson = Utils.readJson;
const getUrl = Utils.getUrl;

//let activeAlgo = new ActiveAlgo();

//activeAlgo.checkClanActive('#9RL9CJQV');
//activeAlgo.check('#LVJVJ2QL');

let playerTag = 'Y8JCPRYU9';
let clanTag = '9RL9CJQV';
let playerName = 'bibyeo';
//let playerDetails = readJson(`./json/data/${clanTag}/${playerTag}-${playerName}.json`);
let rushedAlgo = new RushedAlgo();

playerTag = '#LOYJOJOO8';
playerTag = '#8CPVOPRJ9'

function getPlayerCommandDetails(playerTag, botMsgChannel) {
    getPlayerDetails(playerTag, checkedForRush(botMsgChannel));
}

function checkedForRush(botMsgChannel) {
    return (playerDetails) => {
        const result = rushedAlgo.checkRushed(playerDetails);
        botMsgChannel.send("You are "+result.status);
        botMsgChannel.send("Rushed stats"+result.metrics);
    }
}

 function getPlayerDetails(playerTag, successCallback) {
    const url = getUrl(Constants.playerByTagUrl) + encodeURIComponent(playerTag) ;
    Constants.axios.get(url)
    .then(response => {
        //console.log(`********* Player ${response.data.name} *************`);
        successCallback(response.data);
    })
    .catch(error => {
        console.log(error.response);
        console.log(`*********** Got Error for player tag ${playerTag} *********`);
    });
}

module.exports = {
    getPlayerCommandDetails: getPlayerCommandDetails
}
