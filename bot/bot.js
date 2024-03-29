const Discord = require('discord.js');
const { messageCollectorOn } = require('../playmate/multipleUse/questions');
const botSet = require('./botsettings.json');
const commands = require('./commands');
const bot = new Discord.Client({disableEveryone: true});       
bot.commands = new Discord.Collection();
const recentUser = new Set();
const fs = require('fs');
const path = require('path');
const whenKicked = require('./whenKicked');

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
  /* let channelID;
  let channels = guild.channels;
  for (let key in channels) {
      let c = channels[key];
      console.log(c)
      if (c[1].type === "text" &&  guild.channels.get(key).permissionsFor(guild.me).has('SEND_MESSAGES')) {
          channelID = c[0];
          break;
      }
  }
  let channel = guild.channels.get(guild.systemChannelID || channelID); */
  //const channel = guild.channels.find(c => c.permissionsFor(guild.me) && c.type === 'text' && c.permissionsFor(guild.me).has('SEND_MESSAGES'));
  
  let defaultChannel = "";
  /* guild.channels.forEach((channel) => {
    if(channel.type == "text" && defaultChannel == "") {
      if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
        console.log(defaultChannel.name);
      }
    }
  }) */

  guild.channels.every((channel) => {
    //console.log(channel.name);
    if(channel.type == "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES") && channel.permissionsFor(guild.me).has("READ_MESSAGES")) {
        defaultChannel = channel;
        //console.log(defaultChannel.name);
        return false;
    }
    return true;
  })
  
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

  1) Use \`\`-needclan <your base tag>\`\` command to search for a clan.
  
  My default prefix is \`\`-\`\` but you can easily change it by
  using command \`\`-prefix <desired prefix>\`\`.`);
  /* guild.channels.sort(function(chan1,chan2){
    if(chan1.type!==`text`) return -1;
    if(!chan1.permissionsFor(guild.me).has(`SEND_MESSAGES`)) return -1;
    return chan1.position < chan2.position ? 1 : -1;
  }).first().send(embed);
  if(channel) {
    channel.send(embed);
  } */
  defaultChannel.send(embed);
})

bot.on("guildDelete", guild => {
  console.log("Left a guild: " + guild.name);
  whenKicked.whenKicked(guild);
  //remove from guildArray
})

bot.on('message', async msg => {
  if (msg.author.bot || msg.channel.type === 'dm' || messageCollectorOn(msg.author.id)) return;  //returns if the message is from a 1 bot or 2 is a direct message or 3  does not start with bot prefix
  let prefixes = JSON.parse(fs.readFileSync(path.resolve(__dirname,"./prefixes.json"), "utf-8"));
  if(!prefixes[msg.guild.id]){
    prefixes[msg.guild.id] = {
      prefixes: botSet.prefix
    };
  }
  if (msg.mentions.users.has(bot.user.id)) {
    msg.channel.send(`Current Prefix ${prefixes[msg.guild.id].prefixes}`);
    return;
  }
  let prefix = prefixes[msg.guild.id].prefixes;
  if(!msg.content.startsWith(prefix)) return;

  const message = msg.content.substr(prefix.length);
  const args = message.split(/ +/);
  const command = args.shift().toLowerCase();  //passes command to command variable from the whole
  try {
    const bigBoi = bot.commands.get(command)||bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if(!bigBoi) return;
    else bigBoi.execute(bot, msg, args, Discord, recentUser, prefix);
  } catch (error) {
    console.error(error.stack);
    msg.reply('There was an error trying to execute that command!');
  }
});
