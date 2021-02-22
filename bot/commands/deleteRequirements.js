const DeleteRequirements = require('../../playmate/commandDetails').DeleteRequirements;
const deleteRequirements = new DeleteRequirements();
module.exports = {
    name: 'delreq',
    description: 'Deletes your base requirements',
    execute(bot, msg, args, Discord, recentUser) {
      const embed = new Discord.RichEmbed();
      if (!msg.member.hasPermission("ADMINISTRATOR")){
        msg.channel.send('Admin only command.');
        return;
      }
      console.log(args);
      deleteRequirements.deleteRequiremetnsCommandDetails(msg, embed);
    },
};