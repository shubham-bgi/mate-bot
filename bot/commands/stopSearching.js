const Searching = require('../../playmate/commandDetails').Searching;
const searching = new Searching();
module.exports = {
    name: 'stopsearch',
    aliases: ['stosrc', 'srcband'],
    description: 'Stop searching players for a clan.',
    execute(bot, msg, args, Discord, recentUser) {
      const embed = new Discord.RichEmbed();
      if (!msg.member.hasPermission("ADMINISTRATOR")){
        msg.channel.send('Admin only command.');
        return;
      }
      console.log(args);
      searching.searchingCommandDetails(args[0], msg, false, embed);
    },
  };