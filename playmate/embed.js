const constants = require('./constants');
const Olf = require('./oneLineFunctions')

function clanEmbed(clanMetrics, botMsgChannel, embed) {
    if(!botMsgChannel) { return; }
    embed.setColor('#FF00FF');
    embed.setTitle(`${clanMetrics.allClanData.name} - Level ${clanMetrics.allClanData.clanLevel} - ${clanMetrics.allClanData.members}/50 (${clanMetrics.allClanData.tag})`);
    embed.setURL(`${constants.clanInfoUrl}${Olf.removeFirstLetter(clanMetrics.allClanData.tag)}`);
    embed.setThumbnail(clanMetrics.allClanData.badgeUrls.medium);
    if(clanMetrics.allClanData.description){
        embed.setDescription(clanMetrics.allClanData.description);
    }
    if(clanMetrics.rushedMetrics.clanRushPoints >= 9.5) {
        embed.addField('Tags', `1)${clanMetrics.pushMetrics}\n2)${clanMetrics.war.type}\n3)${clanMetrics.allClanData.location.name}\n4)${clanMetrics.townHallStatus.level}\n5)${clanMetrics.rushedMetrics.rushStatus}\n6)${clanMetrics.activeMetrics.status}\n7)${clanMetrics.rushedMetrics.maxStatus}`, true);
    } else {
        embed.addField('Tags', `1)${clanMetrics.pushMetrics}\n2)${clanMetrics.war.type}\n3)${clanMetrics.allClanData.location.name}\n4)${clanMetrics.townHallStatus.level}\n5)${clanMetrics.rushedMetrics.rushStatus}\n6)${clanMetrics.activeMetrics.status}`, true);
    }

    if (clanMetrics.allClanData.labels[0] && clanMetrics.allClanData.labels[1] && clanMetrics.allClanData.labels[2])
    embed.addField('In Game Labels',`1)${clanMetrics.allClanData.labels[0].name}\n2)${clanMetrics.allClanData.labels[1].name}\n3)${clanMetrics.allClanData.labels[2].name}`,true);
    
    if(clanMetrics.allClanData.isWarLogPublic) {
        embed.addField('Playmate Score', `${clanMetrics.points.overall}/10⭐`,true);
    }
    /* embed.addField('Avg Player Activity', `${clanMetrics.activeMetrics.activityPoints}/10⭐`,true); */
    embed.addField('Activity Points', `${clanMetrics.activeMetrics.activityFeel}/10⭐`,true);
    embed.addField('Non Rush Points', `${clanMetrics.rushedMetrics.clanRushPoints}/10⭐`,true);

    if(clanMetrics.rushedMetrics.clanRushPoints >= 9.5) {
        embed.addField('Maxed Out Points', `${clanMetrics.rushedMetrics.clanMaxPoints}/10⭐`, true);
    }

    embed.addField('Clan War League', clanMetrics.allClanData.warLeague.name,true);
    embed.addField('Predominant TH',`Townhall ${clanMetrics.townHallStatus.predominantTownHall}s`,true);
    embed.addField('No of Siege Donors', clanMetrics.siegeDonors.total,true);

    if(clanMetrics.allClanData.isWarLogPublic) {
    embed.addField('War Win Rate', `${clanMetrics.war.winRate}%`,true);
    embed.addField('Last 15 Wars', `${clanMetrics.war.lastFifteenWinRate}%`,true)
    }

    embed.addField('War Win Streak', clanMetrics.allClanData.warWinStreak,true);
    embed.addField('Clan Points', Olf.numberWithCommas(clanMetrics.allClanData.clanPoints)+'🏆',true);
    embed.addField('Clan Versus Points',Olf.numberWithCommas(clanMetrics.allClanData.clanVersusPoints)+'🏆',true);
    embed.addField('Required Trophies', Olf.numberWithCommas(clanMetrics.allClanData.requiredTrophies)+'🏆',true);
    embed.addField('Status',Olf.capitalizeFirstLetter(clanMetrics.allClanData.type),true);
    botMsgChannel.send(embed);
}

