const registeredClanCollection = require('../dataBase/registeredClanQueries');
const {topClansEmbed} = require('../multipleUse/embed')
async function leaderBoard(msg, embed) {
    const topClans = await registeredClanCollection.leaderBoard();
    msg.channel.send(topClansEmbed(topClans, embed));
}

module.exports = {
    leaderBoard: leaderBoard
}