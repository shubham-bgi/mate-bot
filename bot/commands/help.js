const { MessageEmbedField } = require("discord.js");
const e = require("express");
const Olf = require('./../../playmate/oneLineFunctions')

module.exports = {
    name: 'help',
    description: 'Help user figure out bot',
    execute(msg, args, embed, msgCollector, bot, embed2) {
      /* console.log(msg.content);
      console.log(args);
      if (args.length == 0) {
        embed.setColor('#ff00ff');
        embed.setTitle('Playmate Command List');
        embed.addField('🔗 Link','``-help link``');
        embed.addField('🏹 Statisticks','``-help stats``');
        embed.addField('👩🏼‍🤝‍🧑🏿 Friends', '``-help friends``');
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

      embed.setColor('#ff00ff');
      embed.setTitle('Link Commands');
      embed.setDescription(`Bookmark bases or clans with your id and get info.\n${Olf.fetchEmoji(bot, "758604706498347019")}`);
      /* embed.addField('-activity', 'Shows most to least active players in your clan'); */
      embed.addField('-addbase/-removebase/-addclan/-removeclan', 'Links and unlinks base or clan with your discord id.');
      embed.addField('-base', 'Shows main base\'s info unless you provide a base tag.');
      embed.addField('-listbases/-listclans', 'Lists all of your bases or clans linked with you,\n unless you specify the type.')
      embed.addField('-clan', 'Shows main clan\'s info unless you provide a clan tag.');
      embed.addField('-invite', 'Get invite links.');
      
      embed2.setColor('#ff00ff');
      embed2.setTitle('Friends Commands');
      embed2.setDescription(`Find players or clans from all over discord.\n${Olf.fetchEmoji(bot, "758604706498347019")}`);
      embed2.addField('-looking4clanmates', 'Register your clan to search players on discord.');
      embed2.addField('-ineedaclan', 'Find best clan for you in one command');
      embed2.addField('-startsearch/-stopsearch', 'Stops or starts search for your clan.');
      embed2.addField('-showreq', 'Shows your clan requirements.');
      embed2.addField('-delreq', 'Delete your clan requirements.');
      embed2.addField('-update', 'Updates your clan details with us.');
      embed2.addField('-checkbase', 'Check any base if it passes your clan requirements.');
      msg.channel.send(embed);
      msg.channel.send(embed2);
    }
}