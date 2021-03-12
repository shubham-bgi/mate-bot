const NeedClan = require('../../playmate/commandDetails').NeedClan;
const needClan = new NeedClan();
module.exports = {
    name: 'needfwa',
    aliases: ['nf', 'fwachahiye'],
    description: 'Searches clan.',
    execute(bot, msg, args, Discord, recentUser, prefix) {
      console.log(args);
      needClan.iNeedAClanCommandDetails(args[0], msg, bot, Discord, recentUser, true, prefix);
    },
};