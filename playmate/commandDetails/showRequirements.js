const registeredClanCollection = require('../dataBase/registeredClanQueries');
const {requirementsEmbed} = require('../multipleUse/embed');
class ShowRequirements {
    async showRequirementsCommandDetails(argument, msg, embed) {
        let regClanDetails = await registeredClanCollection.getByDiscordID(msg.guild.id);
        if(!regClanDetails) { 
            msg.channel.send('There are no clan requirements linked with this server. Use ``setreq`` command to set them up.'); 
            return; 
        }
        msg.channel.send(requirementsEmbed(regClanDetails, embed));
    }
}
module.exports = {
    ShowRequirements
}