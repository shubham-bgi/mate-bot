const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM3Mjg5Yjg4LTc5MDUtNGMyNy1hYTkyLWY5NjliZDY3MDYwMSIsImlhdCI6MTU4NzU3MzE5OSwic3ViIjoiZGV2ZWxvcGVyL2IxZTc5YjQzLTZjZTgtNGViOS1mYTYyLWEyYmEyNWQ1OTIyMSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExNS45OS4xMjQuMTIxIiwiMTY1LjIyNS4xMjUuNDciXSwidHlwZSI6ImNsaWVudCJ9XX0.jFSxvhttCQ8vJ_EQh493sBnI_10rsvc-mm9IWHXs5h8R_VH-nQHSxn8KeNf5WKTqQzjhnzbRNW8WHedbpUCx3A';
const cocUrl = 'https://api.clashofclans.com/v1';
const clanDetailsUrl= getUrl('/v1/clans/%239rl9cjqv');
const playerDetailsUrl = getUrl();
const axios = require('axios');
axios.defaults.headers.common['Authorization'] = token;
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
//getClanDetails();
//getPlayerDetails();
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('H');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
function getClanDetails() {
  axios.get(clanDetailsUrl)
  .then(response => {
    checkClanActive(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}
function getPlayerDetails() {
  axios.get(playerDetailsUrl)
  .then(response => {
    checkPlayerActive(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}
function checkPlayerActive(response) { 
}
function checkClanActive(data) {
    console.log(data);
}
function getUrl(relativeUrl) {
	return cocUrl+relativeUrl;
} 


const clanByTagUrl = '/clans/';
const playersByClanTagUrl = '/members';
//members
//donations + donationsReceived each person, tag

const playerByTagUrl = '/players/'
//attackWins - total all attack wins


var ActiveAlgo = function() {

    let clanDonations = 0;
    let clanAttackWins = 0;
    let playersCount;
    let count = 0;
    let playerActive = 0;

    function checkClanActive(clanTag) {
        console.log('******************');
        getClanDetails(clanTag);
    }

    function getClanDetails(clanTag) {
        const url =  getUrl(clanByTagUrl) + encodeURIComponent(clanTag) + playersByClanTagUrl;
        axios.get(url)
        .then(response => {
            console.log('Clan Players Count: ' + response.data.items.length);
            playersCount = response.data.items.length;
            getAllPlayerDetails(response.data.items);
        })
        .catch(error => {
            console.log(error);
        });
    }

    function getAllPlayerDetails(players) {
        players.map((player) => {
            getPlayerDetails(encodeURIComponent(player.tag));
        })
    }

    function getPlayerDetails(playerTag) {
        const url = getUrl(playerByTagUrl) + playerTag ;
        axios.get(url)
        .then(response => {
            //console.log(`********* Player ${response.data.name} *************`);
            calculate(response.data);
        })
        .catch(error => {
            console.log(error.response);
            console.log(`*********** Got Error for player tag ${playerTag} *********`);
        });
    }

    function calculate(playerDetails) {
        clanDonations += playerDetails.donations + playerDetails.donationsReceived;
        clanAttackWins += playerDetails.attackWins;
        count++;
        if(playerDetails.attackWins > 185) {
            playerActive += 1;
        }
        if(count == playersCount) {
            console.log("Clan donations: "+clanDonations);
            console.log("Clan Attack Wins: "+clanAttackWins);
            console.log("Average donations: " + clanDonations/playersCount);
            console.log("Average Attack wins: " + clanAttackWins/playersCount);
            console.log("Player more than 185 attack wins " + playerActive);
        }
    }

    return {
        check: checkClanActive
    }

}

let activeAlgo = new ActiveAlgo();

//activeAlgo.check('#9RL9CJQV');
activeAlgo.check('#LVJVJ2QL');