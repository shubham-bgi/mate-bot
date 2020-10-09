const App = require('./../../playmate/app.js');

module.exports = {
    name: 'topfive',
    description: 'Searches top five clans for you.',
    execute(msg, args, embed, msgCollector, bot, embed2, embed3, talkedRecently, embed4, embed5) {
      console.log(args);
      if(args.length > 0) {
        App.topFiveCommandDetails(args[0], msg, embed, msgCollector, bot, embed2, embed3, talkedRecently, embed4, embed5, false);
      }
      else {
        msg.channel.send('Specify the base tag.');
      }
    },
};