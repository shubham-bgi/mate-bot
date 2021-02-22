const NeedClan = require('../../playmate/commandDetails').NeedClan;
const needClan = new NeedClan();
module.exports = {
    name: 'needfwa',
    description: 'Searches clan.',
    execute(bot, msg, args, Discord, recentUser) {
      console.log(args);
      needClan.iNeedAClanCommandDetails(args[0], msg, bot, Discord, recentUser, true);
    },
};