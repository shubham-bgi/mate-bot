const { MessageEmbedField } = require("discord.js");
const e = require("express");

module.exports = {
    name: 'help',
    description: 'Help user figure out bot',
    execute(msg, args, embed) {
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
      /* msg.channel.send('-looking4clanmates : Set minimum requirements for your clan, register to search for players.

      -ineedaclan : gives you the best clan you can join in one command.
      
      -startsearching/-stopsearching : For clan recruiters, to stop search or start back.
      
      -deleterequirements : Deletes the minimum requirements you have set with looking4clanmates command.
      
      -showrequirements:shows your current requirements
      
      -update : update your clan info, if your clan have improved in performance it would be great to update your clan info with us to get better or more players.
      
      -checkbase : For clan recruiters to check a base for their clan
      
      -activity :most to least active players in your clan
      
      -base : get base info, also see your linked bases
      
      -addbase : link base with your discord id
      
      -removebase : unlink base with your discord id
      
      -clan : get clan info') */
    }
}