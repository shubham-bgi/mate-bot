const Api = require('../api');
const {baseEmbed} = require('../multipleUse/embed');
const {fixTag} = require('../multipleUse/fixTag');
const {getMetricForBase} = require('../multipleUse/points');
const {listBases} = require('../multipleUse/listBases');
const {baseTypes} = require('../standardData/types.json');
class Base{ 
    async getBaseCommandDetails(argument, msg, bot, Discord) {
        const embed = new Discord.RichEmbed();
        const botMsgChannel = msg.channel;
        if(!argument || baseTypes.includes(argument.toLowerCase())) {
            const question = "Do you want info on any base?\n Type the corresponding number or ``no``";
            const noBaseFoundText = "No base are currently linked with you. Use ``addbase`` command.";
            const baseTag = await listBases(argument, msg, embed, question, noBaseFoundText);
            if(!baseTag) { return; }
            this.getBaseCommandDetails(baseTag, msg, bot, Discord);
        } else {
            argument = fixTag(argument);
            const baseDetails = await Api.getPlayerDetails(argument);
            if(!baseDetails) { botMsgChannel.send('Base Tag is incorrect.'); return;}
            const baseMetric = getMetricForBase(baseDetails);
            msg.channel.send(baseEmbed(baseMetric, baseDetails, embed, bot));
        }
    }
}

module.exports = {
    Base
}