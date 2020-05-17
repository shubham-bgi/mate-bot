const App = require('./../../playmate/app.js');

module.exports = {
    name: 'clan',
    description: 'Clan info details',
    execute(msg, args) {
      console.log(msg.content);
      console.log(args);
      if(args.length > 0) {
        App.getClanCommandDetails(args[0], msg.channel);
      }
      msg.channel.send('Get the clan details');
    },
  };
  