function quickClanEmbed(allClanData, botMsgChannel, embed) {
    if(!botMsgChannel) { return; }
    embed.setColor('#FF00FF');
    embed.setTitle(`${allClanData.name}(${allClanData.tag})`);
    embed.setURL(`${constants.clanInfoUrl}${Olf.removeFirstLetter(allClanData.tag)}`);
    embed.setThumbnail(allClanData.badgeUrls.medium);
    if(allClanData.description)
    embed.setDescription(allClanData.description);
    if (allClanData.labels[0] && allClanData.labels[1] && allClanData.labels[2])
    embed.addField('In Game Labels',`1)${allClanData.labels[0].name}\n2)${allClanData.labels[1].name}\n3)${allClanData.labels[2].name}`,true);
    embed.addField('Level',  allClanData.clanLevel, true);
    embed.addField('Members', allClanData.members, true)
    embed.addField('Clan War League', allClanData.warLeague.name,true);

    if(allClanData.isWarLogPublic) {
        embed.addField('War Wins', allClanData.warWins,true);
        embed.addField('War Losses', allClanData.warLosses,true);
        embed.addField('War Ties', allClanData.warTies,true);
    }
    if(allClanData.warFrequency)
    embed.addField('War Frequency', allClanData.warFrequency, true);
    if(allClanData.location.name)
    embed.addField('Location', allClanData.location.name, true);
    embed.addField('War Win Streak', allClanData.warWinStreak,true);
    embed.addField('Clan Points', Olf.numberWithCommas(allClanData.clanPoints)+'🏆',true);
    embed.addField('Clan Versus Points',Olf.numberWithCommas(allClanData.clanVersusPoints)+'🏆',true);
    embed.addField('Required Trophies', Olf.numberWithCommas(allClanData.requiredTrophies)+'🏆',true);
    embed.addField('Status',Olf.capitalizeFirstLetter(allClanData.type),true);
    botMsgChannel.send(embed);
}

function baseEmbed(baseMetrics, baseDetails, botMsgChannel, embed) {
    if(!botMsgChannel) { return; }
    embed.setColor('#FF00FF');
    embed.setTitle(`**${baseDetails.name}** (${baseDetails.tag})`);
    embed.setURL(`${constants.baseInfoUrl}${Olf.removeFirstLetter(baseDetails.tag)}`);
    if(baseDetails.townHallLevel > 11) {
        let townHall = constants.urlTownHall[baseDetails.townHallLevel];
        embed.setThumbnail(townHall[baseDetails.townHallWeaponLevel]);
    }
    else {
        embed.setThumbnail(constants.urlTownHall[baseDetails.townHallLevel]);
    }

    embed.addField('Townhall', baseDetails.townHallLevel, true);

    if (baseMetrics.result.playerRushPoints >= 9.5) {
        embed.addField('Tags', `1)${baseMetrics.result1}\n2)${baseMetrics.result.rushStatus}\n3)${baseMetrics.result.maxStatus}\n4)${baseMetrics.playerActivity.status}\n5)${baseMetrics.warTag.status}`, true);
    }
    else {
        embed.addField('Tags', `1)${baseMetrics.result1}\n2)${baseMetrics.result.rushStatus}\n3)${baseMetrics.warTag.status}\n4)${baseMetrics.playerActivity.status}`, true);
    }

    if (baseDetails.labels[0] && baseDetails.labels[1] && baseDetails.labels[2]) {
    embed.addField('In Game Labels',`1)${baseDetails.labels[0].name}\n2)${baseDetails.labels[1].name}\n3)${baseDetails.labels[2].name}`,true);
    }
    
    embed.addField('Activity Points', baseMetrics.playerActivity.activityPoints+'/10⭐',true);
    embed.addField('Non Rush Points', baseMetrics.result.playerRushPoints+'/10⭐',true);
    if (baseMetrics.result.playerRushPoints >= 9.5) {
        embed.addField('Max Out Points', baseMetrics.result.playerMaxPoints+'/10⭐',true);
    }
    if (baseDetails.clan) { embed.addField('Clan Info', `[${baseDetails.clan.name} (${baseDetails.clan.tag})](${constants.clanInfoUrl}${Olf.removeFirstLetter(baseDetails.clan.tag)})`,true); }
    else { embed.addField('Clan Info', 'No clan', true);}
    embed.addField('Trophies', Olf.numberWithCommas(baseDetails.trophies)+'🏆',true);
    if (baseDetails.league) {
        embed.addField('League',baseDetails.league.name,true);
    } else {
        embed.addField('League','Unranked',true);
    }

    embed.addField('War Stars', Olf.numberWithCommas(baseDetails.warStars),true);
    embed.addField('Troops Donated',Olf.numberWithCommas(baseDetails.donations),true);
    embed.addField('Troops Recieved',Olf.numberWithCommas(baseDetails.donationsReceived), true);
    embed.addField('Lifetime Donations', Olf.numberWithCommas(baseMetrics.playerAchievements[14].value),true);
    embed.addField('War Armies', baseMetrics.result2,true);
    botMsgChannel.send(embed);
}

