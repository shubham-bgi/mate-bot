const Api = require('../api');
const registeredClanCollection = require('../dataBase/registeredClanQueries');
const {checkFWA} = require('../multipleUse/checkFWA');
const {fixTag} = require('../multipleUse/fixTag');
const {getMetricsForMembersOfClan} = require('../multipleUse/points');
const {askQuestion} = require('../multipleUse/questions');
const {fetchChannel, checkRole, fetchEmoji} = require('../multipleUse/discordOneLine');
const {listClans}= require('../multipleUse/listClans');
const clanRegister = require('../standardData/clanRegister');
class SetRequirements {
    async lookingForClanMatesCommandDetails(argument, msg, embed, bot) {
        const msgCollector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id, { time: 400000 });
        let regClanDetails = await registeredClanCollection.getByDiscordID(msg.guild.id);
        if (regClanDetails) { 
            msg.channel.send('You can only register one clan per server.'); 
            return; 
        }
        const question = "Which one?\nType the corresponding number or ``no``.";
        const clanTag = await listClans(argument, msg, embed, question);
        if(!clanTag) { return; }
        regClanDetails = await registeredClanCollection.getByClanTag(clanTag);
        if(regClanDetails) {
            if(regClanDetails.discordID.guild != msg.guild.id) {
                const guild = await bot.guilds.get(regClanDetails.discordID.guild);
                msg.channel.send(regClanDetails.clanDetails.name + ' is already regiestered in ' + guild.name + ' server.');
            } else {
                msg.channel.send(regClanDetails.clanDetails.name + ' is already registered in this server.');
            }
            return;
        }
        let clanDetails = await Api.getClanDetails(clanTag);
        if (!clanDetails) {
            msg.channel.send('Wrong clan tag bro.');
            return; 
        }
        if (!clanDetails.isWarLogPublic) {
            msg.channel.send('War log is private, make it public and try again, it helps players searching for the clan. If you have make it public, wait a few minutes.'); 
            return; 
        }

        msg.channel.send('Getting ' + clanDetails.name +' info...');

        let warLog = await Api.getWarLog(clanTag);
        let memberDetails = await Api.getMembersDetails(clanDetails);
        let clanMetrics = getMetricsForMembersOfClan(memberDetails, clanDetails, warLog.items);

