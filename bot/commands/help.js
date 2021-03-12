module.exports = {
    name: 'help',
    description: 'Help user figure out bot',
    execute(bot, msg, args, Discord, recentUser, prefix) {
      const embed = new Discord.RichEmbed();
      console.log(args);
      if (args.length == 0) {
        embed.setColor('#2f3136');
        embed.setTitle('Playmate Command List');
        embed.addField('🔗 Link','``' + prefix + 'help link``');
        embed.addField('🏹 Recruiting','``' + prefix + 'help recruit``');
        embed.addField('👩🏼‍🤝‍🧑🏿 Searching', '``' + prefix + 'help search``');
        embed.addField('⚙️ Config', '``' + prefix + 'help config``');
        msg.channel.send(embed);
      } else if(args[0].toLowerCase() == 'link') {
        embed.setColor('#2f3136');
        embed.setTitle('🔗 Link Commands');
        embed.setDescription(`Bookmark bases or clans with your id.`);
        embed.addField(prefix + 'addbase <your base tag>/removebase', 'Links/unlinks base with user.');
        embed.addField(prefix + 'addclan <your clan tag>/removeclan [ADMIN ONLY]', 'Links/unlinks clan with server.');
        embed.addField(prefix + 'base/clan', 'Shows all linked bases/clans.');
        msg.channel.send(embed);
      } else if(args[0].toLowerCase() == 'recruit') {
        embed.setColor('#2f3136');
        embed.setTitle('🏹 Clan Recruiter\'s Commands');
        embed.setDescription(`Find players from all over discord.`);
        embed.addField(prefix + 'setreq [ADMIN ONLY]', 'Set minimum base requirements for your clan.');
        embed.addField(prefix + 'startsearch/stopsearch [ADMIN ONLY]', 'Stops or starts search for your clan.');
        embed.addField(prefix + 'delreq [ADMIN ONLY]', 'Delete your clan requirements.');
        embed.addField(prefix + 'showreq', 'Shows your clan requirements.');
        embed.addField(prefix + 'update', 'Updates your clan details with us.');
        embed.addField(prefix + 'checkbase', 'Check any base if it passes your clan requirements.');
        msg.channel.send(embed);
      } else if(args[0].toLowerCase() == 'search') {
        embed.setColor('#2f3136');
        embed.setTitle('👩🏼‍🤝‍🧑🏿 Searching clan Commands');
        embed.setDescription(`Find best clans from all over discord.`);
        embed.addField(prefix + 'needclan', 'Find best clan for you in one command.');
        embed.addField(prefix + 'needfwa', 'Find best War farming clan for you.');
        embed.addField(prefix + 'lb', 'Shows top 10 clans on discord.')
        msg.channel.send(embed);
      } else if(args[0].toLowerCase() == 'config') {
        embed.setColor('#2f3136');
        embed.setTitle('⚙️ Config Commands');
        embed.setDescription(`Get and set the bot.`);
        embed.addField(prefix + 'invite', 'Get bot related links.');
        embed.addField(prefix + 'prefix', 'Change prefix of the bot.');
        msg.channel.send(embed);
      }
    } 
}
