const registeredClanCollection = require('../dataBase/registeredClanQueries');
const 
async function leaderBoard(msg, embed) {
    const topClans = await registeredClanCollection.leaderBoard();


}