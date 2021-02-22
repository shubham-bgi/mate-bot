const registeredClanCollection = require('../dataBase/registeredClanQueries');
const {requirementsEmbed} = require('../multipleUse/embed');
const {listClans} = require('../multipleUse/listClans')
class ShowRequirements {
    async showRequirementsCommandDetails(argument, msg, embed, embed2) {
        let regClanDetails = await registeredClanCollection.getByDiscordID(msg.guild.id);
        let regClanDetail;
        if(!regClanDetails[0]) { 
            msg.channel.send('There are no clan requirements linked with this server. Use ``setreq`` command to set them up.'); 
            return; 
        } else {
            const question = "Which one?\nType the corresponding number or ``no``.";
            regClanDetail = await listClans(null, msg, embed, question, regClanDetails);
            if(!regClanDetail) { return; }
        }
        msg.channel.send(requirementsEmbed(regClanDetails.filter( clan => {return clan.clanDetails.tag === regClanDetail.tag})[0], embed2));
    }
}
module.exports = {
    ShowRequirements
}