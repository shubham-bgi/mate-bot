const AddClan = require('../../playmate/commandDetails').AddClan;
const addClan = new AddClan();
module.exports = {
  name: 'addclan',
  description: 'Links clan to the discord server.',
  execute(bot, msg, args, Discord, recentUser, prefix) {
    if (!msg.member.hasPermission("ADMINISTRATOR")){
      msg.channel.send('Admin only');
      return;
    }
    if(args.length > 0) {
      console.log(args[0]);
      addClan.pushAddClanCommandDetails(args[0], msg);
    } else {
      msg.channel.send(`Usage: \`\`${prefix}addclan <your clan tag>\`\``)
    }
  }
}