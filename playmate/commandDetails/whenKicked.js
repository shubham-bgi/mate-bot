let registeredClanCollection = require('../dataBase/registeredClanQueries');
async function whenKicked(guild) {
    let noOfDocsModified = await registeredClanCollection.SetAllSearchByUser(guild.id, false);
    console.log(noOfDocsModified);
}

module.exports = {
    whenKicked: whenKicked
}