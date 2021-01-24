const Discord = require('discord.js');
const { messageCollectorOn } = require('../playmate/multipleUse/questions');
const botSet = require('./botsettings.json');
const commands = require('./commands');
const bot = new Discord.Client({disableEveryone: true});       
bot.commands = new Discord.Collection();
const recentUser = new Set();
const fs = require('fs');
const path = require('path');

Object.keys(commands).map(key => {
  bot.commands.set(commands[key].name, commands[key]);
});

bot.login(botSet.token);
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("-help");
  bot.guilds.forEach((guild) => {
    console.log('--'+guild.name+'--')
  })
});

bot.on('guildCreate', guild => {
  let channelID;
  let channels = guild.channels;
  channelLoop:
  for (let key in channels) {
      let c = channels[key];
      if (c[1].type === "text") {
          channelID = c[0];
          break channelLoop;
      }
  }
  let channel = guild.channels.get(guild.systemChannelID || channelID);
  let embed = new Discord.RichEmbed();
  embed.setTitle('Thank you for adding me!');
  embed.setColor('#2f3136');
  embed.setDescription(`This is a recruitment bot. If you want to register your clan 
  to search for players. Follow these steps:

  1) Use \`\`-addclan <Your clan tag>\`\` command to link your clan
    to the discord server.
  2) Then use \`\`-setreq\`\` command to set the minimum requirements of 
  your clan, it can take upto 5 mins. Please be patient.

  If you want to search for a clan:

  1) Use \`\`-addbase <your base tag>\`\` command to link your base
    to your discord account.
  2) Then use \`\`-needclan\`\` command to search for a clan.
  
  My default prefix is \`\`-\`\` but you can easily change it by
  using command \`\`-prefix <desired prefix>\`\`.`)
  channel.send(embed);
})

bot.on('message', async msg => {
  if (msg.author.bot || msg.channel.type === 'dm' || messageCollectorOn(msg.author.id)) return;  //returns if the message is from a 1 bot or 2 is a direct message or 3  does not start with bot prefix
  let prefixes = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./prefixes.json"), "utf-8"));
  if(!prefixes[msg.guild.id]){
    prefixes[msg.guild.id] = {
      prefixes: botSet.prefix
    };
  }
  let prefix = prefixes[msg.guild.id].prefixes;
  if(!msg.content.startsWith(prefix)) return;

  const message = msg.content.substr(prefix.length);
  const args = message.split(/ +/);
  const command = args.shift().toLowerCase();  //passes command to command variable from the whole
  if(!bot.commands.has(command)) return;
  try {
    bot.commands.get(command).execute(bot, msg, args, Discord, recentUser, prefix);
  } catch (error) {
    console.error(error.stack);
    msg.reply('There was an error trying to execute that command!');
  }
});
