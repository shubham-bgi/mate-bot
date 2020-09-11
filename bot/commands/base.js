const App = require('../../playmate/app.js');
const e = require('express');

module.exports = {
  name: 'base',
  description: 'Base info details, shows linked bases.',
  execute(msg, args, embed) {
    console.log(msg.content);
    if(args.length > 0) {
      args = args.join(" ");
      console.log(args);
      App.getBaseCommandDetails(args, msg.channel, embed, msg.author);
    }
    else {
      App.getBaseCommandDetails('', msg.channel, embed, msg.author);
    }
  },
};

