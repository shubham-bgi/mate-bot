const model = require('../model');
const baseRequirements = require('../model/baseRequirements');
const clanDetails = require('../model/clanDetails');
const Base = model.Base;
const Clan = model.Clan;
const BaseRequirements = model.BaseRequirements;
const ClanDetails = model.ClanDetails;

class db {

    //-------------------BASES COLLECTION DATABASE QUERRIES-------------------//

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
        const newBaseToBePushed = new model.Base(baseToBeAdded)
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

    /* static async pullOldBaseByBaseName(discordId, baseNameToBeRemoved) {
        try {
            const numberOfDocumentsModified = await Base.updateOne(
                { discordId: discordId },
                { $pull: { bases: { name: baseNameToBeRemoved} } 
            });
            return numberOfDocumentsModified;
        }
        catch (error) {
            console.log(error);
        }
    } */
    
    //-------------------CLANS COLLECTION DATABASE QUERRIES-------------------//

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
        const newClanToBePushed = new model.Clan(clanToBePushed)
        try {
            await newClanToBePushed.save();
            return true;
        }
        catch (error) {
            console.log(error.status);
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
    //-------------------REGISTERED CLANS COLLECTION DATABASE QUERRIES-------------------//

    static async pushNewBaseRequirements(BaseRequirementsToBeAdded) {
        const baseRequirements = new BaseRequirements(BaseRequirementsToBeAdded)
        try {
            await baseRequirements.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getBaseRequirementsByTag(clanTag) {
        try {
            const base = await BaseRequirements.findOne({ clanTag: clanTag });
            return base;
        }
        catch (error) {
            console.log(error);
            console.log(`************Got an error for ${clanTag}************`);
        } 
    }

    static async getBaseRequirementsByDiscordID(discordID) {
        try {
            const base = await BaseRequirements.findOne({ discordID: discordID });
            return base;
        }
        catch (error) {
            console.log(error);
            console.log(`************Got an error for ${clanTag}************`);
        } 
    }

    static async getDetailsOfAvailableClans(baseDetails) {
        /* let now = new Date();
        now = new Date(now.setHours(now.getHours()-3)); */
        try {
            const clans = await BaseRequirements.find ({
                $or: [{ 
                    minimumTownHallLevel: { $lte: baseDetails.townHallLevel } 
                }, {
                    onlyTownHall: { $eq: baseDetails.townHallLevel}
                }], 
                nonRushPoints: { $lte: baseDetails.nonRushPoints },
                maxPoints: { $lte: baseDetails.maxPoints },
                /* activityPoints: { $lte: baseDetails.activityPoints }, */
                attackWinsPoints: { $lte: baseDetails.attackWinsPoints},
                trophies: { $lte: baseDetails.trophies },
                versusTrophies: { $lte: baseDetails.versusTrophies },
                sumOfHeroes: { 
                    $elemMatch: { 
                        townHallLevel: { 
                            $eq: baseDetails.townHallLevel
                        },
                        sumOfHeroes: { 
                            $lte: baseDetails.sumOfHeroes
                        }
                    }  
                },
                heroLevels: {
                    $elemMatch: { 
                        townHallLevel: { 
                            $eq: baseDetails.townHallLevel
                        },
                        heroLevels: { 
                            $lte: baseDetails.heroLevels
                        }
                    }
                },
                warStars: { 
                    $elemMatch: { 
                        townHallLevel: { 
                            $eq: baseDetails.townHallLevel
                        },
                        warStars: { 
                            $lte: baseDetails.warStars
                        }
                    }
                },
                isFWA: { $eq: baseDetails.needFWA },
                searching: true,
                searchingByAdmin: true,
                searchingByUpdate: true,
                /* lastSearchDate: {$lte: now} */
            })
            return clans;
        }
        catch (error) {
            console.log(error);
        } 
    } 

    static async getUserChoiceClan(availableClanTags, userOptions) {
        console.log(userOptions);
        try {
            const clan = await ClanDetails.aggregate(
                [
                    { $match: { clanTag: { $in: availableClanTags } } },
                    { $project:{ clanTag: "$clanTag", discordID: "$discordID",total: { $add: userOptions}}},
                    {$sort: {total: -1}}
                ]
            )
            return clan;
        } 
        catch (error) {
            console.error(error);
        }
    }

    static async setSearchingByDiscordID(discordId, setToThis){
        try{
            const docsModified = await BaseRequirements.updateOne({
                discordID: discordId
            }, {
                $set: { 
                    searching: setToThis
                }
            });
        }
        catch(error) {
            console.log(error);
        }
        try{
            const docsModified = await ClanDetails.updateOne({
                discordID: discordId
            }, {
                $set: { 
                    searching: setToThis
                }
            });
            return docsModified;
        }
        catch(error) {
            console.log(error);
        }
    }

    static async setSearchingByAdminByDiscordID(discordId, setToThis){
        try{
            const docsModified = await BaseRequirements.updateOne({
                discordID: discordId
            }, {
                $set: { 
                    searchingByAdmin: setToThis
                }
            });
        }
        catch(error) {
            console.log(error);
        }
        try{
            const docsModified = await ClanDetails.updateOne({
                discordID: discordId
            }, {
                $set: { 
                    searchingByAdmin: setToThis
                }
            });
            return docsModified;
        }
        catch(error) {
            console.log(error);
        }
    }
    
    static async setSearchingByUpdateByDiscordId(discordId, setToThis){
        try{
            const docsModified = await BaseRequirements.updateOne({
                discordID: discordId
            }, {
                $set: { 
                    searchingByUpdate: setToThis
                }
            })
        }
        catch(error) {
            console.log(error);
        }
        try{
            const docsModified = await ClanDetails.updateOne({
                discordID: discordId
            }, {
                $set: { 
                    searchingByUpdate: setToThis
                }
            })
            return docsModified;
        }
        catch(error) {
            console.log(error);
        }
    }
 
    static deleteRequirementsByDiscordID(discordId){
            BaseRequirements.findOneAndDelete( {discordID: discordId}, (err, result) => {
            if (err) throw err;
            return;
            })
        
    }

    static deleteClanDetailsByDiscordId(discordId, msg){
            ClanDetails.findOneAndDelete( {discordID: discordId}, (err, result) => {
                if(err) throw err;
                if(msg){
                msg.channel.send('**' + result.clanName + '** requirements have been deleted.');
                }
                return;
            })
    }

    static async getBestClan(availableClanTags) {
        try {
            const clan = await ClanDetails.find().where('clanTag').in(availableClanTags).sort({"points.overall": -1})/* .limit(2) */.exec();
            return clan;
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getAvailableClanDetails(availableClanTags) {
        try {
            const clansDetails = await ClanDetails.find().where('clanTag').in(availableClanTags).exec();
            return clansDetails;
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getClanDetailsByDiscordID(discordId) {
        try {
            const clanDetails = await ClanDetails.findOne({ discordID: discordId });
            return clanDetails;
        }
        catch (error) {
            console.log(error);
            console.log(`************Got an error for ${clanTag}************`);
        } 
    }

    static async updateClanDetails(discordId, updatedClanDetails) {
        try {
            const docsModified = await ClanDetails.replaceOne( {discordID: discordId}, updatedClanDetails);
            return docsModified.nModified;
        } catch (error) {
            console.error(error);
            console.log(`************Got an error for ${clanTag}************`);
        }
    }

    static async getClanDetailsToUpdate(now) {
        try {
            const clanDetailsToBeUpdated = await ClanDetails.find({date: {$lte: now}, searchingByUpdate: true, searching: true, searchingByAdmin: true})
            return clanDetailsToBeUpdated;
        } catch (error){
            console.error(error);
        }
    }

    static async pushNewClanDetails(clanDetailsToBeAdded) {
        const clanDetails = new ClanDetails(clanDetailsToBeAdded);
        try {
            await clanDetails.save();
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

    static async foundPlayer(discordId){
        let now = new Date();
        try {
            await baseRequirements.updateOne({
                discordID: discordId
            }, {
                $inc: {totalPlayersFound: 1},
                $set: {lastSearchDate: now}
            })
        }
        catch (error) {
            console.error(error);
        }
    }
}

   
   
module.exports = {
    getAllBases: db.getAllBases,
    getAllClans: db.getAllClans,
    getBasesByDiscordId: db.getBasesByDiscordId,
    updateBasesByDiscordId: db.updateBasesByDiscordId,
    pushNewBase: db.pushNewBase,
    pullOldBaseByBaseTag: db.pullOldBaseByBaseTag,
    /* pullOldBaseByBaseName: db.pullOldBaseByBaseName, */
    pullOldClanByClanTag: db.pullOldClanByClanTag,
    getClansByDiscordId: db.getClansByDiscordId,
    updateClansByDiscordId: db.updateClansByDiscordId,
    pushNewClan: db.pushNewClan,
    pushNewBaseRequirements: db.pushNewBaseRequirements,
    getBaseRequirementsByTag: db.getBaseRequirementsByTag,
    getBaseRequirementsByDiscordID: db.getBaseRequirementsByDiscordID,
    pushNewClanDetails: db.pushNewClanDetails,
    getClanDetailsByDiscordId: db.getClanDetailsByDiscordID,
    getDetailsOfAvailableClans: db.getDetailsOfAvailableClans,
    getBestClan: db.getBestClan,
    getAvailableClanDetails: db.getAvailableClanDetails,
    setSearchingByDiscordID: db.setSearchingByDiscordID,
    setSearchingByAdmin: db.setSearchingByAdminByDiscordID,
    deleteRequirementsByDiscordID: db.deleteRequirementsByDiscordID,
    deleteClanDetailsByDiscordID: db.deleteClanDetailsByDiscordId,
    updateClanDetails: db.updateClanDetails,
    getClanDetailsToUpdate: db.getClanDetailsToUpdate,
    setSearchingByUpdate: db.setSearchingByUpdateByDiscordId,
    foundPlayer: db.foundPlayer,
    getUserChoiceClan: db.getUserChoiceClan,
}