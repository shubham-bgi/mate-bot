const checkBaseCommandDetails = require('../../playmate/commandDetails').checkBaseCommandDetails;

module.exports = {
    name: 'checkbase',
    description: 'Check base whether it fits the requirements or not.',
    execute(bot, msg, args, Discord, recentUser) {
      console.log(args);
      const embed = new Discord.RichEmbed();
      if(args.length > 0) {
        checkBaseCommandDetails(args[0], msg, embed);
      } else {
          msg.channel.send('Specify the base tag.');
      }
    }
};