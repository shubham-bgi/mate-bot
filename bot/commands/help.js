const { MessageEmbedField } = require("discord.js");
const e = require("express");

module.exports = {
    name: 'help',
    description: 'Help user figure out bot',
    execute(msg, args, embed) {
      console.log(msg.content);
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
      }
    }
}