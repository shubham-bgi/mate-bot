const registeredClanCollection = require('../dataBase/registeredClanQueries');
const Api = require('../api');
const { getMetricsForMembersOfClan } = require('../multipleUse/points');
const {fetchChannel} = require('../multipleUse/discordOneLine');
const adminConfig = require('../standardData/adminConfig');
class UpdateAll {
    async updateAllClanDetailsCommandDetails(msg, bot) {
        if (!adminConfig.discordId.includes(msg.author.id)) { return; }
        let abandoned = 0;
        let stopped = 0;
        let modified = 0;
        let failed = 0;
        let now = new Date();
        now = new Date(now.setDate(now.getDate()-1));
        let clanDetailsToBeUpdated = await registeredClanCollection.findStaleDetails(now);
        msg.channel.send('Clans to be updated: ' + clanDetailsToBeUpdated.length);
        for(let i = 0; i < clanDetailsToBeUpdated.length; i++) {
            let clanDetails = await Api.getClanDetails(clanDetailsToBeUpdated[i].clanDetails.tag);
            if(!clanDetails) {
                abandoned++;
                break;
            }
            if(!clanDetails.isWarLogPublic) {
                const clanChannel = fetchChannel(clanDetailsToBeUpdated[i].discordID.channel, bot);
                if(clanDetailsToBeUpdated[i].discordID.role)
                clanChannel.send(clanDetailsToBeUpdated[i].discordID.role);
                clanChannel.send('I was auto updating clan details, but your war log is private. Please make it public, and use ``-update`` command to keep searching.');
                let docsModified = registeredClanCollection.setAreDetailsUpdated(clanDetailsToBeUpdated[i].discordID.guild, false);
                if(docsModified == 0) {
                    msg.channel.send('Failed to set searching by update for' + clanDetailsToBeUpdated[i].clanDetails.name + clanDetailsToBeUpdated[i].clanDetails.tag);
                }
                stopped++;
                break;
            };
            let memberDetails = await Api.getMembersDetails(clanDetails);
            let warLog = await Api.getWarLog(clanDetails.tag);
            let clanMetrics = getMetricsForMembersOfClan(memberDetails, clanDetails, warLog.items);
            const oldDetails = await registeredClanCollection.updateDetailsByClanTag(clanDetails, clanMetrics);
            if (oldDetails) { 
                modified++; 
            }
            else {
                msg.channel.send('Failed to update for clan ' + clanDetailsToBeUpdated[i].clanDetails.name + clanDetailsToBeUpdated[i].clanDetails.tag);
                failed++;
            }
        }
        msg.channel.send('Abandoned :'  + abandoned + '\nStopped : ' + stopped + "\nModified : " + modified + '\nFailed : ' + failed);
        /* const allBases = db.getAllBases();
        const allClans = db.getAllClans();
        let flag = 0;
        let x = [];
        for(let i = 0; i < allBases.length; i++) {
                for(let j = 0; j < allBases[i].bases.length; j++) {
                    let baseDetails = await Api.getPlayerDetails(allBases[i].bases[j].tag);
                    if( baseDetails.name != allBases[i].bases[j].name || baseDetails.townHallLevel != allBases[i].bases[j].name) {
                        flag = 1;
                    }
                }
    
        } */
    }
}
module.exports = {
    UpdateAll
}