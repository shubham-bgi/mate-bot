const App = require('../../playmate/app.js');

module.exports = {
    name: 'stopsearch',
    description: 'Stop searching players for a clan.',
    execute(msg, args, embed, msgCollector) {
      console.log(args);
        App.stopSearchingCommandDetails(args[0], msg, embed, msgCollector);
    },
  };