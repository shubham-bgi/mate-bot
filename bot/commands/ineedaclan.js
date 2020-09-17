const App = require('./../../playmate/app.js');

module.exports = {
    name: 'ineedaclan',
    description: 'Searches best clan for you.',
    execute(msg, args, embed, msgCollector, bot, embed2, embed3, talkedRecently) {
      console.log(args);
      if(args.length > 0) {
        App.iNeedAClanCommandDetails(args[0], msg, embed, msgCollector, bot, embed2, embed3, talkedRecently);
      }
      else {
        msg.channel.send('Please specify the base tag.');
      }
    },
};