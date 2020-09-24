const App = require('../../playmate/app.js');

module.exports = {
    name: 'startsearch',
    description: 'Start searching players back for a clan.',
    execute(msg, args, embed, msgCollector) {
      console.log(args);
        App.startSearchingCommandDetails(args[0], msg, embed, msgCollector);
    },
};