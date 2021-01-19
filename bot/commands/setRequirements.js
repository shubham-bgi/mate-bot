const SetRequirements = require('../../playmate/commandDetails').SetRequirements;
const setRequirements = new SetRequirements();
module.exports = {
    name: 'setreq',
    description: 'Registers your clan to get desired clan mates',
    execute(bot, msg, args, Discord, recentUser) {
      console.log(args);
      if (!msg.member.hasPermission("ADMINISTRATOR")){
        msg.channel.send('Admin only command.');
        return;
      }
      const embed = new Discord.RichEmbed();
      setRequirements.lookingForClanMatesCommandDetails(args[0], msg, embed, bot);
    },
};