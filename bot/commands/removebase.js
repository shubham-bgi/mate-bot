const App = require('../../playmate/app.js');

module.exports = {
  name: 'removebase',
  description: 'Removes base from the database, from your discord Id.',
  execute(msg, args, embed, msgCollector) {
    console.log(args);
    if(args.length > 0) {
      App.pullRemoveBaseCommandDetails(args[0], msg.channel, msg.author);
    } else {
      msg.channel.send('Specify the base tag you wanna remove.')
    }
  }
}