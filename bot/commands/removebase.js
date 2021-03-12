const RemoveBase = require('../../playmate/commandDetails').RemoveBase;
const removeBase = new RemoveBase();
module.exports = {
  name: 'removebase',
  aliases: ['rmvb', 'basehta'],
  description: 'Removes base from the database, from your discord Id.',
  execute(bot, msg, args, Discord, recentUser) {
    console.log(args);
    const embed = new Discord.RichEmbed();
    removeBase.pullRemoveBaseCommandDetails(args[0], msg, embed);
    
  }
}