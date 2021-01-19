const constants = require('../constants');
const {removeByProperty, removeFirstLetter, numberWithCommas, capitalizeFirstLetter} = require('./oneLineFunctions');
const {fetchEmoji} = require('./discordOneLine');
const base = require('../../model/base');

function clanEmbed(clanDetails, clanMetrics, embed, bot) {
    const gapEmoji = fetchEmoji(bot, "gap");
    const logoEmoji = fetchEmoji(bot,"logo");
    const tagEmoji = ':label:';
    const trophyEmoji = fetchEmoji(bot, "trophy");
    const vsTrophyEmoji = fetchEmoji(bot,"vsTrophy");
    const winStreakEmoji = ':fire:';
    const calendarEmoji = ':calendar_spiral:';
    const warEmoji = fetchEmoji(bot, "war");
    const levelEmoji = fetchEmoji(bot, "level");
    const warLeagueEmoji = fetchEmoji(bot, clanDetails.warLeague.name);
    const townHallEmoji = fetchEmoji(bot, clanMetrics.townHall.predominantTownHall);
    const membersEmoji = fetchEmoji(bot, "members");
    const membersTypeEmoji = fetchEmoji(bot, "Members Type");
    const swordEmoji = fetchEmoji(bot, "sword");
    const wallWreckerEmoji = fetchEmoji(bot, "Wall Wrecker");
    const barbarianEmoji = fetchEmoji(bot, "Barbarian");
    const donationEmoji = fetchEmoji(bot, "donation");
    const threeStarsEmoji = fetchEmoji(bot, "Three Stars");
    const fieryThreeStarsEmoji = fetchEmoji(bot, "Fiery Three Stars");
    const LightningSpellEmoji = fetchEmoji(bot, "Lightning Spell");
    let flagEmoji;
    let warWinRate;
    let lastFifteenWarWinRate;
    if(clanDetails.location){
        if(clanDetails.location.isCountry)
        {flagEmoji = `:flag_${clanDetails.location.countryCode.toLowerCase()}:`;}
        else
        {flagEmoji = ':earth_asia:';}
    } else {
        flagEmoji  = ':negative_squared_cross_mark:';
        clanDetails.location = {name: 'Not Set'};
    }

    if(clanDetails.isWarLogPublic) {
        warWinRate = clanMetrics.war.winRate.toString() + '%';
        lastFifteenWarWinRate = clanMetrics.war.lastFifteenWarWinRate.toString() + '%';
    } else {
        warWinRate = 'Private War Log';
        lastFifteenWarWinRate = 'Private War Log';
    }
    embed.setColor('#2f3136');
    embed.setAuthor(clanDetails.name, clanDetails.badgeUrls.medium, constants.clanInfoUrl + removeFirstLetter(clanDetails.tag));
    if(clanDetails.description){
        let clanDescription = clanDetails.description.replace(/.{30}\S*\s+/g, "$&@").split(/\s+@/);
        //clanDescription = clanDescription.concat(['\u200B'])
        embed.setDescription(clanDescription);
    }
    embed.addField('\u200B',
    `     ${logoEmoji} **Playmate Score**: ${clanMetrics.points.overall}
    ${tagEmoji} **Clan Tag**: ${clanDetails.tag}
    ${levelEmoji} **Clan Level**: ${clanDetails.clanLevel}
    ${flagEmoji} **Location**: ${clanDetails.location.name}
    ${trophyEmoji} **Clan Trophies**: ${numberWithCommas(clanDetails.clanPoints)}
    ${vsTrophyEmoji} **Clan Versus Trophies**: ${numberWithCommas(clanDetails.clanVersusPoints)}
    \u200B
    ${membersEmoji} **Members**: ${clanDetails.members}/50, ${clanMetrics.rushedMetrics.type}
    ${townHallEmoji} **Town Halls**: ${clanMetrics.townHall.type}
    ${swordEmoji} **Avg Attack Wins**: ${clanMetrics.activeMetrics.attackWins}
    ${donationEmoji} **Avg Donation**: ${numberWithCommas(clanMetrics.activeMetrics.donationRation)}
    ${barbarianEmoji} **Max Troop Donation**: ${clanMetrics.maxDonation.troopStatus}
    ${wallWreckerEmoji} **Max Siege Donation**: ${clanMetrics.maxDonation.siegeStatus}
    ${LightningSpellEmoji} **Max Spells Donation**: ${clanMetrics.maxDonation.spellStatus}`);
    embed.addField('\u200B',
    `${warEmoji} **Total Wars**: ${clanMetrics.war.total}
    ${threeStarsEmoji} **War Win Rate**: ${warWinRate}
    ${fieryThreeStarsEmoji} **Last 15 Wars**: ${lastFifteenWarWinRate}
    ${winStreakEmoji} **War Win Streak**: ${clanDetails.warWinStreak}
    ${calendarEmoji}**War Frequency**: ${capitalizeFirstLetter(clanDetails.warFrequency)}
    ${warLeagueEmoji}**Clan War League**: ${clanDetails.warLeague.name}`);
    return embed;
}

