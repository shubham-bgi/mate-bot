
function askQuestion(msg, msgCollector, responseCallback) {
    msgCollector.on('collect', message => responseCallback(message, msgCollector))
    msgCollector.on('end', (collected, reason) => {
        if(reason == 'time') {
            msg.channel.send(`**${msg.author.username}**, you didn't answer in time, try again.`)
        }
    })
}


module.exports = {
    askQuestion: askQuestion
}