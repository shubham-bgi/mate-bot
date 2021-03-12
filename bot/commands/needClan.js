const NeedClan = require('../../playmate/commandDetails').NeedClan;
const needClan = new NeedClan();
module.exports = {
    name: 'needclan',
    aliases: ['nc', 'clanchahiye'],
    description: 'Searches clan.',
    execute(bot, msg, args, Discord, recentUser, prefix) {
      console.log(args);
      needClan.iNeedAClanCommandDetails(args[0], msg, bot, Discord, recentUser, false, prefix);
    },
};