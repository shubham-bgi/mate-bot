const App = require('../../playmate/app.js');

module.exports = {
  name: 'addclan',
  description: 'Links clan to the database, with your discord Id.',
  execute(msg, args, embed, msgCollector) {
    console.log(args);
    if(args.length > 0) {
      App.pushAddClanCommandDetails(args[0], msg.channel, msg.author, msgCollector, msg);
    } else {
      msg.channel.send('Which clan to add bruh? I don\'t see any tags with it?')
    }
  }
}