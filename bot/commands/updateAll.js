const updateAll = require('../../playmate/commandDetails').updateAllClanDetailsCommandDetails;
module.exports = {
    name: 'updateall',
    aliases: ['up8a'],
    description: 'Updates all clan details.',
    execute(bot, msg, args, Discord, recentUser) {
        updateAll(msg, bot);
    },
};