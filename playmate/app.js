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
const PlayerWarTag = Algo.GetPlayerWarTag;
const OverAllPoints = Algo.overallPoints;
let rushedAlgo = new RushedAlgo();
let activeAlgo = new ActiveAlgo();
let armiesAlgo = new ArmiesAlgo();
let warTypeAlgo = new WarTypeAlgo();
//const Utils = require('../utils');
//const readJson = Utils.readJson;

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







//-------Runs To Initialize activity parametrs--------//
(function init() {
    activeAlgo.initializeTopClanActiveParameters();
})();
/* function getTopClanDetails(topClanTag) {
    Api.getClanMembersDetails(topClanTag)
    .then( clanData => {
        Api.getAllPlayerDetails(clanData)
        .then( allPlayersData => {
            allPlayersData = allPlayersData.map((playerData) => {
                return playerData.data;
            })
            activeAlgo.initializeTopClanActiveParameters(allPlayersData);
        })
    })
} */













//--------Function that runs Base command-----------//
async function getBaseCommandDetails(argument, botMsgChannel, embed, botUserDetails) {
    if(argument.startsWith('#')) {       
        Api.getPlayerDetails(argument)
            .then( baseDetails => {
                if(baseDetails) {
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
}









async function getClanCommandDetails(clanTag, botMsgChannel, embed) {
    clanTag = Olf.fixTag(clanTag);
    let clanData = await Api.getClanMembersDetails(clanTag);    
    if(clanData){
        let allPlayersData = await Api.getAllPlayerDetails(clanData);
        let allClanData = await Api.getClanDetails(clanTag);
        let warLog = await Api.getWarLog(clanTag);
        const clanMetrics = getMetricsForAllPlayersOfClan(allPlayersData, allClanData, warLog.items);
        embedFunctions.clanEmbed(clanMetrics, botMsgChannel, embed);
    }
    else {
        botMsgChannel.send('Clan tag is incorrect bro');
    }
}










function addBaseCallback(baseDetails, baseTag, msg, botMsgChannel, botUserDetails) {
    let count = 0;
    return async (message, msgCollector) => {
        let  baseType;
        if (message.content == 'main' || message.content == 'mini' || message.content == 'dono' || message.content == 'no') {
            msgCollector.stop('got it');
            baseType = message.content;
        }
        else if (count < 1){
            botMsgChannel.send(`**${botUserDetails.username}**, that's not a valid option bruh,you must choose between \`\`main\`\`,\`\`mini\`\`,\`\`dono\`\` or \`\`no\`\`.`);
            msg.reply('Do you wanna give it a type? ``main``, ``mini``, ``dono`` or ``no``? \n Type your choice.');
            count ++;
            return;
        }
        else {
            botMsgChannel.send(`Again bruh? I have to stop this before you make me crazy.`);
            msgCollector.stop('wrong response');
            return;
        }
        const baseToBeadded = [{
            name: baseDetails.name.toLowerCase(),
            tag: baseTag,
            type: baseType
        }]
        let numberOfDocsModified = await db.updateBasesByDiscordId(botUserDetails.id, baseToBeadded);
        if(numberOfDocsModified.n > 0) {
            botMsgChannel.send(`${baseDetails.name}(TH${baseDetails.townHallLevel}) added.`)
        } else {
            const newBaseToBeAdded = {
                discordId: botUserDetails.id,
                bases: [{
                    name: baseDetails.name.toLowerCase(),
                    tag: baseTag,
                    type: baseType
                }]
            }
            if(db.pushNewBase(newBaseToBeAdded)) {
                botMsgChannel.send(`${baseDetails.name}(TH${baseDetails.townHallLevel}) added.`)
            }
        }
    }
}

async function pushAddBaseCommandDetails(baseTag, botMsgChannel, botUserDetails, msgCollector, msg) {
    baseTag = Olf.fixTag(baseTag);
    const baseDetails = await Api.getPlayerDetails(baseTag);
    let flag = 0;
    if (baseDetails) {
        let bases = await db.getBasesByDiscordId(botUserDetails.id);
        if(bases) {
            bases.bases.map( base => {
                if(base.tag == baseTag) {
                    botMsgChannel.send(`${baseTag} is already linked.`)
                    flag = 1;
                }
            })
        }
        if (flag == 0) {
            msg.reply('Do you wanna give it a type? ``main``, ``mini``, ``dono`` or ``no``? \n Type your choice.')
            question.askQuestion(msg.author, msgCollector, addBaseCallback(baseDetails, baseTag, msg, botMsgChannel, botUserDetails));
        }
    }
    else {
        botMsgChannel.send('Base tag is incorrect bro.')
    }
}










async function pullRemoveBaseCommandDetails(argument, botMsgChannel, botUserDetails) {
    if(argument.startsWith('#')) {
        baseTag = argument.replace('0', 'o').toLowerCase();
        let numberOfDocsModified = await db.pullOldBaseByBaseTag(botUserDetails.id, baseTag);
        if (numberOfDocsModified.n > 0) {
            botMsgChannel.send('Successfully removed');
        } else {
            botMsgChannel.send('No base with that tag is linked :/')
        }
    } else {
        argument = argument.toLowerCase();
        let numberOfDocsModified = await db.pullOldBaseByBaseName(botUserDetails.id, argument);
        if (numberOfDocsModified.n > 0) {
            botMsgChannel.send('Successfully removed');
        } else {
            botMsgChannel.send('No base with that name is linked :/')
        }
    }
}





async function getActivityCommandDetails(clanTag, botMsgChannel) {
    const clanData = await Api.getClanMembersDetails(clanTag);
    const allPlayersData = await Api.getAllPlayerDetails(clanData);
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
    const numberOfSiegeDonors = CheckSiege(allPlayersData);
    const war = warTypeAlgo.checkClanWarType(allClanData, rushedMetrics.clanRushPoints, warLog);
    const overallPoints = OverAllPoints(allClanData, activeMetrics.activityFeel, rushedMetrics.clanRushPoints, war.lastFifteenWinRate, war.winRate)
    return {
        points: overallPoints,
        war: war,
        rushedMetrics: rushedMetrics,
        activeMetrics: activeMetrics,
        pushMetrics: pushMetrics,
        townHallStatus: townHallStatus,
        numberOfSiegeDonors: numberOfSiegeDonors,
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
       /*  baseRequirements = await db.getBaseRequirementsByDiscordID(msg.author.id);
        if (!baseRequirements) { */
            let allClanData = await Api.getClanDetails(clanTag);
            if (allClanData) {
                msg.channel.send('Getting clan info...');
                if (allClanData.isWarLogPublic) {
                    let clanData = await Api.getClanMembersDetails(clanTag);
                    let allPlayersData = await Api.getAllPlayerDetails(clanData);
                    let warLog = await Api.getWarLog(clanTag);
                    let clanMetrics = getMetricsForAllPlayersOfClan(allPlayersData, allClanData, warLog.items);
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
                } else {
                    msg.channel.send('Sorry war log is not public, make it public and wait for 5 minutes, then try again.')
                }
            } else {
                msg.channel.send('Wrong clan tag bro.');
            }
        /* } else {
            msg.channel.send('You can only register one clan right now.')
        } */
    }
}

async function iNeedAClanCommandDetails(baseTag, msg, embed, msgCollector, bot, embed2, embed3) {
    baseTag = Olf.fixTag(baseTag);
    const baseDetails = await Api.getPlayerDetails(baseTag);
    if(!baseDetails) { msg.channel.send('Base Tag is incorrect bro.'); return;} 
    const baseMetrics = getMetricForBase(baseDetails);
    let heroes = baseDetails.heroes;
    let checkingBaseDetails = {};
    checkingBaseDetails.townHallLevel = baseDetails.townHallLevel;
    checkingBaseDetails.nonRushPoints = baseMetrics.result.playerRushPoints;
    checkingBaseDetails.maxPoints = baseMetrics.result.playerMaxPoints;
    checkingBaseDetails.activityPoints = Number(baseMetrics.playerActivity.activityPoints);
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
    checkingBaseDetails.needFWA = false;
    const availableClans = await db.getDetailsOfAvailableClans(checkingBaseDetails);
    if(!availableClans[0]) { msg.channel.send('Didn\'t found any clans for you bro. Sorry, Please try again later.'); return;}
    msg.channel.send('Searching...');
    const availableClanTags = availableClans.map(clan => clan.clanTag);
    const bestClanDetails = await db.getBestClan(availableClanTags);
    msg.channel.send('Finding the best clan...');
    getClanCommandDetails(bestClanDetails[0].clanTag, msg.channel, embed);
    setTimeout(() => { msg.reply(baseRegister.quiz[0].question) }, 6000);
    question.askQuestion(msg, msgCollector, baseRegisterQuestionaire(msg, baseMetrics, baseDetails, availableClans,embed2, embed3, bestClanDetails, bot, 0))
}

function baseRegisterQuestionaire(msg, baseMetrics, baseDetails, availableClans, embed2, embed3, bestClanDetails, bot, questionNumber) {

    let count = 0;
    return async function (message, msgCollector) {
        if( message.content.toLowerCase() == 'cancel' ) {
            msg.channel.send('Bye.');
            msgCollector.stop('ended by user');
            return;
        }

        switch (questionNumber) {
            
            case 0:
                if (message.content.toLowerCase() == baseRegister.quiz[0].answer[0]) {
                    count = 0;
                    const user = await bot.fetchUser(bestClanDetails[0].discordID);
                    msg.channel.send('**'+msg.author.username + '**, I have contacted the clan recruiter, discord name is ' + user.username + '#' + user.discriminator + '.');
                    user.send('Found a player for you! Discord name is ' + msg.author.username + '#' + msg.author.discriminator + '.');
                    embedFunctions.baseEmbed(baseMetrics, baseDetails, user, embed2);
                    setTimeout(()=>{ user.send('If you wish to stop these pings, you can use the command ``stop searching`` in any server I am in.') }, 6000);
                    msgCollector.stop('finished');
                    return;
                } else if (message.content.toLowerCase() == baseRegister.quiz[0].answer[1]) {
                    count = 0;
                    if (bestClanDetails[1]) {
                        questionNumber = 1;
                        msg.channel.send(baseRegister.quiz[1].info);
                        getClanCommandDetails(bestClanDetails[1].clanTag, msg.channel, embed3);
                        setTimeout(()=> { msg.reply(baseRegister.quiz[1].question)}, 6000);
                        return;
                    } else {
                        questionNumber = 2;
                        msg.reply(baseRegister.quiz[2].question);
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
                    count = 0;
                    const user = await bot.fetchUser(bestClanDetails[1].discordID);
                    msg.channel.send('**'+msg.author.username + '**, I have contacted the clan recruiter, discord name is ' + user.username + '#' + user.discriminator + '.');
                    user.send('Found a player for you! Discord name is ' + msg.author.username + '#' + msg.author.discriminator + '.');
                    embedFunctions.baseEmbed(baseMetrics, baseDetails, user, embed2);
                    setTimeout(()=>{ user.send('If you wish to stop these pings, you can use the command ``stop searching`` in any server I am in.') }, 6000);
                    msgCollector.stop('finished');
                } else if (message.content.toLowerCase() == baseRegister.quiz[1].answer[1]) {
                    count = 0;
                    msg.channel.send('Ok, I am still working where you can set your options.');
                    /* questionNumber = 2;
                    msg.reply(baseRegister.quiz[2].question); */
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

            case 2:
                const optionNumbers = message.content.split(',');
                if (optionNumbers.length <= 3 && optionNumbers.every(number => baseRegister.quiz[2].answer.includes(number)) && optionNumbers.every((number, index) => number != optionNumbers[index-1])) {
                    count = 0;
                    msg.channel.send('still working on it');
                    msgCollector.stop('done');
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
        }
    }
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
                    registeredClanDetails.versusTrophies = message.content;
                    questionNumber = 7;
                    count = 0;
                    msg.channel.send(clanRegister.quiz[7].info);
                    msg.reply( clanRegister.quiz[7].question + clanMetrics.activeMetrics.activityPoints);
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
                if( Number(message.content) >= clanRegister.quiz[7].answer[0] && Number(message.content) <= clanRegister.quiz[7].answer[1] ) {
                    count = 0;
                    registeredClanDetails.activityPoints = message.content;
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
                } else if (count < clanRegister.autoCancel ) {
                    count++;
                    msg.channel.send( clanRegister.quiz[7].onWrongReply );
                    msg.reply( clanRegister.quiz[7].question + clanMetrics.activeMetrics.activityPoints)
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
                if (message.content == clanRegister.quiz[11].answer[0]) {
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
                } else if (message.content == clanRegister.quiz[11].answer[1]) {
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
            msg.channel.send(argument + ` have been stopped from searching.`);
        } else {
            msg.channel.send(argument + ` can't find this id.`);
        }
    } else {
        let numberOfDocsModified = await db.setSearchingByDiscordID(msg.author.id, false);
        if(numberOfDocsModified.n > 0) {
            msg.channel.send('Your clan search have been stopped. Use ``startSearching`` whenever you wanna start back.');
        } else {
            msg.channel.send(`First set a clan bro. :/`);
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
        if(!baseRequirements) { msg.channel.send('First set a clan for search bro.Use command ``looking4clanmates``'); return; }
        if(!baseRequirements.searchingByUpdate) { msg.channel.send('Your clan stats aren\'t with us. Please make clan war log visible and after 5 mins. Use ``update`` command.')}
        if(!baseRequirements.searchingByAdmin) { msg.channel.send('Your search have been stopped by the mods. Contact support on our server (' + constants.playmateDiscordInvite +')'); return; }
        let numberOfDocsModified = await db.setSearchingByDiscordID(msg.author.id, true);
        if(numberOfDocsModified.n > 0) {
            msg.channel.send(`Your clan search has restarted.`);
        } else {
            msg.channel.send(`First set a clan for search bro.`);
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
    let clanData = await Api.getClanMembersDetails(allClanData.tag);
    let allPlayersData = await Api.getAllPlayerDetails(clanData);
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
}

async function updateAllClanDetailsCommandDetails(msg, bot) {
    if (!adminConfig.discordId.includes(msg.author.id)) { return; }
    let deleted = 0;
    let stopped = 0;
    let modified = 0;
    let failed = 0;
    let now = new Date();
    now = new Date(now.setDate(now.getDate()-7));
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
            user.send('Your clan details have become old.\nI tried but your war long in invisble.\nPlease make it visble, and use ``update`` command in any servers I am in to continue searching.');
            let docsModified = db.setSearchingByUpdateByDiscodId(clanDetailsToBeUpdated[i].discordID, false);
            if(docsModified == 0) {console.log('Failed to set searching by update');}
            stopped++;
            return;
        };
        let clanData = await Api.getClanMembersDetails(allClanData.tag);
        let allPlayersData = await Api.getAllPlayerDetails(clanData);
        let warLog = await Api.getWarLog(allClanData.tag);
        let clanMetrics = getMetricsForAllPlayersOfClan(allPlayersData, allClanData, warLog.items);
        let clanDetails = {};
        clanDetails = getClanDetailsDocument(clanMetrics, msg.author.id);
        const numberOfDocsModified = await db.updateClanDetails(msg.author.id, clanDetails);
        if (numberOfDocsModified > 0 ) { modified++;}
        else {failed++;}
    }
    console.log('Deleted : ' + deleted + '\nStopped : ' + stopped + "\nModified : " + modified + '\nFailed : ' + failed);
}

function getClanDetailsDocument(clanMetrics, discordId) {
    let clanTag = Olf.fixTag(clanMetrics.allClanData.tag);
    return {
        discordID: discordId,
        clanTag: clanTag,
        clanLevel : clanMetrics.allClanData.clanLevel,
        clanName : clanMetrics.allClanData.name,
        members : clanMetrics.allClanData.members,
        numberOfSiegeDonors : clanMetrics.numberOfSiegeDonors,
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
    updateAllClanDetailsCommandDetails: updateAllClanDetailsCommandDetails
}