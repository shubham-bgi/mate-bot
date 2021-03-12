const {fixTag} = require('../multipleUse/fixTag');
const clanCollections = require('../dataBase/clanQueries');
const regesteredClanCollection = require('../dataBase/registeredClanQueries');
const {clanTypes} = require('../standardData/types.json');
const {listClans} = require('../multipleUse/listClans');
class RemoveClan {
    async pullRemoveClanCommandDetails(argument, msg, embed){
        if(!argument || clanTypes.includes(argument.toLowerCase())) {
            const question = "Which one?\n Type the corresponding number or ``no``.";
            const noClansFoundText = "No clan currently linked with this server.";
            const clan = await listClans(argument, msg, embed, question, undefined, noClansFoundText);
            if(!clan){ return; }
            const clanTag = clan.tag;
            this.pullRemoveClanCommandDetails(clanTag, msg)
        } else {
            argument = fixTag(argument);
            let regClanDetails = await regesteredClanCollection.getByDiscordID(msg.guild.id);
            if(regClanDetails[0] && regClanDetails.clanDetails.tag == argument) {
                msg.channel.send('This clan can\'t be removed, as this clan is also registered to search for players. Use ``-delreq`` first.')
                return;
            }
            let numberOfDocsModified = await clanCollections.pullOldClanByClanTag(msg.guild.id, argument);
            if (numberOfDocsModified.nModified > 0) {
                msg.channel.send('Successfully removed.');
            } else {
                msg.channel.send('No clan found with that tag.');
            }
        }
    }
}

module.exports = {
    RemoveClan
}