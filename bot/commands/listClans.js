const App = require('../../playmate/app.js');

module.exports = {
    name: 'listclans',
    description: 'List all the bases linked to the id.',
    execute(msg, args, embed, msgCollector, bot, embed2, embed3, talkedRecently, embed4, embed5 ) {
    console.log(args);
    if (!args[0] || args[0].toLowerCase() == 'main' || args[0].toLowerCase() == 'mini' || args[0].toLowerCase() == 'feeder' || args[0].toLowerCase() == 'frnds' || args[0].toLowerCase() == 'allies' || args[0].toLowerCase() == 'no') {
      App.listClansCommandDetails(args[0], msg, msgCollector, embed, embed2, embed3, embed4, embed5);
    } else  {
      msg.channel.send(`Wrong type. Availble types: \`\`main\`\`, \`\`mini\`\`,\`\`feeder\`\`, \`\`frnds\`\`, \`\`allies\`\`, \`\`sister\`\` and \`\`no\`\`.`)
    }
  }
};