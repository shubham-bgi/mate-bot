const registeredClanCollection = require('../dataBase/registeredClanQueries');
const {askQuestion} = require('../multipleUse/questions');
const {playmateDiscordInvite} = require('../constants');
class DeleteRequirements {
    async deleteRequiremetnsCommandDetails(msg) {
        const regClanDetails = await registeredClanCollection.getByDiscordID(msg.guild.id);
        if(!regClanDetails) { msg.channel.send('There are no clan requirements set.'); return; }
        if(!regClanDetails.searchSetByAdmin) { msg.channel.send('Sorry, you can\'t do this right now. Contact our server support (' + playmateDiscordInvite +')'); return; }
        msg.reply('Are you sure?\nType ``yes`` or ``no``.');
        const msgCollector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id, { time: 20000 });
        askQuestion(msg, msgCollector, this.deleteRequirementsQuestinaire(msg, regClanDetails))
    }

    deleteRequirementsQuestinaire(msg, regClanDetails) {
        let count = 0; 
        return (message, msgCollector) => {
            if (['yes', 'y'].includes(message.content.toLowerCase())) {
                registeredClanCollection.deleteByDiscordID(msg.guild.id);
                msg.channel.send(regClanDetails.clanDetails.name + ' requirements deleted.');
                msgCollector.stop('done');
            } else if (['no', 'n'].includes(message.content.toLowerCase())) {
                msg.channel.send('oof, ok.');
                msgCollector.stop('done');
            } else if (count < 1) {
                msg.channel.send('Not a valid answer. Type ``yes`` or ``no``.');
                msg.reply('Are you sure?\nType ``yes`` or ``no``.');
            } else {
                msg.channel.send('Due to back to back wrong answer. imma stop this.');
                msgCollector.stop('wrong answer');
            }

        }
    }
}

module.exports = {
    DeleteRequirements
}