function baseEmbed(baseMetrics, baseDetails, embed, bot) {
    const townHallEmoji = fetchEmoji(bot, baseDetails.townHallLevel);
    const trophyEmoji = fetchEmoji(bot, "trophy");
    const vsTrophyEmoji = fetchEmoji(bot,"vsTrophy");
    const swordEmoji = fetchEmoji(bot, "sword");
    const playerxpEmoji = fetchEmoji(bot, "Player XP");
    const ccEmoji = fetchEmoji(bot, "Clan Castle");
    const greenEmoji = fetchEmoji(bot, "Green Triangle");
    const redEmoji = fetchEmoji(bot, "Red Triangle");
    const axesEmoji = fetchEmoji(bot, "Axes");
    const goldEmoji = fetchEmoji(bot, "Gold");
    const elixirEmoji = fetchEmoji(bot, "Elixir");
    const darkExEmoji = fetchEmoji(bot, "Dark Elixir");
    const heartEmoji = fetchEmoji(bot, "Heart");
    const warLeagueEmoji = fetchEmoji(bot, "warLeague");
    const builderHallEmoji = fetchEmoji(bot, "BH" + baseDetails.builderHallLevel);
    const threeStarEmoji = fetchEmoji(bot, "Three Stars");
    const clanGamesEmoji = fetchEmoji(bot, "Clan Games");
    const clanEmoji = fetchEmoji(bot, "Clan");
    const redCrossEmoji = fetchEmoji(bot, "Red Cross");
    const barbKingEmoji = fetchEmoji(bot, 'Barb King');
    const shieldEmoji = ':shield:';
    const tagEmoji = ':label:';
    let heroLevels;
    if(!baseDetails.clan) {
        baseDetails.clan = {};
        baseDetails.clan.name = '';
        baseDetails.clan.tag = redCrossEmoji;
    }
    if(!baseDetails.league) {
        baseDetails.league = {};
        baseDetails.league.iconUrls = {};
        baseDetails.league.iconUrls.medium = "https://static.wikia.nocookie.net/clashofclans/images/c/c0/Unranked_League.png/revision/latest/scale-to-width-down/92?cb=20171003011534";
    }
    if(baseDetails.heroes) {
        let heroes = baseDetails.heroes;
        heroes = removeByProperty(heroes, "name", "Battle Machine");
        heroLevels = heroes.map(hero => hero.level).toString();
        heroLevels = heroLevels.replace(/,/g, '/')
    } else {
        heroLevels = redCrossEmoji;
    }
    embed.setColor('#2f3136');
    embed.setAuthor(baseDetails.name, baseDetails.league.iconUrls.medium, constants.baseInfoUrl + removeFirstLetter(baseDetails.tag));
    embed.setDescription(`
    ${townHallEmoji} **Townhall**: ${baseDetails.townHallLevel}, ${baseMetrics.rushedMetrics.type}
    ${swordEmoji}**Attack Wins**: ${baseDetails.attackWins}
    ${shieldEmoji} **Defense Wins**: ${baseDetails.defenseWins}
    ${ccEmoji}**Donation**: ${numberWithCommas(baseDetails.donations)}${greenEmoji} ${numberWithCommas(baseDetails.donationsReceived)}${redEmoji}
    ${trophyEmoji} **Trophies**: ${numberWithCommas(baseDetails.trophies)}

    ${builderHallEmoji} **Builder Hall**: ${baseDetails.builderHallLevel}
    ${axesEmoji}**Versus Battle Wins**: ${numberWithCommas(baseDetails.versusBattleWins)}
    ${vsTrophyEmoji} **Versus Trophies**: ${numberWithCommas(baseDetails.versusTrophies)}

    ${clanEmoji}**Clan**: [${baseDetails.clan.name}(${baseDetails.clan.tag})](${constants.clanInfoUrl}${removeFirstLetter(baseDetails.clan.tag)})
    ${threeStarEmoji}**War Stars**: ${numberWithCommas(baseDetails.warStars)}
    ${playerxpEmoji} **Experience**: ${baseDetails.expLevel}
    ${tagEmoji} **Base Tag**: ${baseDetails.tag}
    ${barbKingEmoji} **Heroes**: ${heroLevels}

    ${heartEmoji}**Friend In Need**: ${numberWithCommas(baseDetails.achievements[14].value)}
    ${goldEmoji}**Gold Grab**: ${numberWithCommas(baseDetails.achievements[5].value)}
    ${elixirEmoji}**Elixir Escapade**: ${numberWithCommas(baseDetails.achievements[6].value)}
    ${darkExEmoji}**Heroic Heist**: ${numberWithCommas(baseDetails.achievements[16].value)}
    ${clanGamesEmoji}**Games Champion**: ${numberWithCommas(baseDetails.achievements[31].value)}
    ${warLeagueEmoji}**War League Legend**: ${numberWithCommas(baseDetails.achievements[33].value)}`
    )
    return embed;
}