function requirementsEmbed(baseRequirements, clanDetails, botMsgChannel,embed) {

    let heroLevelsString = '';
    let sumOfHeroesString = '';
    let warStarsString = '';
    embed.setColor('#FF00FF');
    embed.setTitle(`Requirements of ${clanDetails.clanName} (${clanDetails.clanTag})`);
    if(baseRequirements.onlyTownHall == 0)
    {
        embed.addField('Minimum Townhall', baseRequirements.minimumTownHallLevel, true);
    }
    else {
        embed.addField('Only Townhall', baseRequirements.onlyTownHall, true);
    }
    if(baseRequirements.nonRushPoints != -1) {
        embed.addField('Non Rush Points', baseRequirements.nonRushPoints, true);
    } else {
    embed.addField('Max Points', baseRequirements.maxPoints, true);
    }
    /* embed.addField('Activity Points', baseRequirements.activityPoints, true); */
    if(baseRequirements.attackWinsPoints != -1) {
        embed.addField('Activity Check', 'yes', true);
    } else {
        embed.addField('Activity Check', 'no', true);
    }
    embed.addField('Home Trophies', baseRequirements.trophies, true);
    embed.addField('Builder Base Trophies', baseRequirements.versusTrophies, true);

    if(baseRequirements.heroLevels[0].heroLevels[0] != -1) {
        if(baseRequirements.onlyTownHall == 0) {
            
            for(let i = 0; i < baseRequirements.heroLevels.length ; i++)
                heroLevelsString = heroLevelsString.concat(String(baseRequirements.heroLevels[i].townHallLevel + '-' + baseRequirements.heroLevels[i].heroLevels.join('/') + '\n'));
        } else {
            heroLevelsString = String(baseRequirements.heroLevels[0].townHallLevel + '-' + baseRequirements.heroLevels[0].heroLevels.join('/'))
        }
    }
    
    if(baseRequirements.sumOfHeroes[0].sumOfHeroes != -1) {
        if(baseRequirements.onlyTownHall == 0) {
            
            for(let i = 0; i < baseRequirements.sumOfHeroes.length ; i++)
                sumOfHeroesString = sumOfHeroesString.concat(String(baseRequirements.sumOfHeroes[i].townHallLevel + '-' + baseRequirements.sumOfHeroes[i].sumOfHeroes + '\n'));
        } else {
            sumOfHeroesString = String(baseRequirements.sumOfHeroes[0].townHallLevel + '-' + baseRequirements.sumOfHeroes[0].sumOfHeroes + '\n')
        }
    }

    if(baseRequirements.warStars[0].warStars != -1) {
        if(baseRequirements.onlyTownHall == 0) {
            for(let i = 0; i < baseRequirements.warStars.length ; i++)
                warStarsString = warStarsString.concat(String(baseRequirements.warStars[i].townHallLevel + '-' + baseRequirements.warStars[i].warStars + '\n'));
        } else {
            warStarsString = String(baseRequirements.warStars[0].townHallLevel + '-' + baseRequirements.warStars[0].warStars + '\n')
        }
    }

    if(heroLevelsString != '') { embed.addField('Hero Levels', heroLevelsString, true); }
    if(sumOfHeroesString != '') { embed.addField('Sum of heroes', sumOfHeroesString, true);}
    if(warStarsString != '') { embed.addField('War Stars', warStarsString, true); }
    embed.addField('Total Players Found', baseRequirements.totalPlayersFound, true);
    botMsgChannel.send(embed);
}

function listBasesEmbed(bases, botMsgChannel, embed, username) {
    embed.setTitle(username);
    embed.setColor('#FF00FF');
    for (let i = 0; i < bases.length; i++ ) {
        embed.addField(`${i+1}. ${bases[i].name}`, `TH${bases[i].townHallLevel}, [${bases[i].tag}](${constants.baseInfoUrl}${Olf.removeFirstLetter(bases[i].tag)}), ${bases[i].type}`);
    }
    botMsgChannel.send(embed);
}

function listClansEmbed(clans, botMsgChannel, embed, username) {
    embed.setTitle(username);
    embed.setColor('#FF00FF');
    for (let i = 0; i < clans.length; i++ ) {
        embed.addField(`${i+1}. ${clans[i].name}`, `Lvl${clans[i].level}, [${clans[i].tag}](${constants.clanInfoUrl}${Olf.removeFirstLetter(clans[i].tag)}), ${clans[i].type}`);
    }
    botMsgChannel.send(embed);
}

function topFiveEmbed(clans, msg, embed, baseDetails, baseMetrics, bot) {
    embed.setTitle(`Top clans for ${baseDetails.name}`);
    embed.setURL(constants.baseInfoUrl + Olf.removeFirstLetter(baseDetails.tag));
    embed.setColor('#FF00FF');
    for (let i = 0; i < clans.length && i < 5; i++ ) {
        embed.addField(`${i+1}. ${clans[i].clanName}`, `Lvl${clans[i].clanLevel}, [${clans[i].clanTag}](${constants.clanInfoUrl}${Olf.removeFirstLetter(clans[i].clanTag)}), PM Score - ${clans[i].points.overall}`);
    }
    msg.channel.send(embed);
}

module.exports = {
    clanEmbed: clanEmbed,
    baseEmbed: baseEmbed,
    quickClanEmbed: quickClanEmbed,
    requirementsEmbed: requirementsEmbed,
    listBasesEmbed: listBasesEmbed,
    listClansEmbed: listClansEmbed,
    topFiveEmbed: topFiveEmbed
}
