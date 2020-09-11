const App = require('../../playmate/app.js');

module.exports = {
  name: 'removebase',
  description: 'Removes base from the database, with your discord Id.',
  execute(msg, args, embed, msgCollector) {
    console.log(args);
    if(args.length > 0) {
      App.pullRemoveBaseCommandDetails(args[0], msg.channel,msg.author);
    } else {
      msg.channel.send('Bruh, What should I remove? oh yea, I have an idea. Me from this server.')
    }
  }
}