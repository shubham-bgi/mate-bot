module.exports = {
    name: 'help',
    description: 'Help user figure out bot',
    execute(bot, msg, args, Discord, recentUser) {
      const embed = new Discord.RichEmbed();
      console.log(msg.content);
      console.log(args);
      if (args.length == 0) {
       embed.setColor('#ff00ff');
       embed.setTitle('Playmate Command List');
       embed.addField('🔗 Link','``-help link``');
       embed.addField('🏹 Recruiting','``-help recruit``');
       embed.addField('👩🏼‍🤝‍🧑🏿 Searching', '``-help search``');
        msg.channel.send(embed1);
      }
      else if(args[0].toLowerCase() == 'link') {
       embed.setColor('#ff00ff');
       embed.setTitle('🔗 Link Commands');
       embed.setDescription(`Bookmark bases or clans with your id.`);
       embed.addField('-addbase/-removebase', 'Links/unlinks base with user.');
       embed.addField('-addclan/-removeclan [ADMIN ONLY]', 'Links/unlinks clan with server.');
       embed.addField('-base/-clan', 'Shows all linked clan or base.');
       embed.addField('-invite', 'Get invite links.');
        msg.channel.send(embed1);
      }
      else if(args[0].toLowerCase() == 'recruit') {
       embed.setColor('#ff00ff');
       embed.setTitle('🏹 Clan Recruiter\'s Commands');
       embed.setDescription(`Find players from all over discord.`);
       embed.addField('-setreq [ADMIN ONLY]', 'Set requirements for your clan.');
       embed.addField('-startsearch/-stopsearch [ADMIN ONLY]', 'Stops or starts search for your clan.');
       embed.addField('-showreq', 'Shows your clan requirements.');
       embed.addField('-delreq [ADMIN ONLY]', 'Delete your clan requirements.');
       embed.addField('-update', 'Updates your clan details with us.');
        //embed1.addField('-checkbase', 'Check any base if it passes your clan requirements.');
        msg.channel.send(embed1);
      }
      else if(args[0] == 'search') {
       embed.setColor('#ff00ff');
       embed.setTitle('👩🏼‍🤝‍🧑🏿 Searching clan Commands');
       embed.setDescription(`Find best clans from all over discord.`);
       embed.addField('-needclan', 'Find best clan for you in one command.');
        msg.channel.send(embed1);
      }
    } 
}