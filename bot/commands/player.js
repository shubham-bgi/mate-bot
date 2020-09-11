const App = require('../../playmate/app.js');

module.exports = {
    name: 'player',
    description: 'Shows all the bases and clans link to the mentioned player.',
    execute(msg, args, embed, msgCollector) {
      console.log(args);
      if(args.length > 0) {
        App.FetchPlayersBasesAndClans(args[0], msg.channel,msg.guild);
      }
      //msg.channel.send('Get the clan details');
    }
}