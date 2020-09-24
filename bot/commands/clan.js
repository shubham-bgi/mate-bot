const App = require('../../playmate/app.js');

module.exports = {
  name: 'clan',
  description: 'Base info details, shows linked bases.',
  execute(msg, args, embed, msgCollector, bot) {
    console.log(msg.content);
    console.log(args);
    App.getClanCommandDetails(args[0], msg.channel, embed, msg.author, bot);
  },
};
