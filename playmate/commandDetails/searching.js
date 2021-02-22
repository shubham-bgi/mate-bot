const registeredClanCollection = require('../dataBase/registeredClanQueries');
const adminConfig = require('../standardData/adminConfig');
const {listClans} = require('../multipleUse/listClans');
class Searching {
    async searchingCommandDetails(argument, msg, setTo, embed) {
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
            let clanTag;
            let clanName;
            let regClanDetail;
            if(!regClanDetails[0]) { 
                msg.channel.send('First set a clan for search. Use command ``setreq``.'); 
                return; 
            } else {
                const question = "Which one?\nType the corresponding number or ``no``.";
                regClanDetail = await listClans(null, msg, embed, question, regClanDetails);
                if(!regClanDetail) { return; }
                clanTag = regClanDetail.tag;
                clanName = regClanDetail.name;
            }
            if(setTo){
                if(!regClanDetails.filter(clan => {return clan.clanDetails.tag === clanTag})[0].areDetailsUpdated) { 
                    msg.channel.send('Your clan details are not updated. Please make clan war log public and then use ``update`` command.')
                    return; 
                }
                if(!regClanDetails.filter(clan => {return clan.clanDetails.tag === clanTag})[0].searchSetByAdmin) {
                    msg.channel.send(`Your search have been stopped by the mods. Contact support server for more info.`); 
                return; 
                }
            }
            let numberOfDocsModified = await registeredClanCollection.setSearchByUser(clanTag, setTo);
            if(numberOfDocsModified.nModified > 0) {
                if(setTo)
                msg.channel.send(clanName + ` search re-started.`);
                else
                msg.channel.send(clanName + ` search stopped.`);
            } else {
                if(setTo)
                msg.channel.send(clanName + ` search is already on.`);
                else
                msg.channel.send(clanName + ` search is already off.`);
            }
        }
    }
}
module.exports = {
    Searching
}