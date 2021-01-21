function fetchEmoji (bot, id) {
    const keymap = {
        "gap": "785238180998676521",
        "logo": "801699067796258817",
        "vsTrophy": "785356608292651078",
        "trophy": "785356606521999390",
        "war": "785402096098213888",
        "level": "785403760507617300",
        "sword": "790234196965589033",
        "members": "790273428288569345",
        "warLeague": "790270081597833286",
        "Silver League III" : "790242004831436830",
        "Silver League II" : "790242005023195156",
        "Silver League I" : "790242004084064307",
        "Master League III" : "790242004235321365",
        "Master League II" : "790242004214874142",
        "Master League I" : "790242004100841472",
        "Gold League III" : "790242003916554270",
        "Gold League II" : "790242003732267018",
        "Gold League I" : "790242003522813972",
        "Crystal League III" : "790242003446530068",
        "Crystal League II" : "790242003392790539",
        "Crystal League I" : "790242003450462218",
        "Champion League III" : "790242002968510484",
        "Champion League II" : "790242002750537788",
        "Champion League I" : "790242002486165545",
        "Bronze League III" : "790242003413499965",
        "Bronze League II" : "790242002247352340",
        "Bronze League I" : "790242001815732224",
        "Members Type":"790242750930616340",
        "donation" : "790244236590448660" ,
        "Green Triangle": "799470780462661642",
        "Red Triangle": "799470780261072967",
        "Clan Castle": "799470780543008799",
        "Axes": "799470780329099295",
        "Unranked": "799470612770062358",
        "1" : "790240917281701958", 
        "10" : "790241416844017704", 
        "11" : "790241424519856148", 
        "12" : "790241425434214471", 
        "13" : "790241884672622623", 
        "2" : "790240919198105641", 
        "3" : "790240923312717834", 
        "4" : "790240988080898058", 
        "5" : "790241325933002793" , 
        "6" : "790241354252681227" , 
        "7" : "790241376276578315" , 
        "8" : "790241424393895937" , 
        "9" : "790241424372400149" ,
        "BH1" : "799794398459461653",
        "BH2" : "799794399273418782",
        "BH3" : "799794400234307644",
        "BH4" : "799794401416839168",
        "BH5" : "799794400678772757",
        "BH6" : "799794400347291679",
        "BH7" : "799794401257455618",
        "BH8" : "799794401647263765",
        "BH9" : "799794401341210655",
        "Wall Wrecker" : "790244342311682068",
        "Barbarian" : "790245087049023508",
        "Lightning Spell" : "790245085203529728",
        "Three Stars" : "790488032733691924",
        "Fiery Three Stars" : "790488036411441182",
        "Barb King": "799802525468590130",
        "Archer Queen": "799802525905190943",
        "Warden": "799802526329339945",
        "Rod": "799802526329339945",
        "Gold": "799802524491841546",
        "Elixir": "799802524252110849",
        "Dark Elixir": "799802524374007828",
        "Player XP": "799802524373745727",
        "Heart": "799802524655550474",
        "Clan Games": "799802525770973235",
        "Clan": "799814442690412554",
        "Red Cross": "799816422812286976"
    }
    id = keymap[id];
    return bot.emojis.get(id).toString();
}
function intoRedableCommands (arr) {
    return ("``" + (arr.toString().replace(/,/g, '``, ``')) + "``").replace(/,(?=[^,]*$)/, ' or')
}
function fetchChannel(id, bot){
    id = id.replace(/<#/g, '');
    id = id.replace(/>/g, '');
    return bot.channels.get(id);
}
function checkRole(id, msg){
    id = id.replace(/<@&/g, '');
    id = id.replace(/>/g, '');
    return msg.guild.roles.find(x => x.id === id);
}
module.exports = {
    fetchEmoji: fetchEmoji,
    fetchChannel: fetchChannel,
    checkRole: checkRole,
    intoRedableCommands: intoRedableCommands
}