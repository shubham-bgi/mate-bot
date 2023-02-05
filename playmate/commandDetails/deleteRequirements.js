const registeredClanCollection = require('../dataBase/registeredClanQueries');
const {askQuestion} = require('../multipleUse/questions');
const {listClans} = require('../multipleUse/listClans')
const {playmateDiscordInvite} = require('../constants');
class DeleteRequirements {
    async deleteRequiremetnsCommandDetails(msg, embed) {
        
        let clanTag;
        let regClanDetail;
        const regClanDetails = await registeredClanCollection.getByDiscordID(msg.guild.id);
        if(!regClanDetails[0]) { 
            msg.channel.send('There are no clan requirements set. Use ``setreq`` command to set them up.'); 
            return; 
        } else {
            const question = "Which one?\nType the corresponding number or ``no``.";
            regClanDetail = await listClans(null, msg, embed, question, regClanDetails);
            if(!regClanDetail) { return; }
            clanTag = regClanDetail.tag;
        }
        if(!regClanDetails.filter(clan => {return clan.clanDetails.tag === clanTag})[0].searchSetByAdmin) { 
            msg.channel.send('Sorry, you can\'t do this. Contact our server support (' + playmateDiscordInvite +')'); 
            return; 
        }
        msg.reply('Are you sure?\nType ``yes`` or ``no``.');
        const msgCollector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id, { time: 20000 });
        askQuestion(msg, msgCollector, this.deleteRequirementsQuestinaire(msg, regClanDetail))
    }

    deleteRequirementsQuestinaire(msg, regClanDetail) {
        let count = 0; 
        return (message, msgCollector) => {
            if (['yes', 'y'].includes(message.content.toLowerCase())) {
                registeredClanCollection.deleteByTag(regClanDetail.tag);
                msg.channel.send(regClanDetail.name + ' requirements deleted.');
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