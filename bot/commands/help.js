const { MessageEmbedField } = require("discord.js");
const e = require("express");
const Olf = require('./../../playmate/oneLineFunctions')

module.exports = {
    name: 'help',
    description: 'Help user figure out bot',
    execute(msg, args, embed, msgCollector, bot, embed2, embed3) {
      console.log(msg.content);
      console.log(args);
      /* if (args.length == 0) {
        embed.setColor('#ff00ff');
        embed.setTitle('Playmate Command List');
        embed.addField('🔗 Link','``-help link``');
        embed.addField('🏹 Statisticks','``-help recruiter``');
        embed.addField('👩🏼‍🤝‍🧑🏿 Friends', '``-help searcher``');
        embed.addField('🥇 Leaderboard', '``-help clan``');
        msg.channel.send(embed);
      }
      else if(args[0].toLowerCase() == 'link') {
        embed.setColor('#ff00ff');
        embed.setTitle('🔗 Link Commands');
        embed.setDescription('``addbase``, ``addclan``, ``removebase``, ``removeclan``');
        embed.setFooter('Use - before each command.');
        msg.channel.send(embed);
      }
      else if(args[0].toLowerCase() == 'stats') {
        embed.setColor('#ff00ff');
        embed.setTitle('🏹 Statistics Commands');
        embed.setDescription('``base``, ``clan``')//, ``player``
        embed.setFooter('Use - before each command.')
        msg.channel.send(embed);
      }
      else if(args[0] == 'friends') {
        embed.setColor('#ff00ff');
        embed.setTitle('👩🏼‍🤝‍🧑🏿 Friends Commands');
        embed.setDescription('``ineedaclan``, ``looking4clanmates``')
        embed.setFooter('Use - before each command.')
        msg.channel.send(embed);
      }
      else if(args[0] == 'clan') {
        embed.setColor('#ff00ff');
        embed.setTitle('🥇 Most to least Commands');
        embed.setDescription('``donations``, ``active``, ``unrushed``');
        embed.setFooter('Use - before each command.')
        msg.channel.send(embed);
      } */

      if (args.length == 0) {
        embed.setColor('#ff00ff');
        embed.setTitle('Playmate Command List');
        embed.addField('🔗 Link','``-help link``');
        embed.addField('🏹 Recruiting','``-help recruit``');
        embed.addField('👩🏼‍🤝‍🧑🏿 Searching', '``-help search``');
        msg.channel.send(embed);
      }
      else if(args[0].toLowerCase() == 'link') {
        embed.setColor('#ff00ff');
        embed.setTitle('🔗 Link Commands');
        embed.setDescription(`Bookmark bases or clans with your id and get info on them.`);
        embed.addField('-addbase/-removebase/-addclan/-removeclan', 'Links and unlinks base or clan with your discord id.');
        embed.addField('-base/-clan', 'Shows main base\'s or clan\'s info unless you provide a base/clan tag.');
        embed.addField('-listbases/-listclans', 'Lists all of your bases or clans linked with you, unless you specify the type.');
        embed.addField('-invite', 'Get invite links.');
        msg.channel.send(embed);
      }
      else if(args[0].toLowerCase() == 'recruit') {
        embed.setColor('#ff00ff');
        embed.setTitle('🏹 Clan Recruiter\'s Commands');
        embed.setDescription(`Find players from all over discord.`);
        embed.addField('-setreq', 'Register your clan and set requirements to search players.');
        embed.addField('-startsearch/-stopsearch', 'Stops or starts search for your clan.');
        embed.addField('-showreq', 'Shows your clan requirements.');
        embed.addField('-delreq', 'Delete your clan requirements.');
        embed.addField('-update', 'Updates your clan details with us.');
        embed.addField('-checkbase', 'Check any base if it passes your clan requirements.');
        msg.channel.send(embed);
      }
      else if(args[0] == 'search') {
        embed.setColor('#ff00ff');
        embed.setTitle('👩🏼‍🤝‍🧑🏿 Searching clan Commands');
        embed.setDescription(`Find best clans from all over discord.`);
        embed.addField('-needclan', 'Find best clan for you in one command.');
        embed.addField('-topfive', 'Top five clans that you can join.');
        /* embed.addField('-needfwa', 'Find best Farm War Alliance clan for you in one command.');
        embed.addField('-topfivefwa', 'Top 5 Farm War Alliance clans that you can join.'); */
        msg.channel.send(embed);
      }
      
      /* embed.setColor('#ff00ff');
      embed.setTitle('Link Commands');
      embed.setDescription(`Bookmark bases or clans with your id and get info on them.\n${Olf.fetchEmoji(bot, "gap")}`);
      embed.addField('-addbase/-removebase/-addclan/-removeclan', 'Links and unlinks base or clan with your discord id.');
      embed.addField('-base/-clan', 'Shows main base\'s or clan\'s info unless you provide a base/clan tag.');
      embed.addField('-listbases/-listclans', 'Lists all of your bases or clans linked with you, unless you specify the type.');
      embed.addField('-invite', 'Get invite links.');
      
      embed2.setColor('#ff00ff');
      embed2.setTitle('Clan Recruiters Commands');
      embed2.setDescription(`Find players from all over discord.\n${Olf.fetchEmoji(bot, "gap")}`);
      embed2.addField('-setreq', 'Register your clan and set requirements to search players.');
      embed2.addField('-startsearch/-stopsearch', 'Stops or starts search for your clan.');
      embed2.addField('-showreq', 'Shows your clan requirements.');
      embed2.addField('-delreq', 'Delete your clan requirements.');
      embed2.addField('-update', 'Updates your clan details with us.');
      embed2.addField('-checkbase', 'Check any base if it passes your clan requirements.');
      
      embed3.setColor('#ff00ff');
      embed3.setTitle('Searching clan Commands');
      embed3.setDescription(`Find best clans from all over discord.\n${Olf.fetchEmoji(bot, "gap")}`);
      embed3.addField('-needclan', 'Find best clan for you in one command.');
      embed3.addField('-topfive', 'Top five clans that you can join.');
      embed3.addField('-needfwa', 'Find best Farm War Alliance clan for you in one command.');
      embed3.addField('-topfivefwa', 'Top 5 Farm War Alliance clans that you can join.');
      msg.channel.send(embed);
      msg.channel.send(embed2);
      msg.channel.send(embed3); */
    } 
}