const {Clan} = require('../../model');

class clanQueries {
    static async getAllClans() {
        try {
            const all = await Clan.find();
            return all;
        } 
        catch (error) {
            console.error(error);
        }
    }
    
    static async getClansByDiscordId(discordId) {
        try {
            const clan = await Clan.findOne({ discordID: discordId });
            return clan;
        }
        catch (error) {
            console.log(error);
            console.log(`************Got an error for ${discordId}************`);
        } 
        
    }
    
    static async updateClansByDiscordId(discordId, clanToBeAdded) {
        try {
            const numberOfDocumentsModified = await Clan.updateOne(
                { discordID: discordId },
                { $push: { clans: clanToBeAdded } 
            });
            return numberOfDocumentsModified;
        }
        catch (error) {
            console.log(error);
        }
    }

    static async pushNewClan(clanToBePushed) {
        const newClanToBePushed = new Clan(clanToBePushed)
        try {
            await newClanToBePushed.save();
            return true;
        }
        catch (error) {
            console.log('it is coming ere')
            console.log(error);
            return false;
        }
    }

    static async pullOldClanByClanTag(discordId, clanTag) {
        try {
            const numberOfDocumentsModified = await Clan.updateOne(
                { discordID: discordId },
                { $pull: { clans: { tag: clanTag} } 
            });
            return numberOfDocumentsModified;
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    getAllClans: clanQueries.getAllClans,
    getClansByDiscordId: clanQueries.getClansByDiscordId,
    updateClansByDiscordId: clanQueries.updateClansByDiscordId,
    pushNewClan: clanQueries.pushNewClan,
    pullOldClanByClanTag: clanQueries.pullOldClanByClanTag
}