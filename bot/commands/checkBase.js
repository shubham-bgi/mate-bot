const checkBaseCommandDetails = require('../../playmate/commandDetails').checkBaseCommandDetails;

module.exports = {
    name: 'checkbase',
    description: 'Check base whether it fits the requirements or not.',
    execute(bot, msg, args, Discord, recentUser) {
      console.log(args);
      if(args.length > 0) {
        checkBaseCommandDetails(args[0], msg);
      } else {
          msg.channel.send('Specify the base tag.');
      }
    }
};