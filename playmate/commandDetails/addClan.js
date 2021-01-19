const Api = require('../api');
const clanCollection = require('../dataBase/clanQueries');
const {askQuestion} = require('../multipleUse/questions');
const {fixTag} = require('../multipleUse/fixTag');
const {clanTypes} = require('../standardData/types.json');
const {intoRedableCommands} = require('../multipleUse/discordOneLine')
const clanTypeStr = intoRedableCommands(clanTypes);
class AddClan {

    async pushAddClanCommandDetails(clanTag, msg) {
        const msgCollector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id, { time: 20000 });
        let flag = false;
        clanTag = fixTag(clanTag);
        const clanDetails = await Api.getClanDetails(clanTag);
        if (!clanDetails) { msg.channel.send('Clan tag is incorrect bro.'); return; }
        let clans = await clanCollection.getClansByDiscordId(msg.guild.id);
        if(clans) {
            clans.clans.map( clan => {
                if(clan.tag == clanTag) {
                    msg.channel.send(`${clanDetails.name} is already linked.`);
                    flag = true;
                }
            })
        }
        if(flag) {
            return;
        }
        msg.reply('Do you wanna give it a type? ' + clanTypeStr +'? \n Type your choice.');
        askQuestion(msg, msgCollector, this.addClanCallback(clanDetails, clanTag, msg, msg.channel, msg.author));
    }

    addClanCallback(clanDetails, clanTag, msg, botMsgChannel, botUserDetails) {
        let count = 0;
        return async (message, msgCollector) => {
            let  clanType;
            if (clanTypes.includes(message.content.toLowerCase())) {
                msgCollector.stop('got it');
                clanType = message.content.toLowerCase();
            } else if (count < 1) {
                botMsgChannel.send(`**${botUserDetails.username}**, that's not a valid option bruh,you must choose between`+ clanTypeStr + `.`);
                msg.reply('Do you wanna give it a type? ' + clanTypeStr + '? \n Type your choice.');
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
            let numberOfDocsModified = await clanCollection.updateClansByDiscordId(msg.guild.id, clanToBeadded);
            //console.log(numberOfDocsModified);
            if(numberOfDocsModified.n > 0) {
                botMsgChannel.send(`${clanDetails.name} added.`)
            } else {
                const newClanToBeAdded = {
                    discordID: msg.guild.id,
                    clans: [{
                        name: clanDetails.name,
                        level: clanDetails.clanLevel, 
                        tag: clanTag,
                        type: clanType
                    }]
                }
                if(await clanCollection.pushNewClan(newClanToBeAdded)) {
                    botMsgChannel.send(`${clanDetails.name} added.`);
                } else {
                    botMsgChannel.send(`Something went wrong.`);
                }
            }
        }
    }
}

module.exports = {
    AddClan
}