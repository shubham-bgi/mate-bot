const App = require('../../playmate/app.js');

module.exports = {
    name: 'showrequirements',
    description: 'Start searching players back for a clan.',
    execute(msg, args, embed, msgCollector) {
      console.log(args);
        App.showRequirementsCommandDetails(args[0], msg, embed);
    },
};