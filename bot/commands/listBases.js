const App = require('../../playmate/app.js');

module.exports = {
    name: 'listbases',
    description: 'List all the bases linked to the id.',
    execute(msg, args, embed, msgCollector, bot, embed2, embed3, talkedRecently, embed4, embed5 ) {
      console.log(args);
    if (!args[0] || args[0].toLowerCase() == 'main' || args[0].toLowerCase() == 'mini' || args[0].toLowerCase() == 'dono' || args[0].toLowerCase() == 'no' || args[0].toLowerCase() == 'frnds') {
      App.listBasesCommandDetails(args[0], msg, embed, msgCollector, embed2,  embed3, embed4, embed5);
    } else  {
      msg.channel.send(`Wrong type.Availble types: \`\`main\`\`, \`\`mini\`\`, \`\`dono\`\`,\`\`frnds\`\` and \`\`no\`\`.`)
    }
  }
};