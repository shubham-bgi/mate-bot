const ShowRequirements = require('../../playmate/commandDetails').ShowRequirements;
const showRequirements = new ShowRequirements();
module.exports ={
    name: 'showreq',
    aliases: ['showrequirements', 'showr', 'reqdikha'],
    description: 'Shows you clan requirements.',
    execute(bot, msg, args, Discord, recentUser) {
      console.log(args);
      const embed = new Discord.RichEmbed();
      const embed2 = new Discord.RichEmbed();
      showRequirements.showRequirementsCommandDetails(args[0], msg, embed, embed2);
    },
};