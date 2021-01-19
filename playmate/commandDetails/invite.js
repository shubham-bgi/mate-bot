const {playmateInvite, playmateDiscordInvite} = require('../constants');
function inviteCommandDetails(msg, embed) {
    embed.setColor('#FF00FF');
    embed.addField('Add Playmate', `[Here](${playmateInvite})`, true);
    embed.addField('Playmate Support', `[Here](${playmateDiscordInvite})`, true);
    msg.channel.send(embed);
}

module.exports = {
    inviteCommandDetails: inviteCommandDetails
}