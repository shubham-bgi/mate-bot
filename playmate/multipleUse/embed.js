const constants = require('../constants');
const {removeByProperty, removeFirstLetter, numberWithCommas, capitalizeFirstLetter} = require('./oneLineFunctions');
const {fetchEmoji} = require('./discordOneLine');

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
    const threeStarEmoji = fetchEmoji(bot, "Three Stars");
    const clanGamesEmoji = fetchEmoji(bot, "Clan Games");
    const clanEmoji = fetchEmoji(bot, "Clan");
    const redCrossEmoji = fetchEmoji(bot, "Red Cross");
    const barbKingEmoji = fetchEmoji(bot, 'Barb King');
    const shieldEmoji = ':shield:';
    const tagEmoji = ':label:';
    let builderHallEmoji;
    let heroLevels;
    if(!baseDetails.builderHallLevel) {
        baseDetails.builderHallLevel = "Anti Explorer";
        builderHallEmoji = fetchEmoji(bot, "BH1");
    } else {
        builderHallEmoji = fetchEmoji(bot, "BH" + baseDetails.builderHallLevel);
    }
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
    if(baseDetails.heroes[0]) {
        let heroes = baseDetails.heroes;
        heroes = removeByProperty(heroes, "name", "Battle Machine");
        heroLevels = heroes.map(hero => hero.level).toString();
        heroLevels = heroLevels.replace(/,/g, '/')
    } else {
        heroLevels = "None";
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

function requirementsEmbed(regClanDetails, embed) {

    let heroLevelsString = '';
    let sumOfHeroesString = '';
    let warStarsString = '';
    embed.setColor('#2f3136');
    embed.setTitle(`${regClanDetails.clanDetails.name} Requirements`);
    if(regClanDetails.baseRequirements.onlyTownHall == 0)
    {
        embed.addField('Minimum Townhall', regClanDetails.baseRequirements.townHallLevel);
    }
    else {
        embed.addField('Only Townhall', regClanDetails.baseRequirements.onlyTownHall);
    }
    if(regClanDetails.baseRequirements.nonRushPoints != -1) {
        embed.addField('Non Rush Points', regClanDetails.baseRequirements.nonRushPoints);
    } else {
    embed.addField('Max Points', regClanDetails.baseRequirements.maxPoints);
    }
    if(regClanDetails.baseRequirements.attackWinsPoints != -1) {
        embed.addField('Attack wins Check', 'yes');
    } else {
        embed.addField('Attack wins Check', 'no');
    }
    embed.addField('Home Trophies', regClanDetails.baseRequirements.trophies);
    embed.addField('Builder Base Trophies', regClanDetails.baseRequirements.versusTrophies);

    if(regClanDetails.baseRequirements.heroLevels[0].heroLevels[0] != -1) {
        if(regClanDetails.baseRequirements.onlyTownHall == 0) {
            
            for(let i = 0; i < regClanDetails.baseRequirements.heroLevels.length ; i++)
                heroLevelsString = heroLevelsString.concat(String('TH' + regClanDetails.baseRequirements.heroLevels[i].townHallLevel + ' - ' + regClanDetails.baseRequirements.heroLevels[i].heroLevels.join('/') + '\n'));
        } else {
            heroLevelsString = String('TH' + regClanDetails.baseRequirements.heroLevels[0].townHallLevel + ' - ' + regClanDetails.baseRequirements.heroLevels[0].heroLevels.join('/'))
        }
    }
    
    if(regClanDetails.baseRequirements.sumOfHeroes[0].sumOfHeroes != -1) {
        if(regClanDetails.baseRequirements.onlyTownHall == 0) {
            
            for(let i = 0; i < regClanDetails.baseRequirements.sumOfHeroes.length ; i++)
                sumOfHeroesString = sumOfHeroesString.concat('TH' + String(regClanDetails.baseRequirements.sumOfHeroes[i].townHallLevel + ' - ' + regClanDetails.baseRequirements.sumOfHeroes[i].sumOfHeroes + '\n'));
        } else {
            sumOfHeroesString = String('TH' + regClanDetails.baseRequirements.sumOfHeroes[0].townHallLevel + ' - ' + regClanDetails.baseRequirements.sumOfHeroes[0].sumOfHeroes + '\n')
        }
    }

    if(regClanDetails.baseRequirements.warStars[0].warStars != -1) {
        if(regClanDetails.baseRequirements.onlyTownHall == 0) {
            for(let i = 0; i < regClanDetails.baseRequirements.warStars.length ; i++)
                warStarsString = warStarsString.concat(String('TH' + regClanDetails.baseRequirements.warStars[i].townHallLevel + ' - ' + regClanDetails.baseRequirements.warStars[i].warStars + '\n'));
        } else {
            warStarsString = String('TH' + regClanDetails.baseRequirements.warStars[0].townHallLevel + ' - ' + regClanDetails.baseRequirements.warStars[0].warStars + '\n')
        }
    }

    if(heroLevelsString != '') { embed.addField('Hero Levels', heroLevelsString); }
    if(sumOfHeroesString != '') { embed.addField('Sum of heroes', sumOfHeroesString);}
    if(warStarsString != '') { embed.addField('War Stars', warStarsString); }
    embed.addField('Total Players Found', regClanDetails.totalPlayersFound);
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
    First react with, what 
    you care about in a clan 
    & then react with ☑️

    0️⃣ - Number of members
    1️⃣ - Clan War League
    2️⃣ - Clan Wars
    3️⃣ - Clan Level
    4️⃣ - Home Village Trophies
    5️⃣ - Builder Base Trophies
    6️⃣ - High Avg Attack Wins
    7️⃣ - Non Rushed Clan Mates
    8️⃣ - Max Donations
    9️⃣ - Siege Donations
    🔟 - Donation Ration
    `)
    embed.setFooter(`Once reacted, it can't be undone.`)
    return embed;
}

function verificationEmbed(clanDetails, code, embed){
    let clanDescription = "";
    if(clanDetails.description){
        clanDescription = clanDetails.description;
    }
    clanDescription = `**Current Clan Description**
    ${clanDescription}
    \n**Verify your clan**
    Add the code \`\`${code}\`\` in your clan Description.To verify you are leader or coleader of the clan.If you have done it already, please wait atleast 2 minutes before running the command again.
    \nPlease also make sure to make your war log public, It helps players to choose the right clan.`.replace(/.{30}\S*\s+/g, "$&@").split(/\s+@/);
    embed.setColor('#2f3136');
    embed.setAuthor(clanDetails.name, clanDetails.badgeUrls.medium, constants.clanInfoUrl + removeFirstLetter(clanDetails.tag));
    embed.setDescription(clanDescription);
    return embed;
}
module.exports = {
    clanEmbed: clanEmbed,
    baseEmbed: baseEmbed,
    requirementsEmbed: requirementsEmbed,
    listBasesEmbed: listBasesEmbed,
    listClansEmbed: listClansEmbed,
    settingsEmbed: settingsEmbed,
    verificationEmbed: verificationEmbed
}
