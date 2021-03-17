const Api = require('../api');
const registeredClanCollection = require('../dataBase/registeredClanQueries');
const {clanEmbed, baseEmbed, settingsEmbed} = require('../multipleUse/embed');
const {removeByProperty, sum} = require('../multipleUse/oneLineFunctions');
const {fixTag} = require('../multipleUse/fixTag');
const {getMetricForBase} = require('../multipleUse/points');
const {listBases} = require('../multipleUse/listBases');
const {fetchChannel} = require('../multipleUse/discordOneLine');
const keyMap = require('../standardData/keyMap');
const {clanTypes} = require('../standardData/types.json');
class NeedClan{   
    async  iNeedAClanCommandDetails(argument, msg, bot, Discord, recentUser, needWarFarmers, prefix) {
        if(!argument || clanTypes.includes(argument.toLowerCase())) {
            const embed = new Discord.RichEmbed();
            let noBaseFoundText;
            const question = "Which base are you searching for?\n Type the corresponding number or ``no``";
            if (!needWarFarmers) {
                noBaseFoundText = "Usage: ``" + prefix + "needclan <your base tag>``\n example. " + prefix + "needclan #cjo28pr8 \n https://youtu.be/x608VYBLqog";
            } else {
                noBaseFoundText = "Usage: ``" + prefix + "needfwa <your base tag>``\n example. " + prefix + "needfwa #cjo28pr8 \n https://youtu.be/x608VYBLqog";
            }
            const baseTag = await listBases(argument, msg, embed, question, noBaseFoundText);
            if(!baseTag) { return; }
            this.iNeedAClanCommandDetails(baseTag, msg, bot, Discord, recentUser, needWarFarmers); 
        } else {
            this.Discord = Discord;
            const embed1 = new Discord.RichEmbed();
            this.bot = bot;
            const baseTag = fixTag(argument);
            this.baseDetails = await Api.getPlayerDetails(baseTag);
            if(!this.baseDetails) { 
                msg.channel.send('oops didn\'t work, server problems or incorrect tag.'); 
                return; 
            }
            this.baseMetrics = getMetricForBase(this.baseDetails);
            let heroes = this.baseDetails.heroes;
            let checkingBaseDetails = {};
            checkingBaseDetails.townHallLevel = this.baseDetails.townHallLevel;
            checkingBaseDetails.nonRushPoints = this.baseMetrics.rushedMetrics.nonRushPoints;
            checkingBaseDetails.maxPoints = this.baseMetrics.rushedMetrics.maxPoints;
            checkingBaseDetails.attackWinsPoints = this.baseMetrics.playerActivity.attackWinsPoints;
            checkingBaseDetails.trophies = this.baseDetails.trophies;
            checkingBaseDetails.versusTrophies = this.baseDetails.versusTrophies;
            checkingBaseDetails.warStars = this.baseDetails.warStars;
            checkingBaseDetails.sumOfHeroes = "0";
            checkingBaseDetails.heroLevels = ["0"];
            checkingBaseDetails.needWarFarmers = needWarFarmers;
            if(heroes) {
                heroes = removeByProperty(heroes, "name", "Battle Machine");
                checkingBaseDetails.sumOfHeroes = sum(heroes, 'level');
                checkingBaseDetails.heroLevels = heroes.map(hero => hero.level);
            }
            this.topClans = await registeredClanCollection.defaultTopClans(checkingBaseDetails);
            if(!this.topClans[0]) {
                msg.channel.send('I couldn\’t find any clan for you right now. Please try again later.');
                return;
            }
            this.availableClanTags = this.topClans.map(clan => clan.clanDetails.tag);
            msg.channel.send('**TOP CLANS FOR ' + this.baseDetails.name.toUpperCase() + '**')
            msg.channel.send(this.generateEmbed(0)).then( message =>{
                if(this.topClans.length > 1) {
                    message.react('▶️'); 
                    message.react('🛠️');
                }
                if(!recentUser.has(this.baseDetails.tag)) message.react('🆗');
                const reactCollector = message.createReactionCollector(
                    (reaction, user) => ['◀️', '▶️', '🆗', '🛠️'].includes(reaction.emoji.name) && user.id === msg.author.id, 
                    { time: 600000 }
                    )
                let currentIndex = 0;
                reactCollector.on('collect', reaction => {
                    message.clearReactions().then(async () => {
                        if(reaction.emoji.name === '🆗' && !recentUser.has(this.baseDetails.tag)) {
                            this.onMatch(currentIndex, msg, recentUser);
                            reactCollector.stop('done');
                            return;
                        }
                        if(reaction.emoji.name === '🆗' && recentUser.has(this.baseDetails.tag)) {
                            if(currentIndex !== 0) await message.react('◀️');
                            if(currentIndex < this.topClans.length-1) message.react('▶️');
                            return;
                        }
                        if(reaction.emoji.name === '🛠️') {
                            message.edit(settingsEmbed(embed1)).then( boxMessage => {
                                message.react('0️⃣')
                                message.react('1️⃣')
                                message.react('2️⃣')
                                message.react('3️⃣')
                                message.react('4️⃣')
                                message.react('5️⃣')
                                message.react('6️⃣')
                                message.react('7️⃣')
                                message.react('8️⃣')
                                message.react('9️⃣')
                                message.react('🔟')
                                message.react('☑️')
                                const reactCollector = boxMessage.createReactionCollector(
                                    (reaction, user) => ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','☑️'].includes(reaction.emoji.name) && user.id === msg.author.id,
                                    { time: 3000000}
                                )
                                reactCollector.on('collect', reaction =>{
                                    if(reaction.emoji.name === '☑️') {
                                        reactCollector.stop('done');
                                        return;
                                    }
                                })
                                reactCollector.on('end', async (collected,reason) => {
                                    if(reason == 'time') {
                                        msg.channel.send('Didn\'n respond in time.');
                                        return;
                                    } else {
                                        message.clearReactions().then(async () => {
                                            this.topClans = await this.reIntializeTopClans(collected);
                                            currentIndex = 0;
                                            message.edit(this.generateEmbed(currentIndex))
                                            if(currentIndex < this.topClans.length-1) await message.react('▶️')
                                            if(!recentUser.has(this.baseDetails.tag)) message.react('🆗');
                                            message.react('🛠️');
                                            return;
                                        })
                                    }
                                })
                            })
                            return;
                        }
                        reaction.emoji.name === '◀️' ? currentIndex -= 1 : currentIndex += 1
                        message.edit(this.generateEmbed(currentIndex))
                        if(currentIndex !== 0) await message.react('◀️')
                        if(currentIndex < this.topClans.length-1) await message.react('▶️')
                        if(!recentUser.has(this.baseDetails.tag)) message.react('🆗');
                        message.react('🛠️');
                    })
                })
            })
        }
    }

