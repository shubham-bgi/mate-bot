const fs = require('fs');
const path = require('path');
module.exports = {
    name: 'prefix',
    description: 'Changes prefix.',
    execute(bot, msg, args, Discord, recentUser, prefix) {
    if (!msg.member.hasPermission("ADMINISTRATOR")){
        msg.channel.send("Only admins can change prefix")
        return;
    }
    if(!args[0] || args[0] == "help"){
        msg.channel.send(`Usage: \`\`${prefix}prefix <desired prefix>\`\` `);
        return;
    }
    if(args[0].length>3) {
        msg.channel.send("Should be less than 3 charcters.");
        return;
    }
    let prefixes = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../prefixes.json"), "utf-8"));
    prefixes[msg.guild.id] = {
        prefixes: args[0]
    };
    fs.writeFile(path.resolve(__dirname, "../prefixes.json"), JSON.stringify(prefixes), (err) =>{
        if(err) console.log(err)
    })
    console.log(args);
    msg.channel.send('Playmate prefix is now ' + args[0]);
    } 
}