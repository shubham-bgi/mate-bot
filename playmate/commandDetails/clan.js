const Api = require('../api');
const {clanEmbed} = require('../multipleUse/embed');
const {getMetricsForMembersOfClan} = require('../multipleUse/points');
const {fixTag} = require('../multipleUse/fixTag');
const {listClans} = require('../multipleUse/listClans');
const {clanTypes} = require('../standardData/types.json')
class Clan {
    async getClanCommandDetails(argument, msg, bot, Discord) {
        const embed = new Discord.RichEmbed();
        if(!argument || clanTypes.includes(argument.toLowerCase())) {
            const question = "Do you want info on any of "+ msg.guild.name +" clans?\nType the corresponding number or ``no``.";
            let clan = await listClans(argument, msg, embed, question);
            if(!clan.tag) { return; }
            let clanTag = clan.tag;
            this.getClanCommandDetails(clanTag, msg, bot, Discord); 
        } else {
            argument = fixTag(argument);
            let clanMetrics;
            let clanDetails = await Api.getClanDetails(argument); 
            if(!clanDetails){ 
                msg.channel.send('Clan tag is incorrect.'); 
                return; 
            } 
            let memberDetails = await Api.getMembersDetails(clanDetails);
            if(clanDetails.isWarLogPublic) {
                let warLog = await Api.getWarLog(argument);
                clanMetrics = getMetricsForMembersOfClan(memberDetails, clanDetails, warLog.items);
            } else {
                clanMetrics = getMetricsForMembersOfClan(memberDetails, clanDetails);
            }
            msg.channel.send(clanEmbed(clanDetails, clanMetrics, embed, bot));
        }
    }
}

module.exports = {
    Clan
}