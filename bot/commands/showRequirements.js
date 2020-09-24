const App = require('../../playmate/app.js');

module.exports = {
    name: 'showreq',
    description: 'Shows you clan requirements.',
    execute(msg, args, embed, msgCollector) {
      console.log(args);
        App.showRequirementsCommandDetails(args[0], msg, embed);
    },
};