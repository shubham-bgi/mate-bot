const {VerifiedClan} = require ('../../model');

class verifiedClanQueries {

    static async getByDiscordId(discordId) {
        try {
            const verifiedClan = await VerifiedClan.findOne({ discordID: discordId });
            return verifiedClan;
        }
        catch (error) {
            console.log(error);
            console.log(`************Got an error for ${discordId}************`);
        }    
    }

    static async pushNewClan(clan) {
        const newVerifiedClanToBePushed = new VerifiedClan(clan)
        try {
            await newVerifiedClanToBePushed.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return false;

        }
    }

    static async updateByDiscordId(discordId, clanToBeAdded) {
        try {
            const numberOfDocumentsModified = await VerifiedClan.updateOne(
                { discordID: discordId },
                { $push: { clans: clanToBeAdded } 
            });
            return numberOfDocumentsModified;
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    getByDiscordId: verifiedClanQueries.getByDiscordId,
    pushNewClan: verifiedClanQueries.pushNewClan,
    updateByDiscordId: verifiedClanQueries.updateByDiscordId
}