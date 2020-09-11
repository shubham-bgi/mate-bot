const App = require('../../playmate/app.js');

module.exports = {
    name: 'deleterequirements',
    description: 'Deletes your base requirements details',
    execute(msg, args, embed, msgCollector, bot) {
      console.log(args);
        App.deleteRequirementsCommandDetails(args[0], msg, embed, msgCollector, bot);
    },
};