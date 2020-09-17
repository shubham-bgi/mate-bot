const App = require('./../../playmate/app.js');

module.exports = {
    name: 'invite',
    description: 'Invites user to playmate server and send playmate bot invite link.',
    execute(msg, args, embed, msgCollector, bot, embed2, embed3, talkedRecently) {
      console.log(args);
        App.inviteCommandDetails(msg, embed, msgCollector, bot, embed2, embed3, talkedRecently);
    } 
}