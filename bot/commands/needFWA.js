const App = require('./../../playmate/app.js');

module.exports = {
    name: 'needfwa',
    description: 'Searches Farm War Alliance clan for you.',
    execute(msg, args, embed, msgCollector, bot, embed2, embed3, talkedRecently, embed4, embed5) {
      console.log(args);
      if(args.length > 0) {
        App.needFWACommandDetails(args[0], msg, embed, msgCollector, bot, embed2, embed3, talkedRecently, embed4, embed5);
      }
      else {
        msg.channel.send('Specify the base tag.');
      }
    },
};