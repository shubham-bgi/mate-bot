const Api = require('../api');
const baseCollection = require('../dataBase/baseQueries');
const {askQuestion} = require('../multipleUse/questions');
const {fixTag} = require('../multipleUse/fixTag');
const {baseTypes} = require('../standardData/types.json');
const {intoRedableCommands} = require('../multipleUse/discordOneLine');
const baseTypeStr = intoRedableCommands(baseTypes);
class AddBase {

    async pushAddBaseCommandDetails(baseTag, msg) {
        const botMsgChannel = msg.channel;
        const botUserDetails = msg.author;
        const msgCollector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id, { time: 30000 });
        let flag = false;
        baseTag = fixTag(baseTag);
        const baseDetails = await Api.getPlayerDetails(baseTag);
        if (!baseDetails) { 
            botMsgChannel.send('Base tag is incorrect.'); 
            return; 
        }
        let bases = await baseCollection.getBasesByDiscordId(botUserDetails.id);
        if(bases) {
            bases.bases.map( base => {
                if(base.tag == baseTag) {
                    botMsgChannel.send(`${baseDetails.name} is already linked.`);
                    flag = true;
                }
            })
        }
        if(flag) {
            return;
        }
        msg.reply('Do you wanna give it a type? '+ baseTypeStr +'? \n Type your choice.');
        askQuestion(msg, msgCollector, this.addBaseCallback(baseDetails, baseTag, msg, botMsgChannel, botUserDetails));
    }

    addBaseCallback(baseDetails, baseTag, msg, botMsgChannel, botUserDetails, main) {
        let count = 0;
        return async (message, msgCollector) => {
            let  baseType;
            if (baseTypes.includes(message.content.toLowerCase())) {
                msgCollector.stop('got it');
                baseType = message.content.toLowerCase();
            } else if (count < 1) {
                botMsgChannel.send(`**${botUserDetails.username}**, that's not a valid option, you must choose between` + baseTypeStr + `.`);
                msg.reply('Do you wanna give it a type? ' + baseTypeStr + '? \n Type your choice.');
                count ++;
                return;
            } else {
                botMsgChannel.send(`Again? I have to stop this before you make me crazy.`);
                msgCollector.stop('wrong response');
                return;
            }
            
            const baseToBeadded = [{
                name: baseDetails.name,
                townHallLevel: baseDetails.townHallLevel,
                tag: baseTag,
                type: baseType
            }]
            let numberOfDocsModified = await baseCollection.updateBasesByDiscordId(botUserDetails.id, baseToBeadded);
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
                if(await baseCollection.pushNewBase(newBaseToBeAdded)) {
                    botMsgChannel.send(`${baseDetails.name} (TH${baseDetails.townHallLevel}) added.`);
                } else {
                    botMsgChannel.send(`Something went wrong.`);
                }
            }
        }
    }
}

module.exports = {
    AddBase
}