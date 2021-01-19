
const UpdateAll = require('../../playmate/commandDetails').UpdateAll;
const updateAll = new UpdateAll();
module.exports = {
    name: 'updateall',
    description: 'Updates all clan details.',
    execute(bot, msg, args, Discord, recentUser) {
        console.log(args);
        updateAll.updateAllClanDetailsCommandDetails(msg, bot);
    },
};