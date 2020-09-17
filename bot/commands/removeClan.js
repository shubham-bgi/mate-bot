const App = require('../../playmate/app.js');

module.exports = {
  name: 'removeclan',
  description: 'Removes base from the database, from your discord Id.',
  execute(msg, args, embed, msgCollector) {
    console.log(args);
    if(args.length > 0) {
      App.pullRemoveClanCommandDetails(args[0], msg.channel,msg.author);
    } else {
      msg.channel.send('Specify the clan tag you wanna remove.')
    }
  }
}