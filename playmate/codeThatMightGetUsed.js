//FROM APP.JS//
/* {//Utils commands how to read and write json
const Utils = require('./utils.js');

const readJson = Utils.readJson;
const writeJsonClanData = Utils.writeJsonClanData;
const readJsonClanData = Utils.readJsonClanData;
const getUrl = Utils.getUrl;

let playerDetails = readJson(`./json/data/${clanTag}/${playerTag}-${playerName}.json`);
writeJsonClanData(Constants.TOP_CLAN_TAG, { clanData: clanData, playersData: allPlayersData });
//const activeMetric = activeAlgo.getActiveMetricForClan(readJsonClanData(constants.TOP_CLAN_TAG).playersData, allPlayersData)
} */



//FROM APP.JS//
/* { // Message await code for bot
botMsgChannel.send('Any nickname you wanna give, something like, "my main account"? If no type \'n\', it has 25 charcters limit.')
     const quiz = [
        {
            "question": "Do you wanna add type of base,``main``, ``mini`` or ``dono``, reply ``idc`` if you don\'t care.",
            "answers": ["main","mini","dono","idc"]
        }
    ]
    const filter = (response) => {
        return quiz[0].answers.some(answers => answers.toLowerCase() === response.content.toLowerCase()); 
    };
    botMsgChannel.send(quiz[0].question).then(r => r.delete(10000))
    botMsgChannel.awaitMessages({m => m.author.id === }, filter, { max: 1, time: 15000, errors: ['time']})
        .then(collected => {
            console.log(collected.content);
            //pushBaseToDB(baseTag, botMsgChannel, botUserDetails, collected.content);   
        })
        .catch(collected => {
            botMsgChannel.send('Sorry you didn\' respond in time, Please try again.')
        });
} */



//FROM COLLECTOR QUESTION.JS//
//USING AWAIT AGAIN
/* function awaitAskBaseType (botMsgChannel, botUserDetails, msgCollector, msg) {
    const filter = m => m.author.id === msg.author.id;
    //const count = 0;
    msg.reply('Do you wanna give it a type? ``main``, ``mini``, ``dono`` or ``no``? \n Type your choice.')
    return msg.channel.awaitMessages(filter, { maxProccessed : 2, time: 10000, errors: ['time'] }).then(message => {
        if (message.first().content == 'main' || message.first().content == 'mini' || message.first().content == 'dono' || message.first().content == 'no') {
            return message.first().content;
        } else {
            botMsgChannel.send(`**${botUserDetails.username}**, not a valid option bruh, choose between \`\`main\`\`,\`\`mini\`\`,\`\`dono\`\` or \`\`no\`\`.`);
            msg.reply('Do you wanna give it a type? ``main``, ``mini``, ``dono`` or ``no``? \n Type your choice.');
            //count++;
        } 
    })
    .catch( error => {
        if(error == 'time')
        botMsgChannel.send(`**${botUserDetails.username}**, You ran out of time, please try again.`);
        //console.log(error);
    })
} */