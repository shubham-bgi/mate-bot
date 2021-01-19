const clanCollection = require('../dataBase/clanQueries');
const {listClansEmbed} = require('./embed');
const askQuestion = require('./questions').askQuestionPromise;
async function listClansCommandDetails(type, msg, e1, question) {
    let showClans;
    const msgCollector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id, { time: 20000 });
    let botUserClans = await clanCollection.getClansByDiscordId(msg.guild.id);
    if(!botUserClans || botUserClans.clans.length == 0) { 
        msg.channel.send('No clans are linked with the server. Use ``addclan`` command.'); 
        return; 
    }
    if (!type) {
        if (botUserClans.clans.length == 1) {
            return botUserClans.clans[0].tag;
        }
        showClans = botUserClans.clans;
        msg.channel.send(listClansEmbed(showClans, msg, e1));
        msg.reply(question);
        return await askQuestion(msg, msgCollector, listClanQuestion(msg, showClans, question));
    } else {
        showClans = botUserClans.clans.filter(clan => { if (clan.type == type.toLowerCase()) { return clan; } });
        if(!showClans[0]) { 
            msg.channel.send('No clans with that type found. Use ``addclan`` command'); 
            return; 
        }
        if(showClans.length == 1) {
            return showClans[0].tag;
        }
        msg.channel.send(listClansEmbed(showClans, msg, e1));
        msg.reply(question);
        return await askQuestion(msg, msgCollector, listClanQuestion(msg, showClans, question));
    }
}

function listClanQuestion(msg, showClans, question) {
    let count = 0;
    return (message, msgCollector) => {
        if (message.content.toLowerCase() == 'no'|| 
            message.content.toLowerCase() === 'cancel' ||
            message.content.toLowerCase() === 'n') {
            msg.channel.send('Alrighty then.');
            msgCollector.stop('ended by user');
            return;
        }
        else if(message.content >= 1 && message.content <= showClans.length + 1 && Number.isInteger(Number(message.content))) {
            return showClans[message.content-1].tag;
        } else if (count < 1) {
            count++;
            msg.channel.send('bruh? Type the corresponding number or ``no``.')
            msg.reply(question);
        } else {
            msg.channel.send('I am stopping this lunacy right now.');
            msgCollector.stop('wrong choice');
            return;
        }
    }
}

module.exports = {
    listClans: listClansCommandDetails
}