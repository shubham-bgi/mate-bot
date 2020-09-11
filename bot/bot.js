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
});

bot.on('message', msg => {
  if (msg.author.bot || msg.channel.type === 'dm' || !msg.content.startsWith(botsettings.prefix)) return;  //returns if the message is from a 1 bot or 2 is a direct message or 3  does not start with bot prefix
  const message = removePrefix(msg.content);
  const args = message.split(/ +/);
  const command = args.shift().toLowerCase();  //passes command to command variable from the whole 
  
  if(!bot.commands.has(command)){
    msg.reply(`There is not such command. Please try ${botsettings.prefix}help for more info.`);
    return;
  }

  try {
    let embed = new Discord.RichEmbed();
    bot.commands.get(command).execute(msg, args, embed);
  } catch (error) {
    console.error(error.stack);
    msg.reply('There was an error trying to execute that command!');
  }
});

function removePrefix(messageWithPrefix) {
  return(messageWithPrefix.substr(1)) 
} 