const invite = require('../../playmate/commandDetails').invite;

module.exports = {
    name: 'invite',
    aliases: ['inv', 'aamantran'],
    description: 'Invites user to playmate server and send playmate bot invite link.',
    execute(bot, msg, args, Discord, recentUser) {
      console.log(args);
      const embed = new Discord.RichEmbed();
      invite(msg, embed);
    } 
}