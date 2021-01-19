module.exports = {
    AddBase: require('./addBase').AddBase,
    AddClan: require('./addClan').AddClan,
    Clan: require('./clan').Clan,
    Base: require('./base').Base,
    DeleteRequirements: require('./deleteRequirements').DeleteRequirements,
    NeedClan: require('./needClan').NeedClan,
    RemoveClan: require('./removeClan').RemoveClan,
    RemoveBase: require('./removeBase').RemoveBase,
    SetRequirements: require('./setRequirements').SetRequirements,
    ShowRequirements: require('./showRequirements').ShowRequirements,
    Searching: require('./searching').Searching,
    Update: require('./update').Update,
    UpdateAll: require('./updateAll').UpdateAll,
    invite: require('./invite').inviteCommandDetails,
    checkBaseCommandDetails: require('./checkBase').checkBaseCommandDetails,
    topFiveCommandDetails: require('../../miscCode/topFiveCommandDetails').topFiveCommandDetails
}