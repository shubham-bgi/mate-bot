const checkBaseCommandDetails = require('../../playmate/commandDetails').checkBaseCommandDetails;

module.exports = {
    name: 'checkbase',
    aliases: ['chkb'],
    description: 'Check base whether it fits the requirements or not.',
    execute(bot, msg, args, Discord, recentUser, prefix) {
      console.log(args);
      const embed = new Discord.RichEmbed();
      if(args.length > 0) {
        checkBaseCommandDetails(args[0], msg, embed);
      } else {
          msg.channel.send(`Usage: \`\`${prefix}checkbase <player base tag>\`\``);
      }
    }
};