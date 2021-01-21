module.exports = {
    name: 'nos',
    description: 'number of servers bot is in.',
    execute(bot, msg, args, Discord, recentUser) {
      msg.channel.send(bot.guilds.size);
    }
}