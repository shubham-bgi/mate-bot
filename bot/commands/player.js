const App = require('./../../playmate/app.js');

module.exports = {
    name: 'player',
    description: 'Player info details',
    execute(msg, args) {
      console.log(msg.content);
      console.log(args);
      if(args.length > 0) {
        App.getPlayerCommandDetails(args[0], msg.channel);
      }
      msg.channel.send('Get the details');
    },
  };
  