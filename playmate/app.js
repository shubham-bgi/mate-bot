
import ActiveAlgo from './activeAlgo.js';
import RushedAlgo from './rushedAlgo.js';

import { readJson, getUrl } from './utils.js';
import Constants from './constants.js';

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

getPlayerDetails(playerTag, checkedForRush);

function checkedForRush(playerDetails) {
    rushedAlgo.checkRushed(playerDetails);
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
