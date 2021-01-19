const Base = require('../../playmate/commandDetails').Base;
const base = new Base();
module.exports = {
  name: 'base',
  description: 'Base info details, shows linked bases.',
  execute(bot, msg, args, Discord, recentUser) {
    console.log(args);
    base.getBaseCommandDetails(args[0], msg, bot, Discord);
  }
};

