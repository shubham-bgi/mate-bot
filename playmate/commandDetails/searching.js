const registeredClanCollection = require('../dataBase/registeredClanQueries');
const adminConfig = require('../standardData/adminConfig');
class Searching {
    async searchingCommandDetails(argument, msg, setTo) {
        if (argument && !adminConfig.discordId.includes(msg.author.id)) {
            return;
        } else if(argument && adminConfig.discordId.includes(msg.author.id)) {
            let numberOfDocsModified = await registeredClanCollection.setSearchByAdmin(argument, setTo);
            if(numberOfDocsModified.n > 0) {
                if(setTo)
                msg.channel.send(argument + ` have been started for searching.`);
                else
                msg.channel.send(argument + ` have been stopped for searching.`);
            } else {
                msg.channel.send(argument + ` can't find this id.`);
            }
        } else {
            let regClanDetails = await registeredClanCollection.getByDiscordID(msg.guild.id);
            if(!regClanDetails) { 
                msg.channel.send('First set a clan for search bro. Use command ``setreq``.'); 
                return; 
            }
            if(setTo){
                if(!regClanDetails.areDetailsUpdated) { 
                    msg.channel.send('Your clan details are not updated. Please make clan war log public and then use ``update`` command.')
                    return; 
                }
                if(!regClanDetails.searchSetByAdmin) {
                    msg.channel.send(`Your search have been stopped by the mods. Contact support server for more info.`); 
                return; 
                }
            }
            let numberOfDocsModified = await registeredClanCollection.setSearchByUser(msg.guild.id, setTo);
            if(numberOfDocsModified.nModified > 0) {
                if(setTo)
                msg.channel.send(regClanDetails.clanDetails.name + ` search re-started.`);
                else
                msg.channel.send(regClanDetails.clanDetails.name + ` search stopped.`);
            } else {
                if(setTo)
                msg.channel.send(regClanDetails.clanDetails.name + ` search is already on.`);
                else
                msg.channel.send(regClanDetails.clanDetails.name + ` search is already off.`);
            }
        }
    }
}
module.exports = {
    Searching
}