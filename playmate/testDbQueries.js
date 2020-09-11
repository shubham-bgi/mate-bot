const db = require('./db');
/* start(231501403934162940);
function start(discordId) {
    db.getBasesByDiscordId(discordId)
    .then( base => {
        console.log(base);
    })
}


async function start(discordId) {
let x = await db.getBasesByDiscordId(discordId);
console.log(x);
}
 */

let discordId = 231501403934162940;
let type = 'dono';
start(discordId, type);
async function start(discordId, type) {
    let x = await db.getBaseByType(discordId, type);
    console.log(x);
}

/* let base1 = [{
    tag: '#kljdjaa',
    type: 'main1'
}]

start(231501403934162940, base1);

async function start(discordId, base1) {
let x = await db.updateBasesByDiscordId(discordId, base1);
console.log(x);
} */



/* 
let baseToBePushed = {
    discordId: 55544454577878,
    bases: [{
        tag: '#asdfaaaaaa',
        type: 'main'
    }]
}

start(baseToBePushed);

function start(baseToBePushed) {
    console.log(db.pushNewBase(baseToBePushed));
} */