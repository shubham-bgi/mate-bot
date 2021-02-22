const leaderBoard = require('../../playmate/commandDetails').leaderBoard;

module.exports = {
    name: 'lb',
    description: 'Shows the top 10 clans.',
    execute(bot, msg, args, Discord, recentUser) {
      console.log(args);
      const embed = new Discord.RichEmbed();
      leaderBoard(msg, embed);
    } 
}