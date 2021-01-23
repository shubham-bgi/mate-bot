const registeredClanCollection = require('../dataBase/registeredClanQueries');
const Api = require('../api');
const {getMetricsForMembersOfClan} = require('../multipleUse/points');
class Update {
    async updateCommandDetails(msg) {
        let regClanDetails = await registeredClanCollection.getByDiscordID(msg.guild.id);
        if(!regClanDetails) { 
            msg.channel.send('No clans are registered in this server. Use ``setreq`` command.'); 
            return; 
        }
        let clanDetails = await Api.getClanDetails(regClanDetails.clanDetails.tag);
        if(!clanDetails) { 
            msg.channel.send('Can\'t find the clan, coc servers might be down right now.');
            return;
        }
        if(!clanDetails.isWarLogPublic) { 
            msg.channel.send('Sorry, war log is private, If you have made it plubic, please wait a few minutes.'); 
            return; 
        };
        msg.channel.send('Updating...');
        let memberDetails = await Api.getMembersDetails(clanDetails);
        let warLog = await Api.getWarLog(clanDetails.tag);
        let clanMetrics = getMetricsForMembersOfClan(memberDetails, clanDetails, warLog.items);
        const oldDetails = await registeredClanCollection.updateDetailsByClanTag(clanDetails, clanMetrics);
        if(oldDetails) {
            msg.channel.send(clanDetails.name + '\'s Details Updated.');
        } else {
            msg.channel.send('Oops, Something went wrong.');
        }
        registeredClanCollection.setSearchByUser(msg.guild.id, true);
        registeredClanCollection.setAreDetailsUpdated(msg.guild.id, true);
    }
}

module.exports = {
    Update
}