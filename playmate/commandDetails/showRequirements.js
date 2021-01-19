const db = require('../dataBase/registeredClanQueries');
const {requirementsEmbed} = require('../multipleUse/embed');
class ShowRequirements {
    async showRequirementsCommandDetails(argument, msg, embed) {
        let baseRequirements = await db.getBaseRequirementsByDiscordID(msg.author.id);
        if(!baseRequirements) { msg.channel.send('Bruh, there are no clan requirements linked with you. Use ``-setreq`` command to set them up.'); return; }
        let storedClanDetails = await db.getClanDetailsByDiscordId(msg.author.id);
        requirementsEmbed(baseRequirements, storedClanDetails, msg.channel, embed);
    }
}
module.exports = {
    ShowRequirements
}