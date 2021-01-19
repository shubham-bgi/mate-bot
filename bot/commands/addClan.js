const AddClan = require('../../playmate/commandDetails').AddClan;
const addClan = new AddClan();
module.exports = {
  name: 'addclan',
  description: 'Links clan to the discord server.',
  execute(bot, msg, args, Discord, recentUser) {
    if (!msg.member.hasPermission("ADMINISTRATOR")){
      msg.channel.send('Admin only');
      return;
    }
    if(args.length > 0) {
      console.log(args[0]);
      addClan.pushAddClanCommandDetails(args[0], msg);
    } else {
      msg.channel.send('Which clan to add bruh? Specify the clan tag.')
    }
  }
}