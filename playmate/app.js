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
const keyMap = require("./json/keyMap");
const clanRegister = require('./json/clanRegister');

//-------------Getting all the command excutes-----------//
//const execute = require('./execute');

//-------------Getting ability to ask questions-------------//
const question = require('./questions');

//-------------Connecting To local Database-------------//
const db = require('./db');

//-------------Connecting To COC API-------------------//
const Api = require('./api.js');

//-------------Constants file ------------------------//
const constants = require('./constants.js');
const Olf = require('./oneLineFunctions');  
const adminConfig = require('./json/adminConfig');
const embedFunctions = require('./embed');
const { pushNewRegClan } = require('./db');
const commands = require('../bot/commands');
const baseRegister = require('./json/baseRegister');
const base = require('../bot/commands/base');
const oneLineFunctions = require('./oneLineFunctions');
const api = require('./api.js');
const clan = require('../bot/commands/clan');







//-------Runs To Initialize activity parametrs--------//
(function init() {
    activeAlgo.initializeTopClanActiveParameters();
})();










//--------Function that runs Base command-----------//


async function getBaseCommandDetails(baseTag, botMsgChannel, embed, botUserDetails) {
    if(!baseTag) {
        let flag = 0;
        let botUserBases = await db.getBasesByDiscordId(botUserDetails.id);
        if(!botUserBases || botUserBases.bases.length == 0) { botMsgChannel.send('No bases are currently linked with you. Use ``addbase`` command.'); return; }
        else {
            for(let i = 0;i < botUserBases.bases.length; i++) {
                if(botUserBases.bases[i].type.toLowerCase() == 'main') {
                    botMsgChannel.send('Getting base info...');
                    Api.getPlayerDetails(botUserBases.bases[i].tag)
                        .then( baseDetails => {
                            const baseMetric = getMetricForBase(baseDetails);
                            embedFunctions.baseEmbed(baseMetric, baseDetails, botMsgChannel, embed);    
                    });
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) { botMsgChannel.send('No base with main type found. Use ``addbase`` command.'); return; }
        }
    } else {
        baseTag = Olf.fixTag(baseTag);
        console.log(baseTag);
        const baseDetails = await api.getPlayerDetails(baseTag);
        if(!baseDetails) { botMsgChannel.send('Base Tag is incorrect bro.'); return;}
        botMsgChannel.send('Getting base info...');
        const baseMetric = getMetricForBase(baseDetails);
        embedFunctions.baseEmbed(baseMetric, baseDetails, botMsgChannel, embed);
    }
}

/* async function getBaseCommandDetails(argument, botMsgChannel, embed, botUserDetails) {
    if(argument.startsWith('#')) {       
        Api.getPlayerDetails(argument)
            .then( baseDetails => {
                if(baseDetails) {
                    console.log(baseDetails);
                    const baseMetric = getMetricForBase(baseDetails);
                    embedFunctions.baseEmbed(baseMetric, baseDetails, botMsgChannel, embed);
                }
                else { 
                    botMsgChannel.send('Base Tag is incorrect bro.') 
                }
        });
    } else if(argument) {
        const bases = await db.getBasesByDiscordId(botUserDetails.id);
        if(bases == null || bases.bases.length == 0) { 
            botMsgChannel.send('No bases are currently linked, Please try -addbase'); 
        } else if (argument.toLowerCase() == 'main' || argument.toLowerCase() == 'mini' || argument.toLowerCase() == 'dono' || argument.toLowerCase() == 'no') {
            let positionOfSameType = [];
            for(let i=0 ; i<bases.bases.length ; i++) {
                if(bases.bases[i].type == argument) {
                    positionOfSameType.push(i);
                }
            }
            if(positionOfSameType.length > 1) {
                for(let i=0 ; i<positionOfSameType.length ; i++) {
                    let baseDetails = await Api.getPlayerDetails(bases.bases[positionOfSameType[i]].tag);
                    botMsgChannel.send(`TH${baseDetails.townHallLevel}, ${baseDetails.name}, ${bases.bases[positionOfSameType[i]].type}, \`\`${bases.bases[positionOfSameType[i]].tag}\`\` `)
                }
            } else if(positionOfSameType.length == 1) {
                    getBaseCommandDetails(bases.bases[positionOfSameType[0]].tag, botMsgChannel, embed);
            } else {
                botMsgChannel.send('No bases of the ' + argument + ' type are there, try -base to see all your bases.');
            }
        } else {
            let flag = 1;
            for(let i=0 ; i<bases.bases.length ; i++) {
                if(bases.bases[i].name.toLowerCase() == argument.toLowerCase()) {
                    flag = 0;
                    getBaseCommandDetails(bases.bases[i].tag, botMsgChannel, embed);
                    break;
                }
            }
            if(flag) {
                botMsgChannel.send('I can\'t find any base named '+ argument + ' linked to you, try -base to see all your bases.')
            }
        }
    } else {
        const bases = await db.getBasesByDiscordId(botUserDetails.id);
        if(bases == null || bases.bases.length == 0) {
            botMsgChannel.send('No bases are currently linked, Please try -addbase OR type a base tag after -base.');
        } else if(bases.bases.length == 1) {
            getBaseCommandDetails(bases.bases[0].tag, botMsgChannel, embed);
        } else {
            for(let i=0 ; i<bases.bases.length ; i++) {
                let baseDetails = await Api.getPlayerDetails(bases.bases[i].tag);
                botMsgChannel.send(`TH${baseDetails.townHallLevel}, ${baseDetails.name}, ${bases.bases[i].type}, \`\`${bases.bases[i].tag}\`\` `)
            }
        }
    }
} */


async function listBasesCommandDetails(type, msg, e1, msgCollector,  e2, e3, e4, e5) {
    let showBases;
    let bases = await db.getBasesByDiscordId(msg.author.id);
    if(!bases || bases.bases.length == 0) { msg.channel.send('No bases are linked with you. Use ``addbase`` command.'); return; }
    if (!type) {
        showBases = bases.bases;
        embedFunctions.listBasesEmbed(showBases, msg.channel, e1, msg.author.username);
        setTimeout(() => { msg.reply('Do you want info on any base?\n Type the coresponding number or ``no``.'); }, 500);
        question.askQuestion(msg, msgCollector, listBaseQuestion(msg, showBases, e2));
    } else {
        showBases = bases.bases.filter(base => { if (base.type == type.toLowerCase()) { return base; } });
        if(!showBases[0]) { msg.channel.send('No bases with that type found.'); return; }
        embedFunctions.listBasesEmbed(showBases, msg.channel, e1, msg.author.username);
        setTimeout(() => { msg.reply('Do you want info on any base?\n Type the coresponding number or ``no``.'); }, 500);
        question.askQuestion(msg, msgCollector, listBaseQuestion(msg, showBases, e2));
    }
}

function listBaseQuestion(msg, showBases, embed) {
    let count = 0;
    return (message, msgCollector) => {
        if (message.content.toLowerCase() == 'no') {
            msg.channel.send('Alrighty then.');
            msgCollector.stop('ended by user');
            return;
        }
        else if(message.content >= 1 && message.content <= showBases.length + 1 && Number.isInteger(Number(message.content))) {
            getBaseCommandDetails(showBases[message.content-1].tag, msg.channel, embed, msg.channel);
            msgCollector.stop('Finished');
            return;
        } else if (count < 1) {
            count++;
            msg.channel.send('bruh? Type the corresponding number or ``no``.')
            msg.reply('Do you want info on any base?\n Type the coresponding number or ``no``.');
        } else {
            msg.channel.send('I am stopping this lunacy rn.');
            msgCollector.stop('wrong choice');
            return;
        }
    }
}

async function listClansCommandDetails(type, msg, msgCollector, e1, e2, e3, e4, e5) {
    let showClans;
    let clans = await db.getClansByDiscordId(msg.author.id);
    if(!clans || clans.clans.length == 0) { msg.channel.send('No clans are linked with you. Use ``-addclan`` command.'); return; }
    if (!type) {
        showClans = clans.clans;
        embedFunctions.listClansEmbed(showClans, msg.channel, e1, msg.author.username);
        setTimeout(() => { msg.reply('Do you want info on any clan?\n Type the coresponding number or ``no``.'); }, 500);
        question.askQuestion(msg, msgCollector, listClanQuestion(msg, showClans, e2));
    } else {
        showClans = clans.clans.filter(clan => { if (clan.type == type.toLowerCase()) { return clan; } });
        if(!showClans[0]) { msg.channel.send('No clans with that type found.'); return; }
        embedFunctions.listClansEmbed(showClans, msg.channel, e1, msg.author.username);
        setTimeout(() => { msg.reply('Do you want info on any clan?\n Type the coresponding number or ``no``.'); }, 500);
        question.askQuestion(msg, msgCollector, listClanQuestion(msg, showClans, e2));
    }
}

function listClanQuestion(msg, showClans, embed) {
    let count = 0;
    return (message, msgCollector) => {
        if (message.content.toLowerCase() == 'no') {
            msg.channel.send('Alrighty then.');
            msgCollector.stop('ended by user');
            return;
        }
        else if(message.content >= 1 && message.content <= showClans.length + 1 && Number.isInteger(Number(message.content))) {
            getClanCommandDetails(showClans[message.content-1].tag, msg.channel, embed);
            msgCollector.stop('Finished');
            return;
        } else if (count < 1) {
            count++;
            msg.channel.send('bruh? Type the corresponding number or ``no``.')
            msg.reply('Do you want info on any clan?\n Type the coresponding number or ``no``.');
        } else {
            msg.channel.send('I am stopping this lunacy right now.');
            msgCollector.stop('wrong choice');
            return;
        }
    }
}

async function getClanCommandDetails(clanTag, botMsgChannel, embed, botUserDetails, bot) {
    let flag = 0;
    if(!clanTag) {
        let botUserClans = await db.getClansByDiscordId(botUserDetails.id);
        if(!botUserClans || botUserClans.clans.length == 0) {
            botMsgChannel.send('No clans are currently linked with you. Use ``-addclan`` command.');
            return;
        }
        else {
            for(let i = 0; i < botUserClans.clans.length; i++) {
                if(botUserClans.clans[i].type == 'main') {
                    getClanCommandDetails(botUserClans.clans[i].tag, botMsgChannel, embed, botUserDetails, bot);
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                botMsgChannel.send('No clan with main type found. Use ``-addclan`` command.');
                return;
            }
        }
    } else {
        clanTag = Olf.fixTag(clanTag);
        let clanMetrics;
        let allClanData = await Api.getClanDetails(clanTag); 
        if(!allClanData){ botMsgChannel.send('Clan tag is incorrect bro'); return; } 
            botMsgChannel.send('Getting clan info...');
            let allPlayersData = await Api.getAllPlayerDetails(allClanData);
            if(allClanData.isWarLogPublic) {
                let warLog = await Api.getWarLog(clanTag);
                clanMetrics = getMetricsForAllPlayersOfClan(allPlayersData, allClanData, warLog.items);
            } else {
                clanMetrics = getMetricsForAllPlayersOfClan(allPlayersData, allClanData);
            }
            embedFunctions.clanEmbed(clanMetrics, botMsgChannel, embed);
    }
}



function inviteCommandDetails(msg, embed) {
    embed.setColor('#FF00FF');
    embed.addField('Add Playmate', `[Here](${constants.playmateInvite})`, true);
    embed.addField('Playmate Support', `[Here](${constants.playmateDiscordInvite})`, true);
    msg.channel.send(embed);
}


async function pushAddBaseCommandDetails(baseTag, botMsgChannel, botUserDetails, msgCollector, msg) {
    baseTag = Olf.fixTag(baseTag);
    const baseDetails = await Api.getPlayerDetails(baseTag);
    let flag = 0;
    let main = false;
    if (!baseDetails) { botMsgChannel.send('Base tag is incorrect bro.'); return; }
    let bases = await db.getBasesByDiscordId(botUserDetails.id);
    if(bases) {
        bases.bases.map( base => {
            if(base.tag == baseTag) {
                botMsgChannel.send(`${baseDetails.name} is already linked.`);
                flag = 1;
            }
            if(base.type.toLowerCase() == 'main') { main = true; }
        })
    }
    if (flag == 0 && main) {
        msg.reply('Do you wanna give it a type? ``mini``, ``dono``, ``frnds`` or ``no``? \n Type your choice.')
        question.askQuestion(msg, msgCollector, addBaseCallback(baseDetails, baseTag, msg, botMsgChannel, botUserDetails, main));
    } else if (flag == 0) {
        msg.reply('Do you wanna give it a type? ``main``, ``mini``, ``dono``, ``frnds`` or ``no``? \n Type your choice.')
        question.askQuestion(msg, msgCollector, addBaseCallback(baseDetails, baseTag, msg, botMsgChannel, botUserDetails, main));
    }
}

async function pushAddClanCommandDetails(clanTag, botMsgChannel, botUserDetails, msgCollector, msg) {
    clanTag = Olf.fixTag(clanTag);
    const clanDetails = await Api.getClanDetails(clanTag);
    let flag = 0;
    let main = false;
    if (!clanDetails) { botMsgChannel.send('Clan tag is incorrect bro.'); return; }
    let clans = await db.getClansByDiscordId(botUserDetails.id);
    if(clans) {
        clans.clans.map( clan => {
            if(clan.tag == clanTag) {
                botMsgChannel.send(`${clanDetails.name} is already linked.`);
                flag = 1;
            }
            if(clan.type.toLowerCase() == 'main') { main = true; }
        })
    }
    if (flag == 0 && main) {
        msg.reply('Do you wanna give it a type? ``mini``, ``feeder``, ``frnds``, ``allies``, ``sister`` or ``no``? \n Type your choice.');
        question.askQuestion(msg, msgCollector, addClanCallback(clanDetails, clanTag, msg, botMsgChannel, botUserDetails, main));
    } else if (flag == 0) {
        msg.reply('Do you wanna give it a type? ``main``, ``mini``, ``feeder``, ``frnds``, ``allies``, ``sister`` or ``no``? \n Type your choice.');
        question.askQuestion(msg, msgCollector, addClanCallback(clanDetails, clanTag, msg, botMsgChannel, botUserDetails, main));
    }
}



function addBaseCallback(baseDetails, baseTag, msg, botMsgChannel, botUserDetails, main) {
    let count = 0;
    return async (message, msgCollector) => {
        let  baseType;
        if (message.content.toLowerCase() == 'main' && !main ) {
            msgCollector.stop('got it');
            baseType = message.content.toLowerCase();
        } else if (message.content.toLowerCase() == 'mini' || message.content.toLowerCase() == 'dono' || message.content.toLowerCase() == 'no' || message.content.toLowerCase() == 'frnds') {
            msgCollector.stop('got it');
            baseType = message.content.toLowerCase();
        } else if (count < 1 && main){
            botMsgChannel.send(`**${botUserDetails.username}**, that's not a valid option bruh,you must choose between \`\`mini\`\`,\`\`dono\`\`, \`\`frnds\`\` or \`\`no\`\`.`);
            msg.reply('Do you wanna give it a type? ``mini``, ``dono``, ``frnds`` or ``no``? \n Type your choice.');
            count ++;
            return;
        } else if (count < 1) {
            botMsgChannel.send(`**${botUserDetails.username}**, that's not a valid option bruh,you must choose between \`\`main\`\`, \`\`mini\`\`,\`\`dono\`\`, \`\`frnds\`\` or \`\`no\`\`.`);
            msg.reply('Do you wanna give it a type? ``main``, ``mini``, ``dono``. \`\`frnds\`\` or ``no``? \n Type your choice.');
            count ++;
            return;
        } else {
            botMsgChannel.send(`Again bruh? I have to stop this before you make me crazy.`);
            msgCollector.stop('wrong response');
            return;
        }
        
        const baseToBeadded = [{
            name: baseDetails.name,
            townHallLevel: baseDetails.townHallLevel,
            tag: baseTag,
            type: baseType
        }]
        let numberOfDocsModified = await db.updateBasesByDiscordId(botUserDetails.id, baseToBeadded);
        if(numberOfDocsModified.n > 0) {
            botMsgChannel.send(`${baseDetails.name} (TH${baseDetails.townHallLevel}) added.`)
        } else {
            const newBaseToBeAdded = {
                discordID: botUserDetails.id,
                bases: [{
                    name: baseDetails.name,
                    townHallLevel: baseDetails.townHallLevel,
                    tag: baseTag,
                    type: baseType
                }]
            }
            if(await db.pushNewBase(newBaseToBeAdded)) {
                botMsgChannel.send(`${baseDetails.name} (TH${baseDetails.townHallLevel}) added.`);
            } else {
                botMsgChannel.send(`Something went wrong.`);
            }
        }
    }
}



function addClanCallback(clanDetails, clanTag, msg, botMsgChannel, botUserDetails, main) {
    let count = 0;
    return async (message, msgCollector) => {
        let  clanType;
        if (message.content.toLowerCase() == 'main' && !main ) {
            msgCollector.stop('got it');
            clanType = message.content.toLowerCase();
        } else if (message.content.toLowerCase() == 'mini' || message.content.toLowerCase() == 'feeder' || message.content.toLowerCase() == 'frnds' || message.content.toLowerCase() == 'allies' || message.content.toLowerCase() == 'sister' || message.content.toLowerCase() == 'no') {
            msgCollector.stop('got it');
            clanType = message.content.toLowerCase();
        } else if (count < 1 && main){
            botMsgChannel.send(`**${botUserDetails.username}**, that's not a valid option bruh,you must choose between \`\`mini\`\`,\`\`feeder\`\`, \`\`frnds\`\`, \`\`allies\`\`, \`\`sister\`\` or \`\`no\`\`.`);
            msg.reply('Do you wanna give it a type? ``mini``, ``feeder``, ``frnds``, ``allies``, ``sister`` or ``no``? \n Type your choice.');
            count ++;
            return;
        } else if (count < 1) {
            botMsgChannel.send(`**${botUserDetails.username}**, that's not a valid option bruh,you must choose between \`\`main\`\`, \`\`mini\`\`,\`\`feeder\`\`, \`\`frnds\`\`, \`\`allies\`\`, \`\`sister\`\` or \`\`no\`\`.`);
            msg.reply('Do you wanna give it a type? ``main``, ``mini``, ``feeder``, ``frnds``, ``allies``, ``sister`` or ``no``? \n Type your choice.');
            count ++;
            return;
        } else {
            botMsgChannel.send(`Again bruh? I have to stop this before you make me crazy.`);
            msgCollector.stop('wrong response');
            return;
        }
        const clanToBeadded = [{
            name: clanDetails.name,
            level: clanDetails.clanLevel,
            tag: clanTag,
            type: clanType
        }]
        let numberOfDocsModified = await db.updateClansByDiscordId(botUserDetails.id, clanToBeadded);
        console.log(numberOfDocsModified);
        if(numberOfDocsModified.n > 0) {
            botMsgChannel.send(`${clanDetails.name} added.`)
        } else {
            const newClanToBeAdded = {
                discordID: botUserDetails.id,
                clans: [{
                    name: clanDetails.name,
                    level: clanDetails.clanLevel,
                    tag: clanTag,
                    type: clanType
                }]
            }
            if(await db.pushNewClan(newClanToBeAdded)) {
                botMsgChannel.send(`${clanDetails.name} added.`);
            } else {
                botMsgChannel.send(`Something went wrong.`);
            }
        }
    }
}


async function pullRemoveBaseCommandDetails(baseTag, botMsgChannel, botUserDetails) {
    baseTag = Olf.fixTag(baseTag);
    let numberOfDocsModified = await db.pullOldBaseByBaseTag(botUserDetails.id, baseTag);
    if (numberOfDocsModified.nModified > 0) {
        botMsgChannel.send('Successfully removed.');
    } else {
        botMsgChannel.send('No base found with that tag.')
    }
     /* else {
        argument = argument.toLowerCase();
        let numberOfDocsModified = await db.pullOldBaseByBaseName(botUserDetails.id, argument);
        if (numberOfDocsModified.n > 0) {
            botMsgChannel.send('Successfully removed');
        } else {
            botMsgChannel.send('No base with that name is linked :/')
        }
    } */
}

async function pullRemoveClanCommandDetails(clanTag, botMsgChannel, botUserDetails) {
    clanTag = Olf.fixTag(clanTag);
    let numberOfDocsModified = await db.pullOldClanByClanTag(botUserDetails.id, clanTag);
    if (numberOfDocsModified.nModified > 0) {
        botMsgChannel.send('Successfully removed.');
    } else {
        botMsgChannel.send('No clan found with that tag.')
    }
}



async function getActivityCommandDetails(clanTag, botMsgChannel) {
    const allClanData = await Api.getClanDetails(clanTag);
    const allPlayersData = await Api.getAllPlayerDetails(allClanData);
    const allPlayerDetails = allPlayersData.map((playerData)=> {
        return playerData.data;
    })
    const activityLeaderboard = activeAlgo.getClanActivityLeaderBoard(allPlayerDetails);
    botMsgChannel.send("**Most to least Active Players**");
    activityLeaderboard.map((player) => {
        botMsgChannel.send(player.activityPoints.activityPoints + "  " + player.name);
    })
}





function getMetricsForAllPlayersOfClan(allPlayersData, allClanData, warLog) {
    const rushedMetrics = rushedAlgo.checkClanRushed(allPlayersData);
    const activeMetrics = activeAlgo.getActiveMetricForClan(allPlayersData);
    const pushMetrics = TrophyPushForClan(allPlayersData);
    const townHallStatus = TownHallStatus(allPlayersData);
    const siegeDonors = CheckSiege(allPlayersData);
    const war = warTypeAlgo.checkClanWarType(allClanData, rushedMetrics.clanRushPoints, warLog);
    const maxDonation = MaxDonationPoints(allPlayersData, allClanData.clanLevel)
    const overallPoints = OverAllPoints(allClanData, activeMetrics.activityFeel, rushedMetrics.clanRushPoints, war.lastFifteenWinRate, war.winRate, siegeDonors.points, maxDonation.points);
    //console.log(overallPoints);
    return {
        points: overallPoints,
        war: war,
        rushedMetrics: rushedMetrics,
        activeMetrics: activeMetrics,
        pushMetrics: pushMetrics,
        townHallStatus: townHallStatus,
        siegeDonors: siegeDonors,
        maxDonation: maxDonation,
        allClanData: allClanData
    }
}

function getMetricForBase(playerDetails) {
    const result = rushedAlgo.checkRushed(playerDetails);
    const result1 = TrophyPushForPlayer(playerDetails);
    const result2 = armiesAlgo.checkPlayerArmies(playerDetails);
    const playerAchievements = playerDetails.achievements;
    const playerActivity = activeAlgo.getActiveMetricForPlayer(playerDetails);
    const warTag = PlayerWarTag(playerDetails);

    return {
        result: result,
        result1: result1,
        result2: result2,
        playerAchievements: playerAchievements,
        playerActivity: playerActivity,
        warTag: warTag
    }
}




async function lookingForClanMatesCommandDetails(clanTag, msg, embed, msgCollector, bot) {
    clanTag = Olf.fixTag(clanTag)
    let baseRequirements = await db.getBaseRequirementsByTag(clanTag);
    if(baseRequirements) {
        if(baseRequirements.discordID != msg.author.id) {
        const user = await bot.fetchUser(baseRequirements.discordID);
        msg.channel.send('Clan is alredy regiestered by ' + user.username + '#' + user.discriminator + '.');
        } else {
            msg.channel.send('Clan is already registered by you bro.');
        }
    } else {
        baseRequirements = await db.getBaseRequirementsByDiscordID(msg.author.id);
        if (baseRequirements && !adminConfig.discordId.includes(msg.author.id)) { msg.channel.send('You can only register one clan right now.'); return; }
        let allClanData = await Api.getClanDetails(clanTag);
        if (!allClanData) { msg.channel.send('Wrong clan tag bro.'); return; }
        if (!allClanData.isWarLogPublic) { msg.channel.send('Sorry war log is not public, after making it public try again.'); return; }
        msg.channel.send('Getting clan info...');
        let warLog = await Api.getWarLog(clanTag);
        let allPlayersData = await Api.getAllPlayerDetails(allClanData);
        let clanMetrics = getMetricsForAllPlayersOfClan(allPlayersData, allClanData, warLog.items);
        if(allClanData.members < 5) {
            msg.channel.send('Since, you have less than 5 players in your clan, requirements will be auto set to the lowest possible.');
            let registeredClanDetails = {};
            registeredClanDetails.sumOfHeroes = clanRegister.quiz[9].default;
            registeredClanDetails.heroLevels = clanRegister.quiz[10].default;
            registeredClanDetails.warStars = clanRegister.quiz[12].default;
            let clanDetails = {};
            clanDetails = getClanDetailsDocument(clanMetrics, msg.author.id);
            registeredClanDetails.clanTag = Olf.fixTag(clanMetrics.allClanData.tag);
            registeredClanDetails.discordID = msg.author.id;
            pushClanRegisterationToDB(registeredClanDetails, clanDetails)
            return;
        }
        msg.channel.send('You can cancel this anytime by typing ``cancel``.');
        if( Olf.checkFWA(clanMetrics.allClanData.description) ) {
            msg.reply(clanRegister.quiz[0].question);
            question.askQuestion(msg, msgCollector, clanRegisterQuestionaire(msg, clanMetrics, 0))
        } else if( clanMetrics.townHallStatus.level.startsWith('O') ) {
            msg.reply(clanRegister.quiz[1].question + clanMetrics.townHallStatus.predominantTownHall );
            question.askQuestion(msg, msgCollector, clanRegisterQuestionaire(msg, clanMetrics, 1));
        } else {
            msg.reply(clanRegister.quiz[2].question + clanMetrics.townHallStatus.predominantTownHall);
            question.askQuestion(msg, msgCollector, clanRegisterQuestionaire(msg, clanMetrics, 2));
        }
    }
}

async function topFiveCommandDetails(baseTag, msg, embed, msgCollector, bot, embed2, embed3, talkedRecently, embed4, embed5, needFWA) {
    baseTag = Olf.fixTag(baseTag);
    const baseDetails = await Api.getPlayerDetails(baseTag);
    if(!baseDetails) { msg.channel.send('Base Tag is incorrect bro.'); return; }
    const baseMetrics = getMetricForBase(baseDetails);
    let heroes = baseDetails.heroes;
    let checkingBaseDetails = {};
    checkingBaseDetails.townHallLevel = baseDetails.townHallLevel;
    checkingBaseDetails.nonRushPoints = baseMetrics.result.playerRushPoints;
    checkingBaseDetails.maxPoints = baseMetrics.result.playerMaxPoints;
    checkingBaseDetails.attackWinsPoints = baseMetrics.playerActivity.attackWinsPoints;
    checkingBaseDetails.trophies = baseDetails.trophies;
    checkingBaseDetails.versusTrophies = baseDetails.versusTrophies;
    checkingBaseDetails.warStars = baseDetails.warStars;
    checkingBaseDetails.sumOfHeroes = "0";
    checkingBaseDetails.heroLevels = ["0"];
    if(heroes) {
        heroes = Olf.removeByProperty(heroes, "name", "Battle Machine");
        checkingBaseDetails.sumOfHeroes = Olf.sum(heroes, 'level');
        checkingBaseDetails.heroLevels = heroes.map(hero => hero.level);
    }
    checkingBaseDetails.needFWA = needFWA;

    const availableClans = await db.getDetailsOfAvailableClans(checkingBaseDetails);
    if(!availableClans[0]) { msg.channel.send('Didn\'t found any clans for you bro. Please try again later.'); return;}
    msg.channel.send('Searching...');
    const availableClanTags = availableClans.map(clan => clan.clanTag);
    const bestClanDetails = await db.getBestClan(availableClanTags);
    embedFunctions.topFiveEmbed(bestClanDetails, msg, embed, baseDetails, baseMetrics, bot);
}

async function getQuickClanDetails(clanTag, botMsgChannel, embed) {
    clanTag = Olf.fixTag(clanTag);
    const clanDetails = await api.getClanDetails(clanTag);
    embedFunctions.quickClanEmbed(clanDetails, botMsgChannel, embed);
}

async function iNeedAClanCommandDetails(baseTag, msg, embed, msgCollector, bot, embed2, embed3, talkedRecently, embed4, embed5, needFWA) {
    baseTag = Olf.fixTag(baseTag);
    const baseDetails = await Api.getPlayerDetails(baseTag);
    if(!baseDetails) { msg.channel.send('Base Tag is incorrect bro.'); return; }
    if (talkedRecently.has(msg.author.id)) { msg.channel.send("Hol up, wait 24 hours before using this command again, **" + msg.author.username + '**.'); return; }
    const baseMetrics = getMetricForBase(baseDetails);
    let heroes = baseDetails.heroes;
    let checkingBaseDetails = {};
    checkingBaseDetails.townHallLevel = baseDetails.townHallLevel;
    checkingBaseDetails.nonRushPoints = baseMetrics.result.playerRushPoints;
    checkingBaseDetails.maxPoints = baseMetrics.result.playerMaxPoints;
    /* checkingBaseDetails.activityPoints = Number(baseMetrics.playerActivity.activityPoints); */
    checkingBaseDetails.attackWinsPoints = baseMetrics.playerActivity.attackWinsPoints;
    checkingBaseDetails.trophies = baseDetails.trophies;
    checkingBaseDetails.versusTrophies = baseDetails.versusTrophies;
    checkingBaseDetails.warStars = baseDetails.warStars;
    checkingBaseDetails.sumOfHeroes = "0";
    checkingBaseDetails.heroLevels = ["0"];
    if(heroes) {
        heroes = Olf.removeByProperty(heroes, "name", "Battle Machine");
        checkingBaseDetails.sumOfHeroes = Olf.sum(heroes, 'level');
        checkingBaseDetails.heroLevels = heroes.map(hero => hero.level);
    }
    checkingBaseDetails.needFWA = needFWA;
    
    const availableClans = await db.getDetailsOfAvailableClans(checkingBaseDetails);
    //console.log(availableClans);
    if(!availableClans[0]) { msg.channel.send('Didn\'t found any clans for you bro. Please try again later.'); return;}
    msg.channel.send('You can cancel it anytime by typing ``cancel``.');
    msg.channel.send('Searching...');
    const availableClanTags = availableClans.map(clan => clan.clanTag);
    const bestClanDetails = await db.getBestClan(availableClanTags);
    msg.channel.send('Finding the best clan...');
    getQuickClanDetails(bestClanDetails[0].clanTag, msg.channel, embed);
    setTimeout(() => { msg.reply(baseRegister.quiz[0].question) }, 1000);
    question.askQuestion(msg, msgCollector, baseRegisterQuestionaire(msg, baseMetrics, baseDetails, availableClans,embed2, embed3, bestClanDetails, bot, 0, availableClanTags, embed4, embed5, talkedRecently))
}

function baseRegisterQuestionaire(msg, baseMetrics, baseDetails, availableClans, embed2, embed3, bestClanDetails, bot, questionNumber, availableClanTags, embed4, embed5, talkedRecently) {

    let count = 0;
    let userChoiceClans;
    return async function (message, msgCollector) {
        if( message.content.toLowerCase() == 'cancel' ) {
            msg.channel.send('Bye.');5
            msgCollector.stop('ended by user');
            return;
        }

        switch (questionNumber) {
            
            case 0:
                if (message.content.toLowerCase() == baseRegister.quiz[0].answer[0]) {
                    onMatch(bestClanDetails[0].discordID, msg, msgCollector, bot, talkedRecently, baseMetrics, baseDetails, embed2);
                    return;
                } else if (message.content.toLowerCase() == baseRegister.quiz[0].answer[1]) {
                    if (bestClanDetails[1]) {
                        count = 0;
                        questionNumber = 1;
                        msg.channel.send(baseRegister.quiz[1].info);
                        getQuickClanDetails(bestClanDetails[1].clanTag, msg.channel, embed3);
                        setTimeout(()=> { msg.reply(baseRegister.quiz[1].question)}, 1000);
                        return;
                    } else {
                        msg.channel.send('Currently I don\'t have anymore clans for you. Try again later.');
                        msgCollector.stop('finished');
                        return;
                    }
                } else if(count < baseRegister.wrongAnswerCount) {
                    count ++;
                    msg.channel.send(baseRegister.quiz[0].onWrongReply);
                    msg.reply(baseRegister.quiz[0].question);
                    return;
                } else {
                    msg.channel.send(baseRegister.autoCancel);
                    msgCollector.stop('wrong choice');
                    return;
                }

            case 1:
                if (message.content.toLowerCase() == baseRegister.quiz[1].answer[0]) {
                    onMatch(bestClanDetails[1].discordID, msg, msgCollector, bot, talkedRecently,  baseMetrics, baseDetails, embed2);
                    return;
                } else if (message.content.toLowerCase() == baseRegister.quiz[1].answer[1]) {
                    count = 0;
                    if(bestClanDetails[2]) {
                        questionNumber = 2;
                        msg.reply(baseRegister.quiz[2].question);
                        return;
                    } else {
                        msg.channel.send("Sorry, Currently we don\'t have anymore clans for you.");
                        msgCollector.stop('finished');
                        return;
                    }
                } else if(count < baseRegister.wrongAnswerCount) {
                    count ++;
                    msg.channel.send(baseRegister.quiz[1].onWrongReply);
                    msg.reply(baseRegister.quiz[1].question);
                    return;
                } else {
                    msg.channel.send(baseRegister.autoCancel);
                    msgCollector.stop('wrong choice');
                    return;
                }

            case 2:
                const numbersCorrespondingUserOptions = message.content.split(',');
                if (numbersCorrespondingUserOptions.length < 8 && numbersCorrespondingUserOptions.every(number => baseRegister.quiz[2].answer.includes(number)) && numbersCorrespondingUserOptions.every((number, index) => number != numbersCorrespondingUserOptions[index-1])) {
                    count = 0;
                    const userOptions = numbersCorrespondingUserOptions.map(number => keyMap[number].mongo);
                    msg.channel.send('Finding Clan with your options...');
                    userChoiceClans = await db.getUserChoiceClan(availableClanTags, userOptions);
                    getQuickClanDetails(userChoiceClans[0].clanTag, msg.channel, embed4);
                    questionNumber = 3;
                    setTimeout(()=> { msg.reply(baseRegister.quiz[0].question)}, 1000);;
                    return;
                } else if(count < baseRegister.wrongAnswerCount) {
                    count ++;
                    msg.channel.send(baseRegister.quiz[2].onWrongReply);
                    msg.reply(baseRegister.quiz[2].question);
                    return;
                } else {
                    msg.channel.send(baseRegister.autoCancel);
                    msgCollector.stop('wrong choice');
                    return;
                }

            case 3:
                if (message.content.toLowerCase() == baseRegister.quiz[0].answer[0]) {
                    onMatch(userChoiceClans[0].discordID, msg, msgCollector, bot, talkedRecently, baseMetrics, baseDetails, embed2);
                    return;
                } else if (message.content.toLowerCase() == baseRegister.quiz[0].answer[1]) {
                    if (userChoiceClans[1]) {
                        count = 0;
                        questionNumber = 4;
                        msg.channel.send(baseRegister.quiz[1].info);
                        getQuickClanDetails(userChoiceClans[1].clanTag, msg.channel, embed5);
                        setTimeout(()=> { msg.reply(baseRegister.quiz[1].question)}, 1000);
                        return;
                    } else {
                        msg.channel.send('Sorry, Currently we don\'t have anymore clans for you.');
                        msgCollector.stop('finished');
                        return;
                    }
                } else if(count < baseRegister.wrongAnswerCount) {
                    count ++;
                    msg.channel.send(baseRegister.quiz[0].onWrongReply);
                    msg.reply(baseRegister.quiz[0].question);
                    return;
                } else {
                    msg.channel.send(baseRegister.autoCancel);
                    msgCollector.stop('wrong choice');
                    return;
                }

            case 4: 
                if (message.content.toLowerCase() == baseRegister.quiz[1].answer[0]) {
                    onMatch(userChoiceClans[1].discordID, msg, msgCollector, bot, talkedRecently, baseMetrics, baseDetails, embed2);
                    return;
                } else if (message.content.toLowerCase() == baseRegister.quiz[1].answer[1]) {
                    msg.channel.send("Sorry mate, don't have anymore good clans for you right now, please come back later.");
                    msgCollector.stop('finished');
                    return;
                } else if(count < baseRegister.wrongAnswerCount) {
                    count ++;
                    msg.channel.send(baseRegister.quiz[1].onWrongReply);
                    msg.reply(baseRegister.quiz[1].question);
                    return;
                } else {
                    msg.channel.send(baseRegister.autoCancel);
                    msgCollector.stop('wrong choice');
                    return;
                }
        }
    }
}

async function onMatch(discordId, msg, msgCollector, bot, talkedRecently, baseMetrics, baseDetails, embed) {
    const user = await bot.fetchUser(discordId);
    talkedRecently.add(msg.author.id);
    setTimeout(() => { talkedRecently.delete(msg.author.id); }, 86400000);
    msg.channel.send('**'+msg.author.username + '**, I have contacted the clan recruiter, discord name is ' + user.username + '#' + user.discriminator + '.');
    user.send('Found a player for you! Discord name is ' + msg.author.username + '#' + msg.author.discriminator + '.');
    embedFunctions.baseEmbed(baseMetrics, baseDetails, user, embed);
    setTimeout(()=>{ user.send('If you wish to stop these pings, you can use the command ``stopsearch`` in any server I am in.') }, 1000);
    let y = await db.foundPlayer(discordId);
    msgCollector.stop('finished');
}
function clanRegisterQuestionaire(msg, clanMetrics, questionNumber) {

    let count = 0;
    let i = 0;
    let j = 0;
    let k = 0;
    let registeredClanDetails = {};
    registeredClanDetails.sumOfHeroes = [];
    registeredClanDetails.warStars = [];
    registeredClanDetails.heroLevels = [];
    let townhallCount;
    let clanDetails = {};
    clanDetails = getClanDetailsDocument(clanMetrics, msg.author.id);
    return (message, msgCollector) => {

        if( message.content.toLowerCase() == 'cancel' ) {
            msg.channel.send('Bye.');
            msgCollector.stop('ended by user');
            return;
        }
    
        switch (questionNumber) {

            case 0:
                if (message.content.toLowerCase() == clanRegister.quiz[0].answer[1] || message.content.toLowerCase() == clanRegister.quiz[0].answer[0]) {
                    count = 0;
                    registeredClanDetails.isFWA = message.content;
                    clanDetails.isFWA = message.content;
                    if( clanMetrics.townHallStatus.level.startsWith('O') ) {
                        msg.reply(clanRegister.quiz[1].question + clanMetrics.townHallStatus.predominantTownHall );
                        questionNumber = 1;
                    } else {
                        msg.reply(clanRegister.quiz[2].question + clanMetrics.townHallStatus.predominantTownHall);
                        questionNumber = 2;
                    }
                    return;
                } else if(count < clanRegister.wrongAnswerCount) {
                    count ++;
                    msg.channel.send(clanRegister.quiz[0].onWrongReply);
                    msg.reply(clanRegister.quiz[0].question);
                    return;
                } else {
                    msg.channel.send(clanRegister.autoCancel);
                    msgCollector.stop('wrong choice');
                    return;
                }
            
            case 1:
                if (message.content.toLowerCase() == clanRegister.quiz[1].answer[0]) {
                    registeredClanDetails.onlyTownHall = clanMetrics.townHallStatus.predominantTownHall;
                    clanDetails.onlyTownHall = clanMetrics.townHallStatus.predominantTownHall;
                    count = 0;
                    if (clanMetrics.rushedMetrics.clanMaxPoints >=9 && clanMetrics.rushedMetrics.clanRushPoints >=9) {
                        questionNumber = 4;
                        msg.channel.send(clanRegister.quiz[4].info)
                        msg.reply( clanRegister.quiz[4].question + clanMetrics.rushedMetrics.clanMaxPoints);
                        return;
                    } else {
                        questionNumber = 3;
                        msg.channel.send(clanRegister.quiz[3].info);
                        msg.reply( clanRegister.quiz[3].question + clanMetrics.rushedMetrics.clanRushPoints);  
                        return;
                    }
                } else if (message.content.toLowerCase() == clanRegister.quiz[1].answer[1]) {
                    questionNumber = 2;
                    count = 0;
                    msg.reply( clanRegister.quiz[2].question + clanMetrics.townHallStatus.predominantTownHall );
                    return;
                } else if (count < clanRegister.wrongAnswerCount) {
                    count ++;
                    msg.channel.send( clanRegister.quiz[1].onWrongReply);
                    msg.reply( clanRegister.quiz[1].question + clanMetrics.townHallStatus.predominantTownHall );
                    return;
                } else {
                    msg.channel.send( clanRegister.autoCancel );
                    msgCollector.stop('wrong choice');
                    return;
                }
            
            case 2:
                if ( clanRegister.quiz[2].answer.includes(message.content) ) {
                    registeredClanDetails.minimumTownHallLevel = message.content;
                    count = 0;
                    if (clanMetrics.rushedMetrics.clanMaxPoints >=9 && clanMetrics.rushedMetrics.clanRushPoints >=9) {
                        questionNumber = 4;
                        msg.channel.send(clanRegister.quiz[4].info)
                        msg.reply( clanRegister.quiz[4].question + clanMetrics.rushedMetrics.clanMaxPoints);
                        return;
                    } else {
                        questionNumber = 3;
                        msg.channel.send(clanRegister.quiz[3].info);
                        msg.reply( clanRegister.quiz[3].question + clanMetrics.rushedMetrics.clanRushPoints);  
                        return;
                    }
                } else if (count < clanRegister.wrongAnswerCount) {
                    msg.channel.send( clanRegister.quiz[2].onWrongReply );
                    msg.reply( clanRegister.quiz[2].question + clanMetrics.townHallStatus.predominantTownHall );
                    count ++;
                    return;
                } else {
                    msg.channel.send( clanRegister.autoCancel);
                    msgCollector.stop('wrong choice');
                    return;
                }
            
            case 3:
                if ( Number(message.content) >= clanRegister.quiz[3].answer[0]  && Number(message.content) <= clanRegister.quiz[3].answer[1] ) {
                    registeredClanDetails.nonRushPoints = message.content;
                    count = 0;
                    msg.reply( clanRegister.quiz[5].question )
                    questionNumber = 5;
                    return;
                }
                else if (count < clanRegister.wrongAnswerCount) {
                    msg.channel.send( clanRegister.quiz[3].onWrongReply );
                    msg.reply( clanRegister.quiz[3].question + clanMetrics.rushedMetrics.clanRushPoints);
                    count ++;
                    return;
                }
                else {
                    msg.channel.send( clanRegister.autoCancel );
                    msgCollector.stop('wrong choice');
                    return;
                }
            
            case 4:
                if ( Number(message.content) >= clanRegister.quiz[4].answer[0]  && Number(message.content) <= clanRegister.quiz[4].answer[1] ) {
                    registeredClanDetails.maxPoints = message.content;
                    count = 0;
                    msg.reply( clanRegister.quiz[5].question )
                    questionNumber = 5;
                } else if (count < clanRegister.wrongAnswerCount) {
                    msg.channel.send( clanRegister.quiz[4].onWrongReply);
                    msg.reply( clanRegister.quiz[4].question + clanMetrics.rushedMetrics.clanMaxPoints );
                    count ++;
                    return;
                } else {
                    msg.channel.send(clanRegister.autoCancel);
                    msgCollector.stop('wrong choice');
                    return;
                }
            
            case 5:
                if ( Number(message.content) >=clanRegister.quiz[5].answer[0]  && Number(message.content) <= clanRegister.quiz[5].answer[1] && Number.isInteger(Number(message.content)) ) {
                    registeredClanDetails.trophies = message.content;
                    count = 0;
                    msg.reply( clanRegister.quiz[6].question )
                    questionNumber = 6;
                    return;
                } else if (count < clanRegister.wrongAnswerCount ) {
                    count++;
                    msg.channel.send( clanRegister.quiz[5].onWrongReply );
                    msg.reply( clanRegister.quiz[5].question)
                    return;
                } else {
                    msg.channel.send( clanRegister.autoCancel );
                    msgCollector.stop('wrong choice');
                    return;
                }
        
            case 6:
                if ( Number(message.content) >= clanRegister.quiz[6].answer[0] && Number(message.content) <= clanRegister.quiz[6].answer[1] && Number.isInteger(Number(message.content)) ) {
                    count = 0;
                    registeredClanDetails.versusTrophies = message.content;
                    questionNumber = 7;
                    //msg.channel.send(clanRegister.quiz[7].info);
                    msg.reply( clanRegister.quiz[7].question );
                    return;
                } else if ( count < clanRegister.wrongAnswerCount ) {
                    count++;
                    msg.channel.send( clanRegister.quiz[6].onWrongReply );
                    msg.reply( clanRegister.quiz[6].question )
                    return;
                } else {
                    msg.channel.send( clanRegister.autoCancel );
                    msgCollector.stop('wrong choice');
                    return;
                }
                
            
            case 7:
                if( message.content.toLowerCase() == clanRegister.quiz[7].answer[0] ) {
                    count = 0;
                    registeredClanDetails.attackWinsPoints = clanMetrics.activeMetrics.attackWinsPoints;
                    if ( registeredClanDetails.onlyTownHall && registeredClanDetails.onlyTownHall < 7) {
                        questionNumber = 11;
                        registeredClanDetails.sumOfHeroes = clanRegister.quiz[9].default;
                        registeredClanDetails.heroLevels = clanRegister.quiz[10].default;
                        msg.reply(clanRegister.quiz[11].question);
                        return;
                    } else {
                        questionNumber = 8;
                        msg.reply(clanRegister.quiz[8].question);
                        return;
                    }
                } else if (message.content.toLowerCase() == clanRegister.quiz[7].answer[1]) {
                    count = 0;
                    if ( registeredClanDetails.onlyTownHall && registeredClanDetails.onlyTownHall < 7) {
                        questionNumber = 11;
                        registeredClanDetails.sumOfHeroes = clanRegister.quiz[9].default;
                        registeredClanDetails.heroLevels = clanRegister.quiz[10].default;
                        msg.reply(clanRegister.quiz[11].question);
                        return;
                    } else {
                        questionNumber = 8;
                        msg.reply(clanRegister.quiz[8].question);
                        return;
                    }
                }else if (count < clanRegister.wrongAnswerCount ) {
                    count++;
                    msg.channel.send( clanRegister.quiz[7].onWrongReply );
                    msg.reply( clanRegister.quiz[7].question)
                    return;
                } else {
                    msg.channel.send( clanRegister.autoCancel );
                    msgCollector.stop('wrong choice');
                    return;
                }

            case 8:
                if ( message.content.toLowerCase() ==  clanRegister.quiz[8].answer[0] ) { 
                    count = 0;
                    registeredClanDetails.heroLevels = clanRegister.quiz[10].default;
                    if ( registeredClanDetails.onlyTownHall ) {
                        townhallCount = registeredClanDetails.onlyTownHall;
                        questionNumber = 9;
                        msg.reply( clanRegister.quiz[9].question + registeredClanDetails.onlyTownHall + "?" );
                        return;
                    } else if ( registeredClanDetails.minimumTownHallLevel < 7 ) {
                        townhallCount = 7;
                        questionNumber = 9;
                        msg.channel.send( clanRegister.quiz[9].info );
                        msg.reply( clanRegister.quiz[9].question + '7?');
                        return;
                    } else {
                        townhallCount = registeredClanDetails.minimumTownHallLevel;
                        questionNumber = 9;
                        msg.reply( clanRegister.quiz[9].question + registeredClanDetails.minimumTownHallLevel + "?" );
                        return;
                    }
                } else if ( message.content.toLowerCase() ==  clanRegister.quiz[8].answer[1] ) {
                    count = 0;
                    registeredClanDetails.sumOfHeroes = clanRegister.quiz[9].default;
                    if ( registeredClanDetails.onlyTownHall ) {
                        townhallCount = registeredClanDetails.onlyTownHall;
                        questionNumber = 10;
                        msg.channel.send( clanRegister.quiz[10].info );
                        msg.reply( clanRegister.quiz[10].question + registeredClanDetails.onlyTownHall + "?" );
                        return;
                    } else if ( registeredClanDetails.minimumTownHallLevel < 7 ) {
                        msg.channel.send( clanRegister.quiz[10].info );
                        townhallCount = 7;
                        questionNumber = 10;
                        msg.reply( clanRegister.quiz[10].question + '7?');
                        return;
                    } else {
                        questionNumber = 10;
                        townhallCount = registeredClanDetails.minimumTownHallLevel;
                        msg.channel.send( clanRegister.quiz[10].info )
                        msg.reply( clanRegister.quiz[10].question + registeredClanDetails.minimumTownHallLevel + "?" );
                        return;
                    }
                } else if ( message.content.toLowerCase() ==  clanRegister.quiz[8].answer[2] ) {
                    count = 0;
                    registeredClanDetails.sumOfHeroes = clanRegister.quiz[9].default;
                    registeredClanDetails.heroLevels = clanRegister.quiz[10].default;
                    questionNumber = 11;
                    msg.reply( clanRegister.quiz[11].question);
                    return;
                } else if ( count < clanRegister.wrongAnswerCount ) {
                    count++;
                    msg.channel.send(clanRegister.quiz[8].onWrongReply);
                    msg.reply(clanRegister.quiz[8].question);
                    return;
                } else {
                    msg.channel.send( clanRegister.autoCancel );
                    msgCollector.stop('wrong choice');
                    return;
                }

            case 9:
                if ( Number(message.content) >= 0 && Number(message.content) <= clanRegister.quiz[9].answer[townhallCount] && Number.isInteger(Number(message.content))) {
                    count = 0;
                    if ( registeredClanDetails.onlyTownHall ) {
                        registeredClanDetails.sumOfHeroes[0] = {
                            townHallLevel: registeredClanDetails.onlyTownHall,
                            sumOfHeroes: message.content
                        };
                        questionNumber = 11;
                        msg.reply( clanRegister.quiz[11].question );
                        return;
                    } else {
                        registeredClanDetails.sumOfHeroes[i++] = {
                            townHallLevel: townhallCount ++,
                            sumOfHeroes: message.content
                        };
                        if (townhallCount < 14 ) {
                            msg.reply( clanRegister.quiz[9].question + townhallCount + "?" );
                            return;
                        } else {
                            questionNumber = 11;
                            msg.reply( clanRegister.quiz[11].question);
                            return;
                        }
                    }
                } else if ( count < clanRegister.wrongAnswerCount) {
                    count++;
                    msg.channel.send( clanRegister.quiz[9].onWrongReply );
                    msg.reply( clanRegister.quiz[9].question + townhallCount + "?")
                    return;
                } else {
                    msg.channel.send( clanRegister.autoCancel );
                    msgCollector.stop('wrong choice');
                    return;
                }
            
            case 10:
                const heroLevel = message.content.split('/');
                if ( heroLevel.every( (level) => {return level >= 0} ) && heroLevel.every( (level, index) => {return level <= Number(clanRegister.quiz[10].answer[townhallCount][index])}) && heroLevel.every( (level) => {return Number.isInteger(Number(level))} )) {
                    count = 0;
                    if ( registeredClanDetails.onlyTownHall ) {
                        registeredClanDetails.heroLevels[0] = {
                            townHallLevel: registeredClanDetails.onlyTownHall,
                            heroLevels: heroLevel
                        };
                        questionNumber = 11;
                        msg.reply( clanRegister.quiz[11].question);
                        return;
                    } else {
                        registeredClanDetails.heroLevels[j++] = {
                            townHallLevel: townhallCount++,
                            heroLevels: heroLevel
                        };
                        if ( townhallCount < 14 ) {
                            msg.reply( clanRegister.quiz[10].question + townhallCount + "?" );
                            return;
                        } else {
                            questionNumber = 11;
                            msg.reply( clanRegister.quiz[11].question);
                            return;
                        }
                    }
                } else if ( count < clanRegister.wrongAnswerCount ) {
                    count++;
                    msg.channel.send( clanRegister.quiz[10].onWrongReply );
                    msg.reply( clanRegister.quiz[10].question + townhallCount + "?");
                    return;
                } else {
                    msg.channel.send( clanRegister.autoCancel );
                    msgCollector.stop('wrong choice');
                    return;
                }

            case 11:
                if (message.content.toLowerCase() == clanRegister.quiz[11].answer[0]) {
                    count = 0;
                    if ( registeredClanDetails.onlyTownHall ) {
                        questionNumber = 12;
                        townhallCount = registeredClanDetails.onlyTownHall;
                        msg.channel.send( clanRegister.quiz[12].info);
                        msg.reply( clanRegister.quiz[12].question + registeredClanDetails.onlyTownHall + "?" );
                        return;
                    } else {
                        questionNumber = 12;
                        townhallCount = registeredClanDetails.minimumTownHallLevel;
                        msg.channel.send( clanRegister.quiz[12].info);
                        msg.reply( clanRegister.quiz[12].question + registeredClanDetails.minimumTownHallLevel + "?" );
                        return;
                    }
                } else if (message.content.toLowerCase() == clanRegister.quiz[11].answer[1]) {
                    msg.channel.send(clanRegister.endText);
                    msgCollector.stop('Finished');
                    registeredClanDetails.warStars = clanRegister.quiz[12].default;
                    registeredClanDetails.clanTag = Olf.fixTag(clanMetrics.allClanData.tag);
                    registeredClanDetails.discordID = msg.author.id;
                    pushClanRegisterationToDB(registeredClanDetails, clanDetails);
                    return;
                } else if ( count < clanRegister.wrongAnswerCount) {
                    count++;
                    msg.channel.send( clanRegister.quiz[11].onWrongReply );
                    msg.reply( clanRegister.quiz[11].question);
                    return;
                } else {
                    msg.channel.send( clanRegister.autoCancel );
                    msgCollector.stop('wrong choice');
                    return;
                }

            case 12:
                if ( Number(message.content) >= clanRegister.quiz[12].answer[0] && Number(message.content) <= clanRegister.quiz[12].answer[1] && Number.isInteger(Number(message.content)) ) {
                    count = 0;
                    if (registeredClanDetails.onlyTownHall) {
                        registeredClanDetails.warStars[0] = {
                            townHallLevel: registeredClanDetails.onlyTownHall,
                            warStars: message.content
                        };
                        msg.channel.send(clanRegister.endText);
                        msgCollector.stop('Finished');
                        registeredClanDetails.clanTag = Olf.fixTag(clanMetrics.allClanData.tag);
                        registeredClanDetails.discordID = msg.author.id;
                        pushClanRegisterationToDB(registeredClanDetails, clanDetails);
                        return;
                    } else {
                        registeredClanDetails.warStars[k++] = {
                            townHallLevel: townhallCount++,
                            warStars: message.content
                        };
                        if ( townhallCount < 14) {
                            msg.reply( clanRegister.quiz[12].question + townhallCount + "?");
                            return;
                        } else {
                            msg.channel.send(clanRegister.endText);
                            msgCollector.stop('Finished');
                            registeredClanDetails.clanTag = Olf.fixTag(clanMetrics.allClanData.tag);
                            registeredClanDetails.discordID = msg.author.id;
                            pushClanRegisterationToDB(registeredClanDetails, clanDetails);
                            return;
                        }
                    }   
                } else if ( count < clanRegister.wrongAnswerCount ) {
                    count++;
                    msg.channel.send( clanRegister.quiz[12].onWrongReply );
                    msg.reply( clanRegister.quiz[12].question + townhallCount + "?");
                    return;
                } else {
                    msg.channel.send( clanRegister.autoCancel );
                    msgCollector.stop('wrong choice');
                    return;
                }
        }
    }
}



function pushClanRegisterationToDB(baseRequirements, clanDetails) {
    if (db.pushNewBaseRequirements(baseRequirements) && db.pushNewClanDetails(clanDetails)) {
        console.log('New Clan has been registered.');
    } else {
        console.log('Got error while registering clans.');
    }
}

async function stopSearchingCommandDetails(argument, msg) {
    if (argument && !adminConfig.discordId.includes(msg.author.id)) {
        return;
    } else if(argument && adminConfig.discordId.includes(msg.author.id)) {
        let numberOfDocsModified = await db.setSearchingByAdmin(argument, false);
        if(numberOfDocsModified.n > 0) {
            msg.channel.send(argument + ` search stopped.`);
        } else {
            msg.channel.send(argument + ` can't find this id.`);
        }
    } else {
        let numberOfDocsModified = await db.setSearchingByDiscordID(msg.author.id, false);
        if(numberOfDocsModified.n > 0) {
            msg.channel.send('Stopped searching. Use ``-startsearch`` whenever you wanna restart.');
        } else {
            msg.channel.send('First set a clan bro. Use ``-setreq`` command.');
        }
    }
}

async function startSearchingCommandDetails(argument, msg) {
    if (argument && !adminConfig.discordId.includes(msg.author.id)) {
        return;
    } else if(argument && adminConfig.discordId.includes(msg.author.id)) {
        let numberOfDocsModified = await db.setSearchingByAdmin(argument, true);
        if(numberOfDocsModified.n > 0) {
            msg.channel.send(argument + ` have been started for searching.`);
        } else {
            msg.channel.send(argument + ` can't find this id.`);
        }
    } else {
        let baseRequirements = await db.getBaseRequirementsByDiscordID(msg.author.id);
        if(!baseRequirements) { msg.channel.send('First set a clan for search bro. Use command ``-setreq``.'); return; }
        if(!baseRequirements.searchingByUpdate) { msg.channel.send('Your clan stats aren\'t with us. Please make clan war log visible and after 5 mins. Use ``-update`` command.')}
        if(!baseRequirements.searchingByAdmin) { msg.channel.send(`Your search have been stopped by the mods. Contact support server.`); return; }
        let numberOfDocsModified = await db.setSearchingByDiscordID(msg.author.id, true);
        if(numberOfDocsModified.n > 0) {
            msg.channel.send(`Search started.`);
        } else {
            msg.channel.send(`First set a clan for search bro. Use command ``-setreq``.`);
        }
    }
}

async function deleteRequiremetnsCommandDetails(argument, msg, embed, msgCollector, bot) {
    let baseRequirements = await db.getBaseRequirementsByDiscordID(msg.author.id);
    if(!baseRequirements) { msg.channel.send('There is no clan set by you bro.'); return; }
    if(!baseRequirements.searchingByAdmin) { msg.channel.send('Sorry, you can\'t do this. Contact our server support (' + constants.playmateDiscordInvite +')'); return; }
    msg.reply('Are you sure?\nType ``yes`` or ``no``.');
    question.askQuestion(msg, msgCollector, deleteRequirementsQuestinaire(msg, baseRequirements))
}

function deleteRequirementsQuestinaire(msg, baseRequirements) {
    let count = 0; 
    return (message, msgCollector) => {
        if (message.content.toLowerCase() == 'yes') {
            console.log(msg.author.id)
            db.deleteRequirementsByDiscordID(msg.author.id);
            db.deleteClanDetailsByDiscordID(msg.author.id, msg);
            msgCollector.stop('done');
        } else if (message.content.toLowerCase() == 'no') {
            msg.channel.send('Well ok.');
            msgCollector.stop('done');
        } else if (count < 1) {
            msg.channel.send('Not a valid answer.Type ``yes`` or ``no``.');
            msg.reply('Are you sure?\nType ``yes`` or ``no``.');
        } else {
            msg.channel.send('Due to back to back wrong answer. imma stop this.');
            msgCollector.stop('wrong answer');
        }

    }
}

async function updateCommandDetails(msg) {
    console.log('here');
    let oldClanDetails = await db.getClanDetailsByDiscordId(msg.author.id);
    if(!oldClanDetails) { msg.channel.send('No clans are registered by you.'); return; };
    let allClanData = await Api.getClanDetails(oldClanDetails.clanTag);
    if(!allClanData) { 
        msg.channel.send('Damn, Clan have been deleted!');
        db.deleteClanDetailsByDiscordID(msg.author.id);
        db.deleteRequirementsByDiscordID(msg.author.id);
        return;
    }
    if(!allClanData.isWarLogPublic) { msg.channel.send('Sorry, war log is not visible, If you have made it visble please wait a few minutes.'); return; };
    msg.channel.send('Updating...');
    let allPlayersData = await Api.getAllPlayerDetails(allClanData);
    let warLog = await Api.getWarLog(allClanData.tag);
    let clanMetrics = getMetricsForAllPlayersOfClan(allPlayersData, allClanData, warLog.items);
    let clanDetails = {};
    clanDetails = getClanDetailsDocument(clanMetrics, msg.author.id);
    const numberOfDocsModified = await db.updateClanDetails(msg.author.id, clanDetails);
    
    if(numberOfDocsModified > 0) {
        msg.channel.send('Successfully Updated.');
    } else {
        msg.channel.send('Oops. Something went wrong.');
    }
    const x = await db.setSearchingByDiscordID(msg.author.id, true);
    const y = await db.setSearchingByUpdate(msg.author.id, true);
}

async function updateAllClanDetailsCommandDetails(msg, bot) {
    if (!adminConfig.discordId.includes(msg.author.id)) { return; }
    let deleted = 0;
    let stopped = 0;
    let modified = 0;
    let failed = 0;
    let now = new Date();
    now = new Date(now.setDate(now.getDate()-2));
    const clanDetailsToBeUpdated = await db.getClanDetailsToUpdate(now);
    console.log('Clans to be updated: ' + clanDetailsToBeUpdated.length);
    for(let i = 0; i < clanDetailsToBeUpdated.length; i++) {
        let allClanData = await Api.getClanDetails(clanDetailsToBeUpdated[i].clanTag);
        if(!allClanData) {
            deleted++;
            db.deleteClanDetailsByDiscordID(msg.author.id);
            db.deleteRequirementsByDiscordID(msg.author.id);
            break;
        }
        if(!allClanData.isWarLogPublic) {
            const user = await bot.fetchUser(clanDetailsToBeUpdated[i].discordID);
            user.send('I tried updating your clan details, but your war log is invisble.\nPlease make it visble, and use ``-update`` command in any servers I am in, so as I can continue searching.');
            let docsModified = db.setSearchingByUpdate(clanDetailsToBeUpdated[i].discordID, false);
            if(docsModified == 0) {console.log('Failed to set searching by update');}
            stopped++;
            break;
        };
        let allPlayersData = await Api.getAllPlayerDetails(allClanData);
        let warLog = await Api.getWarLog(allClanData.tag);
        let clanMetrics = getMetricsForAllPlayersOfClan(allPlayersData, allClanData, warLog.items);
        let clanDetails = {};
        clanDetails = getClanDetailsDocument(clanMetrics, msg.author.id);
        const numberOfDocsModified = await db.updateClanDetails(msg.author.id, clanDetails);
        if (numberOfDocsModified > 0 ) { modified++; }
        else {failed++;}
    }
    console.log('Deleted : ' + deleted + '\nStopped : ' + stopped + "\nModified : " + modified + '\nFailed : ' + failed);
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

function getClanDetailsDocument(clanMetrics, discordId) {
    let clanTag = Olf.fixTag(clanMetrics.allClanData.tag);
    return {
        discordID: discordId,
        clanTag: clanTag,
        clanLevel : clanMetrics.allClanData.clanLevel,
        clanName : clanMetrics.allClanData.name,
        members : clanMetrics.allClanData.members,
        clanWarLeague : clanMetrics.allClanData.warLeague.name,
        activityPoints : clanMetrics.activeMetrics.activityPoints,
        points : clanMetrics.points,
        /* clanDetails.nonRushPoints : clanMetrics.rushedMetrics.clanRushPoints; */
        maxPoints : clanMetrics.rushedMetrics.clanMaxPoints,
        clanPoints : clanMetrics.allClanData.clanPoints,
        clanVersusPoints : clanMetrics.allClanData.clanVersusPoints,
        /* clanDetails.warWinRate : clanMetrics.war.winRate; */
        warWins : clanMetrics.allClanData.warWins,
        warLosses : clanMetrics.allClanData.warLosses,
        warTies : clanMetrics.allClanData.warTies,
        location : clanMetrics.allClanData.location,
        warFrequency : clanMetrics.allClanData.warFrequency
    }      
}

async function showRequirementsCommandDetails(argument, msg, embed) {
    let baseRequirements = await db.getBaseRequirementsByDiscordID(msg.author.id);
    if(!baseRequirements) { msg.channel.send('Bruh, there are no clan requirements linked with you. Use ``-setreq`` command to set them up.'); return; }
    let storedClanDetails = await db.getClanDetailsByDiscordId(msg.author.id);
    embedFunctions.requirementsEmbed(baseRequirements, storedClanDetails, msg.channel, embed);
}

async function checkBaseCommandDetails(baseTag, msg, embed) {
    let baseRequirements = await db.getBaseRequirementsByDiscordID(msg.author.id);
    let flag = 1;
    if(!baseRequirements) { msg.channel.send('Bruh, there are no clan requirements linked with you. Use ``-setreq`` command to set them up.'); return;}
    baseTag = Olf.fixTag(baseTag);
    let baseDetails = await Api.getPlayerDetails(baseTag);
    if(!baseDetails) { msg.channel.send('Bruh base tag is incorrect.'); return; }
    const baseMetrics = getMetricForBase(baseDetails);

    let heroes = baseDetails.heroes;
    let checkingBaseDetails = {};
    checkingBaseDetails.townHallLevel = baseDetails.townHallLevel;
    checkingBaseDetails.nonRushPoints = baseMetrics.result.playerRushPoints;
    checkingBaseDetails.maxPoints = baseMetrics.result.playerMaxPoints;
    /* checkingBaseDetails.activityPoints = Number(baseMetrics.playerActivity.activityPoints); */
    checkingBaseDetails.attackWinsPoints = baseMetrics.playerActivity.attackWinsPoints;
    checkingBaseDetails.trophies = baseDetails.trophies;
    checkingBaseDetails.versusTrophies = baseDetails.versusTrophies;
    checkingBaseDetails.warStars = baseDetails.warStars;
    checkingBaseDetails.sumOfHeroes = "0";
    checkingBaseDetails.heroLevels = ["0"];
    
    if(heroes) {
        heroes = Olf.removeByProperty(heroes, "name", "Battle Machine");
        checkingBaseDetails.sumOfHeroes = Olf.sum(heroes, 'level');
        checkingBaseDetails.heroLevels = heroes.map(hero => hero.level);
    }
    if(!(baseRequirements.minimumTownHallLevel <= checkingBaseDetails.townHallLevel || baseRequirements.onlyTownHall == checkingBaseDetails.townHallLevel)) {
        msg.channel.send(`❌ TownHall Level : ${checkingBaseDetails.townHallLevel}\n`);
        flag = 0;
    }
    if(baseRequirements.nonRushPoints > checkingBaseDetails.nonRushPoints){
        msg.channel.send(`❌ Non Rush Points : ${checkingBaseDetails.nonRushPoints}\n`);
        flag = 0;
    }
    if(baseRequirements.maxPoints > checkingBaseDetails.maxPoints){
        msg.channel.send(`❌ Max Points : ${checkingBaseDetails.maxPoints}\n`);
        flag = 0;
    }
    if(baseRequirements.attackWinsPoints > checkingBaseDetails.attackWinsPoints){
        msg.channel.send(`❌ Activity Points : ${checkingBaseDetails.attackWinsPoints}\n`);
        flag = 0;
    }
    if(baseRequirements.trophies > checkingBaseDetails.trophies){
        msg.channel.send(`❌ Home Base Points : ${checkingBaseDetails.trophies}\n`);
        flag = 0;
    }
    if(baseRequirements.versusTrophies > checkingBaseDetails.versusTrophies){
        msg.channel.send(`❌ Builder Base Points : ${checkingBaseDetails.versusTrophies}\n`);
        flag = 0;
    }

    baseRequirements.sumOfHeroes.map(sumOfHeroes => {
        if(sumOfHeroes.townHallLevel == checkingBaseDetails.townHallLevel) {
            if(sumOfHeroes.sumOfHeroes > checkingBaseDetails.sumOfHeroes) {
                msg.channel.send(`❌ Sum Of Heroes : ${checkingBaseDetails.sumOfHeroes}\n`);
                flag = 0;
            }
        }
    });

    baseRequirements.heroLevels.map(heroLevels => {
        if(heroLevels.townHallLevel == checkingBaseDetails.townHallLevel) {
            if(heroLevels.heroLevels > checkingBaseDetails.heroLevels) {
                msg.channel.send(`❌ Hero Levels : ${checkingBaseDetails.heroLevels}\n`);
                flag = 0;
            }
        }
    });

    baseRequirements.warStars.map(warStars => {
        if(warStars.townHallLevel == checkingBaseDetails.townHallLevel) {
            if(warStars.warStars > checkingBaseDetails.warStars) {
                msg.channel.send(`❌ War Stars : ${checkingBaseDetails.warStars}\n`);
                flag = 0;
            }
        }
    });

    if(flag == 1) { msg.channel.send('🔥 Base Checks Out')}
}

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