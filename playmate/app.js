//-------------Getting all the Algorithms-------------//
const Algo = require('./algo');
const RushedAlgo = Algo.RushedAlgo;
const ActiveAlgo = Algo.ActiveAlgo;
const ArmiesAlgo = Algo.ArmiesAlgo;
const WarTypeAlgo = Algo.WarTypeAlgo;
const TrophyPushForPlayer = Algo.TrophyPushForPlayer;
const TrophyPushForClan = Algo.TrophyPushForClan;
const TownHallStatus = Algo.ClanTownHallLevel;
const CheckSiege = Algo.CheckSiege;
const MaxDonationPoints = Algo.CalculateMaxDonationPoints;
const PlayerWarTag = Algo.GetPlayerWarTag;
const OverAllPoints = Algo.overallPoints;
let rushedAlgo = new RushedAlgo();
let activeAlgo = new ActiveAlgo();
let armiesAlgo = new ArmiesAlgo();
let warTypeAlgo = new WarTypeAlgo();
const fs = require('fs');
request = require('request');
//const Utils = require('../utils');
//const readJson = Utils.readJson;
const keyMap = require("./standardData/keyMap");
const clanRegister = require('./standardData/clanRegister');

//-------------Getting all the command excutes-----------//
//const execute = require('./execute');

//-------------Getting ability to ask questions-------------//
const question = require('./multipleUse/questions');

//-------------Connecting To local Database-------------//
const db = require('./dataBase/db');

//-------------Connecting To COC API-------------------//
const Api = require('../api.js');

//-------------Constants file ------------------------//
const constants = require('./constants.js');
const Olf = require('./multipleUse/oneLineFunctions');  
const adminConfig = require('./standardData/adminConfig');
const embedFunctions = require('./embed');
const baseRegister = require('./standardData/baseRegister');
const api = require('./api.js');







//-------Runs To Initialize activity parametrs--------//
(function init() {
    //"use strict";
    activeAlgo.initializeTopClanActiveParameters();
    console.log('Updated activity parameters...');
    setTimeout(init, 900000)
}());




module.exports = {
    getBaseCommandDetails: getBaseCommandDetails,
    getClanCommandDetails: getClanCommandDetails,
    getActivityCommandDetails: getActivityCommandDetails,
    pushAddBaseCommandDetails: pushAddBaseCommandDetails,
    pullRemoveBaseCommandDetails: pullRemoveBaseCommandDetails,
    lookingForClanMatesCommandDetails: lookingForClanMatesCommandDetails,
    iNeedAClanCommandDetails: iNeedAClanCommandDetails,
    stopSearchingCommandDetails: stopSearchingCommandDetails,
    startSearchingCommandDetails: startSearchingCommandDetails,
    deleteRequirementsCommandDetails: deleteRequiremetnsCommandDetails,
    updateCommandDetails: updateCommandDetails,
    updateAllClanDetailsCommandDetails: updateAllClanDetailsCommandDetails,
    showRequirementsCommandDetails: showRequirementsCommandDetails,
    checkBaseCommandDetails: checkBaseCommandDetails,
    inviteCommandDetails: inviteCommandDetails,
    listBasesCommandDetails: listBasesCommandDetails,
    pushAddClanCommandDetails: pushAddClanCommandDetails,
    pullRemoveClanCommandDetails: pullRemoveClanCommandDetails,
    listClansCommandDetails: listClansCommandDetails,
    topFiveCommandDetails: topFiveCommandDetails
}