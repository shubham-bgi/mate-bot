const App = require('../../playmate/app.js');

module.exports = {
    name: 'updateall',
    description: 'Updates all clan details.',
    execute(msg, args, embed, msgCollector, bot) {
        console.log(args);
        App.updateAllClanDetailsCommandDetails(msg, bot);
    },
};