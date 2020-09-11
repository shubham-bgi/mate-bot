require('dotenv').config();
const Discord = require('discord.js');
const botsettings = require('./botsettings.json') //contains token and prefix of the bot
const bot = new Discord.Client({disableEveryone: true});       
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});
 

bot.login(botsettings.token);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("-help")// set bots activity as this
  bot.guilds.forEach((guild) => {
    console.log(guild.name)//logs the name of the server bot is in
    /* guild.channels.forEach((channel) => {
      console.log(` - ${channel.name} ${channel.type} ${channel.id}`)//logs all the channel name in the server
    }) */

  })
});

bot.on('message',async msg => {
 /*  msg.guild.members.forEach((member) => {
    console.log(` - ${member.user.username} ${member.nickname} ${member.id}`);
  })  */
  if (msg.author.bot || msg.channel.type === 'dm' || !msg.content.startsWith(botsettings.prefix)) return;  //returns if the message is from a 1 bot or 2 is a direct message or 3  does not start with bot prefix
  const message = removePrefix(msg.content);
  console.log(message);
  const args = message.split(/ +/);
  const command = args.shift().toLowerCase();  //passes command to command variable from the whole 
  
  if(!bot.commands.has(command)){
    //msg.reply(`There is not such command. Please try ${botsettings.prefix}help for more info.`);
    return;
  }

  try {
    let embed = new Discord.RichEmbed();
    let embed2 = new Discord.RichEmbed();
    let embed3 = new Discord.RichEmbed();
    let msgCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 300000 });//maxMatches:1,
    let msgCollector2 = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 20000 });//maxMatches:1,
    //console.log(msgCollector);
    bot.commands.get(command).execute(msg, args, embed, msgCollector, bot, embed2, embed3);
  } catch (error) {
    console.error(error.stack);
    msg.reply('There was an error trying to execute that command!');
  }
});

function removePrefix(messageWithPrefix) {
  return(messageWithPrefix.substr(1)) 
}

/* function getUserNameFromID(discordID){
  console.log('here');
  bot.fetchUser(discordID)
    .then( user => {
      console.log(user);
      return user.username + '#' + user.discriminator;
    })
}

module.exports = {
  getUserNameFromID: getUserNameFromID
} */