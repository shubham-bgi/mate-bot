const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM3Mjg5Yjg4LTc5MDUtNGMyNy1hYTkyLWY5NjliZDY3MDYwMSIsImlhdCI6MTU4NzU3MzE5OSwic3ViIjoiZGV2ZWxvcGVyL2IxZTc5YjQzLTZjZTgtNGViOS1mYTYyLWEyYmEyNWQ1OTIyMSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExNS45OS4xMjQuMTIxIiwiMTY1LjIyNS4xMjUuNDciXSwidHlwZSI6ImNsaWVudCJ9XX0.jFSxvhttCQ8vJ_EQh493sBnI_10rsvc-mm9IWHXs5h8R_VH-nQHSxn8KeNf5WKTqQzjhnzbRNW8WHedbpUCx3A';
const cocUrl = 'https://api.clashofclans.com/v1';
//const clanDetailsUrl= getUrl('/v1/clans/%239rl9cjqv');
//const playerDetailsUrl = getUrl();

const hostname = '127.0.0.1';
const port = 3000;

const clanByTagUrl = '/clans/';
const playersByClanTagUrl = '/members';
const playerByTagUrl = '/players/';

const TOWNHALL_MAX = 13;
const LAB_MAX = 11;

import axios from 'axios';
axios.defaults.headers.common['Authorization'] = token;

export default { 
                 cocUrl, clanByTagUrl, playerByTagUrl, playersByClanTagUrl, axios
                };