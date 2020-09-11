const Api = require('./api');
const Utils = require('./utils');
const readJson = Utils.readJson;
let count = 0;
let clans = readJson('./json/FWAclans.json')

checkFWA(clans);

async function checkFWA(clans) {
    clanTags = Object.keys(clans);
    for (let i=0 ; i<clanTags.length ; i++) {
        let clanData = await Api.getClanDetails(clanTags[i]);
        console.log(clanData.description, '\n');
        let x = clanData.description.search(/fwa/i);
        let x1 = clanData.description.search(/farming war alliance/i);
        let x2 = clanData.description.search(/farm war alliance/i);
        let x3 = clanData.description.search(/farmwaralliance/i);
        let x4 = clanData.description.search(/f.w.a/i);
        if ( x != -1 || x1 != -1 || x2 != -1 || x3 != -1) {
            count ++;
            console.log(count, '\n');
        }
    }
    console.log('Is in description', count);
    console.log('Total', clanTags.length);
}