const registeredClanCollection = require('../dataBase/registeredClanQueries');
const Api = require('../api');
const {getMetricsForMembersOfClan} = require('../multipleUse/points');
class Update {
    async updateCommandDetails(msg) {
        let regClanDetails = await registeredClanCollection.getByDiscordID(msg.guild.id);
        if(!regClanDetails[0]) { 
            msg.channel.send('No clans are registered in this server. Use ``setreq`` command.'); 
            return;
        }
        for(let i = 0 ; i < regClanDetails.length ; i++) {
            let clanDetails = await Api.getClanDetails(regClanDetails[i].clanDetails.tag);
            if(!clanDetails) {
                msg.channel.send('Oops error occured, servers are down right now.');
                return;
            }
            if(!clanDetails.isWarLogPublic) { 
                msg.channel.send('Sorry, war log is private for' + regClanDetails[i].clanDetails.name+ ', If you have made it public, please wait a few minutes.'); 
                return; 
            };
            msg.channel.send('Updating...');
            let memberDetails = await Api.getMembersDetails(clanDetails);
            let warLog = await Api.getWarLog(clanDetails.tag);
            let clanMetrics = getMetricsForMembersOfClan(memberDetails, clanDetails, warLog.items);
            const oldDetails = await registeredClanCollection.updateDetailsByClanTag(clanDetails, clanMetrics);
            if(oldDetails) {
                msg.channel.send(clanDetails.name + '\'s Details Updated. Search started.');
            } else {
                msg.channel.send('Oops, Something went wrong.');
            }
            registeredClanCollection.setSearchByUser(regClanDetails[i].clanDetails.tag, true);
            registeredClanCollection.setAreDetailsUpdated(regClanDetails[i].clanDetails.tag, true);
        }
    }
}

module.exports = {
    Update
}