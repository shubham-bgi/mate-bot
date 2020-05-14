let percentage = 0;
if (percentage == 0){
    console.log("💀");
}
let numberOfStars = percentage/10;
for(let i = 1; i<numberOfStars;i++){
    console.log("⭐");
}
if (percentage%10 != 0){
    console.log("*");
}