        msg.channel.send('You can cancel this anytime by typing ``cancel``.');
        if(clanDetails.members < 5) {
            msg.channel.send('Since, you have less than 5 players in your clan, requirements will be auto set for you to get max players.');
            msg.reply(clanRegister.quiz[13].question);
            askQuestion(msg, msgCollector, this.clanRegisterQuestionaire(msg, clanDetails, clanMetrics, 13, bot))
        }
        if( checkFWA(clanDetails.description) ) {
            msg.reply(clanRegister.quiz[0].question);
            askQuestion(msg, msgCollector, this.clanRegisterQuestionaire(msg, clanDetails, clanMetrics, 0, bot))
        } else if( clanMetrics.townHall.type.startsWith('O') ) {
            msg.reply(clanRegister.quiz[1].question + clanMetrics.townHall.predominantTownHall );
            askQuestion(msg, msgCollector, this.clanRegisterQuestionaire(msg, clanDetails, clanMetrics, 1, bot));
        } else {
            msg.reply(clanRegister.quiz[2].question + clanMetrics.townHall.predominantTownHall);
            askQuestion(msg, msgCollector, this.clanRegisterQuestionaire(msg, clanDetails, clanMetrics, 2, bot));
        }
    }

     clanRegisterQuestionaire(msg, clanDetails, clanMetrics, questionNumber, bot) {
        let count = 0;
        let i = 0;
        let j = 0;
        let k = 0;
        let registeredClanDetails = {};
        registeredClanDetails.baseRequirements = {};
        registeredClanDetails.discordID = {};
        registeredClanDetails.baseRequirements.sumOfHeroes = clanRegister.quiz[9].default;
        registeredClanDetails.baseRequirements.heroLevels = clanRegister.quiz[10].default;
        registeredClanDetails.baseRequirements.warStars = clanRegister.quiz[12].default;
        registeredClanDetails.discordID.guild = msg.guild.id;
        registeredClanDetails.clanDetails = clanDetails;
        registeredClanDetails.clanMetrics = clanMetrics;
        let townhallCount;
        return async (message, msgCollector) => {

            if( message.content.toLowerCase() == 'cancel' ) {
                msg.channel.send('Bye.');
                msgCollector.stop('ended by user');
                return;
            }
        
            switch (questionNumber) {

                case 0://do you guys do war farming?
                    if (clanRegister.quiz[0].positiveAnswer.includes(message.content.toLowerCase())) {
                        count = 0;
                        registeredClanDetails.baseRequirements.needWarFarmers = true;
                        if( clanMetrics.townHall.type.startsWith('O') ) {
                            msg.reply(clanRegister.quiz[1].question + clanMetrics.townHall.predominantTownHall );
                            questionNumber = 1;
                        } else {
                            msg.reply(clanRegister.quiz[2].question + clanMetrics.townHall.predominantTownHall);
                            questionNumber = 2;
                        }
                        return;
                    } else if (clanRegister.quiz[0].negativeAnswer.includes(message.content.toLowerCase())){
                        count = 0;
                        if( clanMetrics.townHall.type.startsWith('O') ) {
                            msg.reply(clanRegister.quiz[1].question + clanMetrics.townHall.predominantTownHall );
                            questionNumber = 1;
                        } else {
                            msg.reply(clanRegister.quiz[2].question + clanMetrics.townHall.predominantTownHall);
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
                
                case 1://Are you guys looking for that TH level only?
                    if (clanRegister.quiz[1].positiveAnswer.includes(message.content.toLowerCase())) {
                        registeredClanDetails.baseRequirements.onlyTownHall = clanMetrics.townHall.predominantTownHall;
                        count = 0;
                        if (clanMetrics.rushedMetrics.maxPoints >=9 && clanMetrics.rushedMetrics.nonRushPoints >=9) {
                            questionNumber = 4;
                            msg.channel.send(clanRegister.quiz[4].info)
                            msg.reply( clanRegister.quiz[4].question + clanMetrics.rushedMetrics.maxPoints);
                            return;
                        } else {
                            questionNumber = 3;
                            msg.channel.send(clanRegister.quiz[3].info);
                            msg.reply( clanRegister.quiz[3].question + clanMetrics.rushedMetrics.nonRushPoints);  
                            return;
                        }
                    } else if (clanRegister.quiz[1].negativeAnswer.includes(message.content.toLowerCase())) {
                        questionNumber = 2;
                        count = 0;
                        msg.reply( clanRegister.quiz[2].question + clanMetrics.townHall.predominantTownHall );
                        return;
                    } else if (count < clanRegister.wrongAnswerCount) {
                        count ++;
                        msg.channel.send( clanRegister.quiz[1].onWrongReply);
                        msg.reply( clanRegister.quiz[1].question + clanMetrics.townHall.predominantTownHall );
                        return;
                    } else {
                        msg.channel.send( clanRegister.autoCancel );
                        msgCollector.stop('wrong choice');
                        return;
                    }
                
                case 2://What's the minimum townhall level?
                    if ( clanRegister.quiz[2].answer.includes(message.content) ) {
                        registeredClanDetails.baseRequirements.townHallLevel = message.content;
                        count = 0;
                        if (clanMetrics.rushedMetrics.maxPoints >=9 && clanMetrics.rushedMetrics.nonRushPoints >=9) {
                            questionNumber = 4;
                            msg.channel.send(clanRegister.quiz[4].info)
                            msg.reply( clanRegister.quiz[4].question + clanMetrics.rushedMetrics.maxPoints);
                            return;
                        } else {
                            questionNumber = 3;
                            msg.channel.send(clanRegister.quiz[3].info);
                            msg.reply( clanRegister.quiz[3].question + clanMetrics.rushedMetrics.nonRushPoints);  
                            return;
                        }
                    } else if (count < clanRegister.wrongAnswerCount) {
                        msg.channel.send( clanRegister.quiz[2].onWrongReply );
                        msg.reply( clanRegister.quiz[2].question + clanMetrics.townHall.predominantTownHall );
                        count ++;
                        return;
                    } else {
                        msg.channel.send( clanRegister.autoCancel);
                        msgCollector.stop('wrong choice');
                        return;
                    }
                
                case 3://minimum non rush points?
                    if ( Number(message.content) >= clanRegister.quiz[3].answer[0]  && Number(message.content) <= clanRegister.quiz[3].answer[1] ) {
                        registeredClanDetails.baseRequirements.nonRushPoints = message.content;
                        count = 0;
                        msg.reply( clanRegister.quiz[5].question )
                        questionNumber = 5;
                        return;
                    }
                    else if (count < clanRegister.wrongAnswerCount) {
                        msg.channel.send( clanRegister.quiz[3].onWrongReply );
                        msg.reply( clanRegister.quiz[3].question + clanMetrics.rushedMetrics.nonRushPoints);
                        count ++;
                        return;
                    }
                    else {
                        msg.channel.send( clanRegister.autoCancel );
                        msgCollector.stop('wrong choice');
                        return;
                    }
                
                case 4://minimum max points
                    if ( Number(message.content) >= clanRegister.quiz[4].answer[0]  && Number(message.content) <= clanRegister.quiz[4].answer[1] ) {
                        registeredClanDetails.baseRequirements.maxPoints = message.content;
                        count = 0;
                        msg.reply( clanRegister.quiz[5].question )
                        questionNumber = 5;
                    } else if (count < clanRegister.wrongAnswerCount) {
                        msg.channel.send( clanRegister.quiz[4].onWrongReply);
                        msg.reply( clanRegister.quiz[4].question + clanMetrics.rushedMetrics.maxPoints );
                        count ++;
                        return;
                    } else {
                        msg.channel.send(clanRegister.autoCancel);
                        msgCollector.stop('wrong choice');
                        return;
                    }
                
                case 5:// minimum home base trophies
                    if ( Number(message.content) >=clanRegister.quiz[5].answer[0]  && Number(message.content) <= clanRegister.quiz[5].answer[1] && Number.isInteger(Number(message.content)) ) {
                        registeredClanDetails.baseRequirements.trophies = message.content;
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
            
                case 6://minimum versus trophies
                    if ( Number(message.content) >= clanRegister.quiz[6].answer[0] && Number(message.content) <= clanRegister.quiz[6].answer[1] && Number.isInteger(Number(message.content)) ) {
                        count = 0;
                        registeredClanDetails.baseRequirements.versusTrophies = message.content;
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
                    
                
                case 7:// do you want attack wins of player as of your clan current average?
                    if( clanRegister.quiz[7].positiveAnswer.includes(message.content.toLowerCase()) ) {
                        count = 0;
                        registeredClanDetails.baseRequirements.attackWinsPoints = clanMetrics.activeMetrics.attackWinsPoints;
                        if ( registeredClanDetails.baseRequirements.onlyTownHall && registeredClanDetails.baseRequirements.onlyTownHall < 7) {
                            questionNumber = 11;
                            msg.reply(clanRegister.quiz[11].question);
                            return;
                        } else {
                            questionNumber = 8;
                            msg.reply(clanRegister.quiz[8].question);
                            return;
                        }
                    } else if (clanRegister.quiz[7].negativeAnswer.includes(message.content.toLowerCase())) {
                        count = 0;
                        if ( registeredClanDetails.baseRequirements.onlyTownHall && registeredClanDetails.baseRequirements.onlyTownHall < 7) {
                            questionNumber = 11;
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

                case 8://do you wanna set hero levels for each town hall?
                    if (clanRegister.quiz[8].positiveAnswer1.includes(message.content.toLowerCase()) ) { 
                        count = 0;
                        registeredClanDetails.baseRequirements.sumOfHeroes = [];
                        if ( registeredClanDetails.baseRequirements.onlyTownHall ) {
                            townhallCount = registeredClanDetails.baseRequirements.onlyTownHall;
                            questionNumber = 9;
                            msg.reply( clanRegister.quiz[9].question + registeredClanDetails.baseRequirements.onlyTownHall + "?" );
                            return;
                        } else {
                            if ( registeredClanDetails.baseRequirements.townHallLevel < 7 ) {
                            townhallCount = 7;
                            msg.channel.send( clanRegister.quiz[9].info );
                            } else {
                            townhallCount = registeredClanDetails.baseRequirements.townHallLevel;  
                            }
                            questionNumber = 9;
                            msg.reply( clanRegister.quiz[9].question + townhallCount + '?');
                            return;
                        }
                    } else if (clanRegister.quiz[8].positiveAnswer2.includes(message.content.toLowerCase()) ) {
                        count = 0;
                        registeredClanDetails.baseRequirements.heroLevels = [];
                        if ( registeredClanDetails.baseRequirements.onlyTownHall ) {
                            townhallCount = registeredClanDetails.baseRequirements.onlyTownHall;
                            questionNumber = 10;
                            msg.channel.send( clanRegister.quiz[10].info );
                            msg.reply( clanRegister.quiz[10].question + registeredClanDetails.baseRequirements.onlyTownHall + "?" );
                            return;
                        } else {
                            if ( registeredClanDetails.baseRequirements.townHallLevel < 7 ) {
                                msg.channel.send( clanRegister.quiz[10].info );
                                townhallCount = 7;
                            } else {
                                townhallCount = registeredClanDetails.baseRequirements.townHallLevel;
                            }
                            questionNumber = 10;
                            msg.reply( clanRegister.quiz[10].question + townhallCount + "?" );
                            return;
                        }
                    } else if (clanRegister.quiz[8].negativeAnswer.includes(message.content.toLowerCase()) ) {
                        count = 0;
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

                case 9:// sum of heroes of each townhall level
                    if ( Number(message.content) >= 0 && Number(message.content) <= clanRegister.quiz[9].answer[townhallCount] && Number.isInteger(Number(message.content))) {
                        count = 0;
                        if ( registeredClanDetails.baseRequirements.onlyTownHall ) {
                            registeredClanDetails.baseRequirements.sumOfHeroes[0] = {
                                townHallLevel: registeredClanDetails.baseRequirements.onlyTownHall,
                                sumOfHeroes: message.content
                            };
                            questionNumber = 11;
                            msg.reply( clanRegister.quiz[11].question );
                            return;
                        } else {
                                registeredClanDetails.baseRequirements.sumOfHeroes[i++] = {
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
                
                case 10://each hero level each town hall
                    const heroLevel = message.content.split('/');
                    if ( heroLevel.every( (level) => {return level >= 0} ) && heroLevel.every( (level, index) => {return level <= Number(clanRegister.quiz[10].answer[townhallCount][index])}) && heroLevel.every( (level) => {return Number.isInteger(Number(level))} )) {
                        count = 0;
                        if ( registeredClanDetails.baseRequirements.onlyTownHall ) {
                                registeredClanDetails.baseRequirements.heroLevels[0] = {
                                townHallLevel: registeredClanDetails.baseRequirements.onlyTownHall,
                                heroLevels: heroLevel
                            };
                            questionNumber = 11;
                            msg.reply( clanRegister.quiz[11].question);
                            return;
                        } else {
                                registeredClanDetails.baseRequirements.heroLevels[j++] = {
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

                case 11://do you wanna set war stars for each town hall?
                    if (clanRegister.quiz[11].positiveAnswer(message.content)) {
                        count = 0;
                        registeredClanDetails.baseRequirements.warStars = [];
                        if ( registeredClanDetails.baseRequirements.onlyTownHall ) {
                            questionNumber = 12;
                            townhallCount = registeredClanDetails.baseRequirements.onlyTownHall;
                            msg.channel.send(clanRegister.quiz[12].info);
                            msg.reply( clanRegister.quiz[12].question + townhallCount + "?" );
                            return;
                        } else {
                            questionNumber = 12;
                            townhallCount = registeredClanDetails.baseRequirements.townHallLevel;
                            msg.channel.send( clanRegister.quiz[12].info);
                            msg.reply( clanRegister.quiz[12].question + townhallCount + "?" );
                            return;
                        }
                    } else if (clanRegister.quiz[11].negativeAnswer.includes(message.content.toLowerCase())) {
                        count = 0;
                        questionNumber = 13;
                        msg.reply(clanRegister.quiz[13].question);
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

                case 12://warstars for each townhall
                    if ( Number(message.content) >= clanRegister.quiz[12].answer[0] && Number(message.content) <= clanRegister.quiz[12].answer[1] && Number.isInteger(Number(message.content)) ) {
                        count = 0;
                        if (registeredClanDetails.baseRequirements.onlyTownHall) {
                                registeredClanDetails.baseRequirements.warStars[0] = {
                                townHallLevel: registeredClanDetails.baseRequirements.onlyTownHall,
                                warStars: message.content
                            };
                            questionNumber = 13;
                            msg.reply(clanRegister.quiz[13].question);
                            return;
                        } else {
                            registeredClanDetails.baseRequirements.warStars[k++] = {
                                townHallLevel: townhallCount++,
                                warStars: message.content
                            };
                            if ( townhallCount < 14) {
                                msg.reply( clanRegister.quiz[12].question + townhallCount + "?");
                                return;
                            } else {
                                questionNumber = 13;
                                msg.reply(clanRegister.quiz[13].question);
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

                case 13://asking for channel id
                    if(fetchChannel(message.content, bot)){
                        count = 0;
                        registeredClanDetails.discordID.channel = message.content;
                        questionNumber = 14;
                        msg.reply(clanRegister.quiz[14].question);
                        return;
                    } else if ( count < clanRegister.wrongAnswerCount ) {
                        count++;
                        msg.channel.send( clanRegister.quiz[13].onWrongReply );
                        msg.reply(clanRegister.quiz[13].question);
                        return;
                    } else {
                        msg.channel.send( clanRegister.autoCancel );
                        msgCollector.stop('wrong choice');
                        return;
                    }
                
                case 14://asking for role id
                    if(checkRole(message.content, msg)) {
                        registeredClanDetails.discordID.role = message.content;
                        if(await registeredClanCollection.newClanRegister(registeredClanDetails)) {
                            fetchChannel(registeredClanDetails.discordID.channel, bot).send(clanRegister.endText + registeredClanDetails.discordID.role);
                            msgCollector.stop('Finished');
                            return;
                        } else {
                            msg.channel.send('Some error occured, never really happens. If happens again please report in our support server.')
                            msgCollector.stop('Database error');
                        }
                    } else if(clanRegister.quiz[14].negativeAnswer.includes(message.content)){
                        if(await registeredClanCollection.newClanRegister(registeredClanDetails)) {
                        fetchChannel(registeredClanDetails.discordID.channel, bot).send(clanRegister.endText);
                        msgCollector.stop('Finished');
                        } else {
                            msg.channel.send('Some error occured, never really happens. If happens again please report in our support server.')
                            msgCollector.stop('Database error');
                        }
                        return;
                    } else if ( count < clanRegister.wrongAnswerCount ) {
                        count++;
                        msg.channel.send( clanRegister.quiz[14].onWrongReply );
                        msg.reply(clanRegister.quiz[14].question);
                        return;
                    } else {
                        msg.channel.send( clanRegister.autoCancel );
                        msgCollector.stop('wrong choice');
                        return;
                    }
            }
        }
    }
}
module.exports = {
    SetRequirements
}