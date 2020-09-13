const App = require('../../playmate/app.js');

module.exports = {
    name: 'checkbase',
    description: 'Check base whether it fit requirements or not.',
    execute(msg, args, embed, msgCollector) {
      console.log(args);
      if(args.length > 0) {
        App.checkBaseCommandDetails(args[0], msg, embed);
      } else {
          msg.channel.send('Please specify a base tag.');
      }
    },
};