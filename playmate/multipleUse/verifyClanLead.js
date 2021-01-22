const verifiedClanCollection = require('../dataBase/verifiedClanQueries');

async function verifyClanLead(discordId, clanDetails) {
    const verifiedClan = await verifiedClanCollection.getByDiscordId(discordId); 
    if(verifiedClan && verifiedClan.clans.some(clan =>{ clan.tag === clanDetails.tag})){
        return true;
    } else if(clanDetails.description.toLowerCase().search( "pm" + discordId.substr(discordId.length - 4)) != -1) {
        const clanToBeAdded = [{
            name: clanDetails.name,
            tag: clanDetails.tag
        }]
        let numberOfDocsModified = await verifiedClanCollection.updateByDiscordId(discordId, clanToBeAdded);
        if(numberOfDocsModified.n == 0) {
            const newClanToBeAdded = {
                discordID: discordId,
                clans: clanToBeAdded
            }
            verifiedClanCollection.pushNewClan(newClanToBeAdded);
        }
        return true;
    } else {
        console.log('hwer');
        return false;
    }
}

module.exports = {
    verifyLead : verifyClanLead
}