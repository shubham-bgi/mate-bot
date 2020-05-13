let clanWarsWon = 50;
let clanWarsLost = 60;
let clanWarsTie = 10;
let clanRushLevel = 'Non Rushed';
let totalWars = clanWarsLost + clanWarsWon + clanWarsTie;
let warWinRate = clanWarsWon / totalWars * 100;
let clanWarTpye = '';

if (clanWarsLost == null){
    console.log('War log is not public');
}
else{
    if (clanWarsTie > clanWarsLost && clanWarsTie > clanWarsWon)
        clanWarTpye = 'Farm War alliance';

    else if (warWinRate > 75 && clanRushLevel == 'Non Rushed')
        clanWarTpye = 'Serious War clan';

    else if (warWinRate > 50 && clanRushLevel != 'Rushed')
        clanWarTpye = 'Casual War clan';

    else
        clanWarTpye = 'Clan Wars are fun';

console.log('Clan War Type - ' + clanWarTpye);
console.log('War Win rate - ' + Math.round(warWinRate) +'%');
}

