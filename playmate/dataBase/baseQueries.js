const {Base} = require('../../model');

class baseQueries {
    static async getAllBases() {
        try {
            const all = await Base.find();
            return all;
        } 
        catch (error) {
            console.error(error);
        }
    }

    static async getBasesByDiscordId(discordId) {
        try {
            const base = await Base.findOne({ discordID: discordId });
            return base;
        }
        catch (error) {
            console.log(error);
            console.log(`************Got an error for ${discordId}************`);
        }    
    }
    
    static async updateBasesByDiscordId(discordId, baseToBeAdded) {
        try {
            const numberOfDocumentsModified = await Base.updateOne(
                { discordID: discordId },
                { $push: { bases: baseToBeAdded } 
            });
            return numberOfDocumentsModified;
        }
        catch (error) {
            console.log(error);
        }
    }

    static async pushNewBase(baseToBeAdded) {
        const newBaseToBePushed = new Base(baseToBeAdded)
        try {
            await newBaseToBePushed.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return false;

        }
    }

    static async pullOldBaseByBaseTag(discordId, baseTagToBeRemoved) {
        try {
            const numberOfDocumentsModified = await Base.updateOne(
                { discordID: discordId },
                { $pull: { bases: { tag: baseTagToBeRemoved} } 
            });
            return numberOfDocumentsModified;
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    getAllBases: baseQueries.getAllBases,
    getBasesByDiscordId: baseQueries.getBasesByDiscordId,
    updateBasesByDiscordId: baseQueries.updateBasesByDiscordId,
    pushNewBase: baseQueries.pushNewBase,
    pullOldBaseByBaseTag: baseQueries.pullOldBaseByBaseTag
}