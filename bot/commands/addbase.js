const AddBase = require('../../playmate/commandDetails').AddBase;
const addBase = new AddBase();
module.exports = {
  name: 'addbase',
  description: 'Links base to the user.',
  execute(bot, msg, args, Discord, recentUser, prefix) {
    if(args.length > 0) {
      console.log(args[0]);
      addBase.pushAddBaseCommandDetails(args[0], msg);
    } else {
      msg.channel.send(`Usage: \`\`${prefix}addbase <your base tag>\`\``);
      msg.channel.send('https://youtu.be/hkUzGWSkzOg');
    }
  }
}