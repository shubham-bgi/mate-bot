module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(bot, msg, args, Discord, recentUser) {
    msg.reply('pong');
    msg.channel.send('pong');
  },
};
