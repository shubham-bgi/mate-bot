const {RegisteredClan} = require('../../model');

class registeredClanQueries {

    //-------------------REGISTERED CLANS COLLECTION DATABASE QUERRIES-------------------//

    static async newClanRegister(clanToRegister) {
        const registerClanDetails = new RegisteredClan(clanToRegister)
        try {
            await registerClanDetails.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getByClanTag(clanTag) {
        console.log(clanTag);
        try {
            const regClanDetails = await RegisteredClan.findOne({ "clanDetails.tag": clanTag });
            return regClanDetails;
        }
        catch (error) {
            console.log(error);
            console.log(`************Got an error for ${clanTag}************`);
        } 
    }

    static async getByDiscordID(discordID) {
        try {
            const regClanDetails = await RegisteredClan.find({ "discordID.guild": discordID });
            return regClanDetails;
        }
        catch (error) {
            console.log(error);
        } 
    }

    static async deleteByTag(clanTag){
        RegisteredClan.findOneAndDelete( {"clanDetails.tag": clanTag}, (err, result) => {
        if (err) 
        throw err;
        return;
        })
    }

    static async setSearchByUserByDiscordID(clanTag, setToThis){
        try{
            const docsModified = await RegisteredClan.updateOne({
                "clanDetails.tag": clanTag
            }, {
                $set: { 
                    searchSetByUser: setToThis
                }
            });
            return docsModified;
        }
        catch(error) {
            console.log(error);
        }
    }

    static async setSearchByAdminByDiscordID(clanTag, setToThis){
        try{
            const docsModified = await RegisteredClan.updateOne({
                "clanDetails.tag" : clanTag
            }, {
                $set: { 
                    searchSetByAdmin: setToThis
                }
            });
            return docsModified;
        }
        catch(error) {
            console.log(error);
        }
    }
    
    static async setAreDetailsUpdatedByDiscordId(clanTag, setToThis){
        try{
            const docsModified = await RegisteredClan.updateOne({
                "clanDetails.tag": clanTag
            }, {
                $set: { 
                    areDetailsUpdated: setToThis
                }
            })
            return docsModified;
        }
        catch(error) {
            console.log(error);
        }
    }

    static async getDefaultTopClans(baseDetails) {
        /* let now = new Date();
        now = new Date(now.setHours(now.getHours()-3)); */
        try {
            const clans = await RegisteredClan.find ({
                $or: [{ 
                    "baseRequirements.townHallLevel": { $lte: baseDetails.townHallLevel } 
                }, {
                    "baseRequirements.onlyTownHall": { $eq: baseDetails.townHallLevel}
                }], 
                "baseRequirements.nonRushPoints": { $lte: baseDetails.nonRushPoints },
                "baseRequirements.maxPoints": { $lte: baseDetails.maxPoints },
                "baseRequirements.attackWinsPoints": { $lte: baseDetails.attackWinsPoints},
                "baseRequirements.trophies": { $lte: baseDetails.trophies },
                "baseRequirements.versusTrophies": { $lte: baseDetails.versusTrophies },
                "baseRequirements.sumOfHeroes": { 
                    "$elemMatch": { 
                        "townHallLevel": { 
                            $eq: baseDetails.townHallLevel
                        },
                        "sumOfHeroes": { 
                            $lte: baseDetails.sumOfHeroes
                        }
                    }  
                },
                "baseRequirements.heroLevels": {
                    "$elemMatch": { 
                        "townHallLevel": { 
                            $eq: baseDetails.townHallLevel
                        },
                        "heroLevels": { 
                            $lte: baseDetails.heroLevels
                        }
                    }
                },
                "baseRequirements.warStars": { 
                    "$elemMatch": { 
                        "townHallLevel": { 
                            $eq: baseDetails.townHallLevel
                        },
                        "warStars": { 
                            $lte: baseDetails.warStars
                        }
                    }
                },
                "baseRequirements.needWarFarmers": baseDetails.needWarFarmers,
                searchSetByUser: true,
                searchSetByAdmin: true,
                areDetailsUpdated: true,
                /* lastSearchDate: {$lte: now} */
            }).sort({"clanMetrics.points.overall": -1});
            return clans;
        }
        catch (error) {
            console.log(error);
        } 
    } 

    static async getUserChoiceClan(availableClanTags, userOptions) {
        try {
            const clan = await RegisteredClan.aggregate(
                [
                    { $match: { "clanDetails.tag": { $in: availableClanTags } } },
                    { $project:{ discordID: "$discordID", clanDetails: "$clanDetails", clanMetrics: "$clanMetrics",total: { $add: userOptions}}},
                    {$sort: {total: -1}}
                ]
            )
            return clan;
        } 
        catch (error) {
            console.error(error);
        }
    }

    static async updateDetails(discordId, updatedClanDetails) {
        const now = new Date();
        updatedClanDetails.lastUpdateDate = now;
        try {
            const docsModified = await RegisteredClan.replaceOne({"discordID.guild": discordId}, updatedClanDetails);
            return docsModified.nModified;
        } catch (error) {
            console.error(error);
            console.log(`************Got an error for ${updatedClanDetails.clanDetails.tag}************`);
        }
    }

    static async updateDetailsByClanTag(clanDetails, clanMetrics) {
        const now = new Date();
        try{
            const regDetails = await RegisteredClan.findOneAndUpdate({"clanDetails.tag": clanDetails.tag}, 
            {
                "clanDetails": clanDetails, 
                "clanMetrics": clanMetrics,
                "lastUpdateDate": now
            },
            {
                useFindAndModify: false
            })
            return regDetails;
        } catch(error) {
            console.error(error);
            console.log(`************Got an error for ${clanDetails.tag}************`);
        }
    }

    static async findStaleDetails(now) {
        try {
            const clanDetailsToBeUpdated = await RegisteredClan.find({lastUpdateDate: {$lte: now}, areDetailsUpdated: true, searchSetByUser: true, searchSetByAdmin: true})
            return clanDetailsToBeUpdated;
        } catch (error){
            console.error(error);
        }
    }

    static async foundPlayer(discordID){
        let now = new Date();
        try {
            await RegisteredClan.updateOne({
                "discordID.guild": discordID
            }, {
                $inc: {totalPlayersFound: 1},
                $set: {lastSearchDate: now}
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    static async leaderBoard() {
        try {
            const clans = await RegisteredClan.find().sort({"clanMetrics.points.overall": -1}).limit(10);
            return clans;
        }
        catch (error) {
            console.log(error);
        } 
    } 
}


   
   
module.exports = {
    getByClanTag: registeredClanQueries.getByClanTag,
    getByDiscordID: registeredClanQueries.getByDiscordID,
    newClanRegister: registeredClanQueries.newClanRegister,
    deleteByTag: registeredClanQueries.deleteByTag,
    setSearchByUser: registeredClanQueries.setSearchByUserByDiscordID,
    setSearchByAdmin: registeredClanQueries.setSearchByAdminByDiscordID,
    setAreDetailsUpdated: registeredClanQueries.setAreDetailsUpdatedByDiscordId,
    defaultTopClans: registeredClanQueries.getDefaultTopClans,
    foundPlayer: registeredClanQueries.foundPlayer,
    getUserChoiceClan: registeredClanQueries.getUserChoiceClan,
    updateDetails: registeredClanQueries.updateDetails,
    findStaleDetails: registeredClanQueries.findStaleDetails,
    updateDetailsByClanTag: registeredClanQueries.updateDetailsByClanTag,
    leaderBoard: registeredClanQueries.leaderBoard
}