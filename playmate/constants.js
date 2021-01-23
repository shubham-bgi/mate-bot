const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjY2OTM2ZjRkLWY4NDAtNGViYy1hN2MwLWEyYjRiMjJlMDU4MyIsImlhdCI6MTYxMTA0NzIwNywic3ViIjoiZGV2ZWxvcGVyL2IxZTc5YjQzLTZjZTgtNGViOS1mYTYyLWEyYmEyNWQ1OTIyMSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExNi43NS4yMTEuNjkiLCIzLjE2LjEwOC4yMTciXSwidHlwZSI6ImNsaWVudCJ9XX0.48IWxzJVOyuHB60LqO8yYHeF92MgNPaeRIe8WzC69U-hEzhFE7rPxBdltHYOwlcgKtymU2t9OPSmlurQVqnp-Q';
const cocUrl = 'https://api.clashofclans.com/v1';
//const clanDetailsUrl= getUrl('/v1/clans/%239rl9cjqv');
//const playerDetailsUrl = getUrl();

const hostname = '127.0.0.1';
const port = 9000;

const dbURL = 'http://'+hostname+':'+port;
const bases = '/bases';
const clans = ''

const clanByTagUrl = '/clans/';
const playersByClanTagUrl = '/members';
const playerByTagUrl = '/players/';
const warLogByTagUrl = '/warlog';
const playmateDiscordInvite = "https://discord.gg/Zh29Kjk";
const playmateInvite = "https://discord.com/oauth2/authorize?client_id=704996785499799582&scope=bot&permissions=805694545";
const TOWNHALL_MAX = 13;
const LAB_MAX = TOWNHALL_MAX - 2;
const TOP_CLAN_TAG = '#2JGYRJVL';//mega empire
//const TOP_CLAN_TAG = '#lvjvj2ql';//savage skulls
const clanInfoUrl = 'https://link.clashofclans.com/en?action=OpenClanProfile&tag=';
const baseInfoUrl = 'https://link.clashofclans.com/en?action=OpenPlayerProfile&tag=';

const axios = require('axios');
axios.defaults.headers.common['Authorization'] = token;

module.exports = { 
                 cocUrl, 
                 clanByTagUrl, 
                 playerByTagUrl, 
                 warLogByTagUrl, 
                 playersByClanTagUrl, 
                 axios, 
                 TOP_CLAN_TAG, 
                 playmateDiscordInvite, 
                 playmateInvite,
                 clanInfoUrl,
                 baseInfoUrl
                };