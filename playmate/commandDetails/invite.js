const {playmateInvite, playmateDiscordInvite} = require('../constants');
function inviteCommandDetails(msg, embed) {
    embed.setColor('#2f3136');
    embed.addField('Add Playmate', `Beta Exclusive`, true);//(${playmateInvite})
    embed.addField('Playmate Support', `[Here](${playmateDiscordInvite})`, true);
    msg.channel.send(embed);
}

module.exports = {
    inviteCommandDetails: inviteCommandDetails
}