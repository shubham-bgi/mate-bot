const App = require('../../playmate/app.js');

module.exports = {
    name: 'update',
    description: 'Updates clan details.',
    execute(msg, args, embed, msgCollector, bot) {
      console.log(args);
        App.updateCommandDetails(msg);
    },
};