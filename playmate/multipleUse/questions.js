let messageCollect = {};
function messageCollectorOn(userId) {
    return messageCollect[userId];
}
function askQuestion(msg, msgCollector, responseCallback) {
    messageCollect[msg.author.id] = true;
    msgCollector.on('collect', message => { 
        responseCallback(message, msgCollector)
    })
    msgCollector.on('end', (collected, reason) => {
        //isMessageCollect = false;
        delete  messageCollect[msg.author.id];
        if(reason == 'time') {
            msg.channel.send(`**${msg.author.username}**, you didn't answer in time, try again.`)
        }
        return;
    })
}

function askQuestionPromise(msg, msgCollector, responseCallback) {
    return new Promise((resolve, reject) => {
        let reply;
        messageCollect[msg.author.id] = true;
        msgCollector.on('collect', message => {
            reply = responseCallback(message, msgCollector) 
            if (reply){
                msgCollector.stop('Finished');
                resolve(reply);
            }
        })
        msgCollector.on('end', (collected, reason) => {
            //isMessageCollect = false;
            delete  messageCollect[msg.author.id];
            if(reason == 'time') {
                msg.channel.send(`**${msg.author.username}**, you didn't answer in time, try again.`)
            }
            if(reason != 'Finished') {
                resolve(undefined);
            }
        })
    })
}

/* function reaction(msg, reactCollector, responseCallback) {
    messageCollect[msg.author.id] = true;
    reactCollector.on('collect', (reaction, user) => {
        responseCallback(reaction, user, reactCollector);
    })
    collector.on('end', (collected, reason )=> {
        console.log(`Collected ${collected.size} items`);
        console.log(reason);
        return;
    })
} */

module.exports = {
    askQuestion: askQuestion,
    messageCollectorOn: messageCollectorOn,
    askQuestionPromise: askQuestionPromise,
   /*  reaction: reaction */
}