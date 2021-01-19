const RemoveClan = require('../../playmate/commandDetails').RemoveClan;
const removeClan = new RemoveClan();
module.exports = {
  name: 'removeclan',
  description: 'Removes base from the database, from your discord Id.',
  execute(bot, msg, args, Discord, recentUser) {
  if (!msg.member.hasPermission("ADMINISTRATOR")){
    msg.channel.send('Admin only.');
    return;
  }
  console.log(args);
  const embed = new Discord.RichEmbed();
  removeClan.pullRemoveClanCommandDetails(args[0], msg, embed);
  }
}