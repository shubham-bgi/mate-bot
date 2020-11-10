const App = require('./../../playmate/app.js');

module.exports = {
    name: 'forward',
    description: 'Searches best clan for you.',
    execute(msg, args, embed, msgCollector, bot, embed2, embed3, talkedRecently, embed4, embed5) {
      console.log(args);
      if(msg.member.hasPermission("ADMINISTRATOR")) {
        App.forwardCommandDetails(args[0], msg, embed, msgCollector, bot, embed2, embed3, talkedRecently, embed4, embed5, false);
      }
      else {
        msg.channel.send('You are not authorised to use this command. Only Admins can use this command.');
      }
    },
};