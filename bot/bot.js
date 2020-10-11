const Discord = require('discord.js');
const { messageCollectorOn } = require('../playmate/questions');
const botsettings = require('./botsettings.json') //contains token and prefix of the bot
const bot = new Discord.Client({disableEveryone: true});       
bot.commands = new Discord.Collection();
const talkedRecently = new Set();
const botCommands = require('./commands');


Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});
 

bot.login(botsettings.token);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("-help")// set bots activity as this
  bot.guilds.forEach((guild) => {
    console.log('--'+guild.name+'--')//logs the name of the server bot is in
    /* guild.channels.forEach((channel) => {
      console.log(` - ${channel.name} ${channel.type} ${channel.id}`)//logs all the channel name in the server
    }) */

  })
});

bot.on('message',async msg => {
 /*  msg.guild.members.forEach((member) => {
    console.log(` - ${member.user.username} ${member.nickname} ${member.id}`);
  })  */
  /* if (msg.attachments.size > 0) {
    console.log('true');
    if (msg.attachments.every(attachIsImage)){
      console.log('true1');
      msg.attachments.forEach(a => {
        var download = function(uri, filename, callback){
          request.head(uri, function(err, res, body){
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
            request(uri).pipe(fs.createWriteStream(`./playmate/${filename}`)).on('close', callback);
          });
        };
        download(a.url, a.filename, function(){
          console.log('done');
        });
      })
    }
  } */
  
  if (
    msg.author.bot 
    || msg.channel.type === 'dm' 
    || !msg.content.startsWith(botsettings.prefix) 
    || messageCollectorOn(msg.author.id)
    ) return;  //returns if the message is from a 1 bot or 2 is a direct message or 3  does not start with bot prefix
  const message = removePrefix(msg.content);
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
    let embed4 = new Discord.RichEmbed();
    let embed5 = new Discord.RichEmbed();
    let msgCollector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 300000 });//maxMatches:1,
    let msgCollector2 = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 20000 });//maxMatches:1,
 
    bot.commands.get(command).execute(msg, args, embed, msgCollector, bot, embed2, embed3, talkedRecently, embed4, embed5);
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