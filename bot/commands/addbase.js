const App = require('../../playmate/app.js');

module.exports = {
  name: 'addbase',
  description: 'Links base to the database, with your discord Id.',
  execute(msg, args, embed, msgCollector) {
    console.log(args);
    if(args.length > 0) {
      App.pushAddBaseCommandDetails(args[0], msg.channel,msg.author, msgCollector, msg);
    } else {
      msg.channel.send('Which base to add bruh? I don\'t see any tags with it or am i blind?')
    }
  }
}