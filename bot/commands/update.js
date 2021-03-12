const Update = require('../../playmate/commandDetails').Update;
const update = new Update();
module.exports = {
    name: 'update',
    aliases: ['upd8'],
    description: 'Updates clan details.',
    execute(bot, msg, args, Discord, recentUser) {
      console.log(args);
        update.updateCommandDetails(msg);
    },
};