    generateEmbed(index) {
        const embed = new this.Discord.RichEmbed();
        const x = clanEmbed(this.topClans[index].clanDetails, this.topClans[index].clanMetrics, embed, this.bot);
        x.setFooter(`🆗 - Ping the recruiter 🛠️ - Set your requirement`)
        return x;
    }
    async reIntializeTopClans(collected) {
        collected.delete('☑️');
        const userOptions = Array.from(collected.keys()).map(number => keyMap[number]);
        return await registeredClanCollection.getUserChoiceClan(this.availableClanTags, userOptions)
    }

    async onMatch(currentIndex, msg, recentUser) {
        recentUser.add(this.baseDetails.tag);
        setTimeout(() => { recentUser.delete(this.baseDetails.tag); }, 86400000);
        
        const finalClan = this.topClans[currentIndex];
        const clanChannel = fetchChannel(finalClan.discordID.channel, this.bot);
        const embed = new this.Discord.RichEmbed();
        const invite = await clanChannel.createInvite({
            maxAge: 86400, // maximum time for the invite, in milliseconds
            maxUses: 3 // maximum times it can be used
        })
        msg.channel.send('**'+msg.author.username + '**, I have pinged the clan recruiters.');
        msg.channel.send("https://discord.gg/" + invite.code);
        if(finalClan.discordID.role)
        clanChannel.send(finalClan.discordID.role);
        clanChannel.send('Found a player for you! Discord name is ' + msg.author.username + '#' + msg.author.discriminator + '.');
        clanChannel.send(baseEmbed(this.baseMetrics, this.baseDetails, embed, this.bot));
        clanChannel.send('If you wish to stop these pings, use ``stopsearch`` command.');
        registeredClanCollection.foundPlayer(finalClan.discordID.guild);
    }
}

module.exports ={
    NeedClan
}