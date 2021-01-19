const Clan = require('../../playmate/commandDetails').Clan;
const clan = new Clan();
module.exports = {
  name: 'clan',
  description: 'Base info details, shows linked bases.',
  execute(bot, msg, args, Discord, recentUser) {
    console.log(args);
    clan.getClanCommandDetails(args[0], msg, bot, Discord);
  }
};
