const constants = require('./constants');
const Olf = require('./oneLineFunctions')

function clanEmbed(clanMetrics, botMsgChannel, embed) {
    if(!botMsgChannel) { return; }
    embed.setColor('#FF00FF');
    embed.setTitle(`${clanMetrics.allClanData.name} - Level ${clanMetrics.allClanData.clanLevel} - ${clanMetrics.allClanData.members}/50`);
    embed.setThumbnail(clanMetrics.allClanData.badgeUrls.medium);
    embed.addField('Description', clanMetrics.allClanData.description,true);
    if(clanMetrics.rushedMetrics.clanRushPoints >= 9.5) {
        embed.addField('Tags', `1)${clanMetrics.pushMetrics}\n2)${clanMetrics.war.type}\n3)${clanMetrics.allClanData.location.name}\n4)${clanMetrics.townHallStatus.level}\n5)${clanMetrics.rushedMetrics.rushStatus}\n6)${clanMetrics.activeMetrics.status}\n7)${clanMetrics.rushedMetrics.maxStatus}`, true);
    } else {
        embed.addField('Tags', `1)${clanMetrics.pushMetrics}\n2)${clanMetrics.war.type}\n3)${clanMetrics.allClanData.location.name}\n4)${clanMetrics.townHallStatus.level}\n5)${clanMetrics.rushedMetrics.rushStatus}\n6)${clanMetrics.activeMetrics.status}`, true);
    }

    embed.addField('In Game Labels',`1)${clanMetrics.allClanData.labels[0].name}\n2)${clanMetrics.allClanData.labels[1].name}\n3)${clanMetrics.allClanData.labels[2].name}`,true);
    if(clanMetrics.allClanData.isWarLogPublic) {
        embed.addField('OverAll Points', `${clanMetrics.points.overall}/50⭐`,true)
    }
    embed.addField('Avg Player Activity', `${clanMetrics.activeMetrics.activityPoints}/10⭐`,true);
    embed.addField('Activity Feel', `${clanMetrics.activeMetrics.activityFeel}/10⭐`,true);
    embed.addField('Non Rush Points', `${clanMetrics.rushedMetrics.clanRushPoints}/10⭐`,true);

    if(clanMetrics.rushedMetrics.clanRushPoints >= 9.5) {
        embed.addField('Maxed Out Points', `${clanMetrics.rushedMetrics.clanMaxPoints}/10⭐`, true);
    }

    embed.addField('Clan War League', clanMetrics.allClanData.warLeague.name,true);
    embed.addField('Predominant TH',`Townhall ${clanMetrics.townHallStatus.predominantTownHall}s`,true);
    embed.addField('No of Siege Donors', clanMetrics.numberOfSiegeDonors,true);

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

function baseEmbed(baseMetrics, baseDetails, botMsgChannel, embed) {
    if(!botMsgChannel) { return; }
    embed.setColor('#FF00FF');
    embed.setTitle(`**${baseDetails.name}**`);
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
    embed.addField('Labels',`1)${baseDetails.labels[0].name}\n2)${baseDetails.labels[1].name}\n3)${baseDetails.labels[2].name}`,true);
    }
    
    embed.addField('Activity Points', baseMetrics.playerActivity.activityPoints+'/10⭐',true);
    embed.addField('Non Rush Points', baseMetrics.result.playerRushPoints+'/10⭐',true);
    if (baseMetrics.result.playerRushPoints >= 9.5) {
        embed.addField('Max Out Points', baseMetrics.result.playerMaxPoints+'/10⭐',true);
    }
    if (baseDetails.clan) { embed.addField('Clan Info', `${baseDetails.clan.name} - *${baseDetails.clan.tag}*`,true); }
    else { embed.addField('Clan Info', 'Not in any clan', true);}
    embed.addField('Trophies', Olf.numberWithCommas(baseDetails.trophies)+'🏆',true);
    embed.addField('League',baseDetails.league.name,true);
    embed.addField('War Stars', Olf.numberWithCommas(baseDetails.warStars),true);
    embed.addField('Troops Donated',Olf.numberWithCommas(baseDetails.donations),true);
    embed.addField('Troops Recieved',Olf.numberWithCommas(baseDetails.donationsReceived), true);
    embed.addField('Lifetime Donations', Olf.numberWithCommas(baseMetrics.playerAchievements[14].value),true);
    embed.addField('War Armies', baseMetrics.result2,true);

    botMsgChannel.send(embed);
}

module.exports = {
    clanEmbed: clanEmbed,
    baseEmbed: baseEmbed
}
