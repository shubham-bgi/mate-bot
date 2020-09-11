const App = require('../../playmate/app.js');

module.exports = {
    name: 'addclan',
    description: 'Links clan to the database, with your discord Id.',
    execute(msg, args, embed, msgCollector) {
      console.log(args);
      if(args.length > 0) {
        App.getClanCommandDetails(args[0], msg.channel, msg.author,embed, msgCollector);
      }
      else {
        msg.channel.send('Please specify clan tag you wanna add.');
      }
    },
  };