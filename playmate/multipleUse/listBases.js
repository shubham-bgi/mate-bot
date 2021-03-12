const baseCollection = require('../dataBase/baseQueries');
const {listBasesEmbed} = require('./embed');
const askQuestion = require('./questions').askQuestionPromise;
async function listBasesCommandDetails(type, msg, e1, question, noBaseFoundText) {
    let showBases;
    const msgCollector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id, { time: 20000 });
    let botMsgChannel = msg.channel;
    let botUserDetails = msg.author;
    let botUserBases = await baseCollection.getBasesByDiscordId(botUserDetails.id);
    if(!botUserBases || botUserBases.bases.length == 0) {
            botMsgChannel.send(noBaseFoundText);
        return;
    }
    if (!type) {
        if (botUserBases.bases.length == 1) {
            return botUserBases.bases[0].tag;
        }
        showBases = botUserBases.bases;
        msg.channel.send(listBasesEmbed(showBases, msg, e1));
        msg.reply(question);
        return await askQuestion(msg, msgCollector, listBaseQuestion(msg, showBases, question));
    } else {
        showBases = botUserBases.bases.filter(base => { if (base.type == type.toLowerCase()) { return base; } });
        if(showBases.length == 0) { botMsgChannel.send('No base with that type found. Use ``addbase`` command.'); return; }
        if(showBases.length == 1) { return showBases[0].tag; }
        msg.channel.send(listBasesEmbed(showBases, msg, e1)); 
        msg.reply(question);
        return await askQuestion(msg, msgCollector, listBaseQuestion(msg, showBases, question));
    }
}

function listBaseQuestion(msg, showBases, question) {
    let count = 0;
    return (message, msgCollector) => {
        if (message.content.toLowerCase() === 'no' || 
            message.content.toLowerCase() === 'cancel' ||
            message.content.toLowerCase() === 'n') {
            msg.channel.send('Alrighty then.');
            msgCollector.stop('ended by user');
            return;
        }
        else if(message.content >= 1 && message.content <= showBases.length + 1 && Number.isInteger(Number(message.content))) {
            return showBases[message.content-1].tag;
        } else if (count < 1) {
            count++;
            msg.channel.send('Not valid, Type the corresponding number or ``no``.')
            msg.reply(question);
        } else {
            msg.channel.send('I am stopping this lunacy rn.');
            msgCollector.stop('wrong choice');
            return;
        }
    }
}



module.exports = {
    listBases: listBasesCommandDetails
}