/* let msgCollectorUsers = []; */
let messageCollect = {};

function messageCollectorOn(userId) {
    return messageCollect[userId];
}

function askQuestion(msg, msgCollector, responseCallback) {
    messageCollect[msg.author.id] = true;
    msgCollector.on('collect', message => responseCallback(message, msgCollector))
    msgCollector.on('end', (collected, reason) => {
        isMessageCollect = false;
        delete  messageCollect[msg.author.id];
        if(reason == 'time') {
            msg.channel.send(`**${msg.author.username}**, you didn't answer in time, try again.`)
        }
    })
}


module.exports = {
    askQuestion: askQuestion,
    messageCollectorOn: messageCollectorOn
}