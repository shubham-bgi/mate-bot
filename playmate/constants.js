const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImI0ZjhjMWMxLTI1ODItNGM3My04ZmFjLTE1ZDY4Y2RmOWM0NCIsImlhdCI6MTU5MzQxMTg5NCwic3ViIjoiZGV2ZWxvcGVyL2IxZTc5YjQzLTZjZTgtNGViOS1mYTYyLWEyYmEyNWQ1OTIyMSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExNS45OS4xMjAuMTYwIl0sInR5cGUiOiJjbGllbnQifV19.kZVJO25b3YM2yym2JDZJCPCMTrUapVteqx8pFXADcYz44rRlv9--MPFoVZAw3zzGrz_qp8u-_FA6FULK23Nh6w';
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
const playmateDiscordInvite = 'https://discord.gg/ZwYxkqu';
const TOWNHALL_MAX = 13;
const LAB_MAX = TOWNHALL_MAX - 2;
const TOP_CLAN_TAG = '#2JGYRJVL';//mega empire
//const TOP_CLAN_TAG = '#lvjvj2ql';//savage skulls


const axios = require('axios');
axios.defaults.headers.common['Authorization'] = token;


const urlTownHall = {
    1 : 'https://vignette.wikia.nocookie.net/clashofclans/images/f/fd/Town_Hall1.png/revision/latest/scale-to-width-down/100?cb=20170827034930',
    2 : 'https://vignette.wikia.nocookie.net/clashofclans/images/7/7d/Town_Hall2.png/revision/latest/scale-to-width-down/100?cb=20170827050036',
    3 : 'https://vignette.wikia.nocookie.net/clashofclans/images/d/dd/Town_Hall3.png/revision/latest/scale-to-width-down/100?cb=20170827050050',
    4 : 'https://vignette.wikia.nocookie.net/clashofclans/images/e/e7/Town_Hall4.png/revision/latest/scale-to-width-down/100?cb=20170827050104',
    5 : 'https://vignette.wikia.nocookie.net/clashofclans/images/a/a3/Town_Hall5.png/revision/latest/scale-to-width-down/100?cb=20170827050118',
    6 : 'https://vignette.wikia.nocookie.net/clashofclans/images/5/52/Town_Hall6.png/revision/latest/scale-to-width-down/100?cb=20170827050220',
    7 : 'https://vignette.wikia.nocookie.net/clashofclans/images/7/75/Town_Hall7.png/revision/latest/scale-to-width-down/100?cb=20170827051024',
    8 : 'https://vignette.wikia.nocookie.net/clashofclans/images/f/fa/Town_Hall8.png/revision/latest/scale-to-width-down/100?cb=20170827051039',
    9 : 'https://vignette.wikia.nocookie.net/clashofclans/images/e/e0/Town_Hall9.png/revision/latest/scale-to-width-down/100?cb=20170827045259',
    10: 'https://vignette.wikia.nocookie.net/clashofclans/images/5/5c/Town_Hall10.png/revision/latest/scale-to-width-down/100?cb=20170827040043',
    11: 'https://vignette.wikia.nocookie.net/clashofclans/images/9/96/Town_Hall11.png/revision/latest/scale-to-width-down/100?cb=20170110011314',
    12: {
        1:'https://vignette.wikia.nocookie.net/clashofclans/images/c/c7/Town_Hall12-1.png/revision/latest/scale-to-width-down/120?cb=20180603203226',
        2:'https://vignette.wikia.nocookie.net/clashofclans/images/2/28/Town_Hall12-2.png/revision/latest/scale-to-width-down/120?cb=20180603203239',
        3:'https://vignette.wikia.nocookie.net/clashofclans/images/2/28/Town_Hall12-3.png/revision/latest/scale-to-width-down/120?cb=20180603203254',
        4:'https://vignette.wikia.nocookie.net/clashofclans/images/2/28/Town_Hall12-4.png/revision/latest/scale-to-width-down/120?cb=20180603203306',
        5:'https://vignette.wikia.nocookie.net/clashofclans/images/7/7c/Town_Hall12-5.png/revision/latest/scale-to-width-down/120?cb=20180603203336'
    },
    13: {
        1:'https://vignette.wikia.nocookie.net/clashofclans/images/9/98/Town_Hall13-1.png/revision/latest/scale-to-width-down/120?cb=20191212010602',
        2:'https://vignette.wikia.nocookie.net/clashofclans/images/a/a0/Town_Hall13-2.png/revision/latest/scale-to-width-down/120?cb=20191212010602',
        3:'https://vignette.wikia.nocookie.net/clashofclans/images/1/17/Town_Hall13-3.png/revision/latest/scale-to-width-down/120?cb=20191212010603',
        4:'https://vignette.wikia.nocookie.net/clashofclans/images/7/78/Town_Hall13-4.png/revision/latest/scale-to-width-down/120?cb=20191212010603',
        5:'https://vignette.wikia.nocookie.net/clashofclans/images/1/10/Town_Hall13-5.png/revision/latest/scale-to-width-down/120?cb=20191212010604'
    }
}

module.exports = { 
                 cocUrl, clanByTagUrl, playerByTagUrl, warLogByTagUrl, playersByClanTagUrl, axios, TOP_CLAN_TAG, urlTownHall, playmateDiscordInvite
                };