function requirementsEmbed(baseRequirements, clanDetails, embed) {

    let heroLevelsString = '';
    let sumOfHeroesString = '';
    let warStarsString = '';
    embed.setColor('#2f3136');
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
    if(baseRequirements.attackWinsPoints != -1) {
        embed.addField('Attack wins Check', 'yes', true);
    } else {
        embed.addField('Attack wins Check', 'no', true);
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
    return embed;
}

function listBasesEmbed(bases, msg, embed) {
    embed.setAuthor(msg.author.username, msg.author.avatarURL);
    embed.setColor('#2f3136');
    for (let i = 0; i < bases.length; i++ ) {
        embed.addField(`${i+1}. ${bases[i].name}`, `TH${bases[i].townHallLevel}, [${bases[i].tag}](${constants.baseInfoUrl}${removeFirstLetter(bases[i].tag)}), ${bases[i].type}`);
    }
    return embed;
}

function listClansEmbed(clans, msg, embed) {
    embed.setAuthor(msg.guild.name, msg.guild.iconURL);
    embed.setColor('#2f3136');
    for (let i = 0; i < clans.length; i++ ) {
        embed.addField(`${i+1}. ${clans[i].name}`, `Lvl${clans[i].level}, [${clans[i].tag}](${constants.clanInfoUrl}${removeFirstLetter(clans[i].tag)}), ${clans[i].type}`);
    }
    return embed;
}

function settingsEmbed(embed) {
    embed.setTitle('What do you want in Clan?');
    embed.setColor('#2f3136');
    embed.setDescription(`
    First react with what you want.
    & then react with ☑️

    0️⃣ - High No. of Memebers
    1️⃣ - High Clan War League
    2️⃣ - Good in Clan Wars
    3️⃣ - High Level Clan
    4️⃣ - High Home Village Trophies
    5️⃣ - High Builder Base Trophies
    6️⃣ - High Avg Attack Wins
    7️⃣ - Non Rushed Clan Mates
    8️⃣ - Max Donations
    9️⃣ - Siege Donations
    🔟 - High No. of Donation
    `)
    embed.setFooter(`Once reacted, it can't be undone.`)
    return embed;
}
module.exports = {
    clanEmbed: clanEmbed,
    baseEmbed: baseEmbed,
    requirementsEmbed: requirementsEmbed,
    listBasesEmbed: listBasesEmbed,
    listClansEmbed: listClansEmbed,
    settingsEmbed: settingsEmbed
}
