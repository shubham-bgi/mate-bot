let clanPlayerRush = [100, 60, 50,0,0,0,0,0]
let percentagePerPlayer = 100/clanPlayerRush.length;
console.log(percentagePerPlayer);
let clanRushPercentage = 0;

for (let i = 0;i < clanPlayerRush.length;i++){
    clanRushPercentage += percentagePerPlayer*clanPlayerRush[i];
}
clanRushPercentage = clanRushPercentage/100;
console.log('Clan Rush percentage ' +clanRushPercentage );