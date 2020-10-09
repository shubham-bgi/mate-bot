const App = require('../../playmate/app.js');

module.exports = {
    name: 'setreq',
    description: 'Registers your clan to get desired clan mates',
    execute(msg, args, embed, msgCollector, bot) {
      console.log(args);
      if(args.length > 0) {
        App.lookingForClanMatesCommandDetails(args[0], msg, embed, msgCollector, bot);
      }
      else {
        msg.channel.send('Specify clan tag with it.');
      }
    },
};