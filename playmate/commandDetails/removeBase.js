const {fixTag} = require('../multipleUse/fixTag');
const baseCollections = require('../dataBase/baseQueries');
const {baseTypes} = require('../standardData/types.json');
const {listBases} = require('../multipleUse/listBases');
class RemoveBase {
    async pullRemoveBaseCommandDetails(argument, msg, embed){
        if(!argument || baseTypes.includes(argument.toLowerCase())) {
            const question = "Which one?\n Type the corresponding number or ``no``.";
            const baseTag = await listBases(argument, msg, embed, question);
            if(!baseTag){ return; }
            this.pullRemoveBaseCommandDetails(baseTag, msg)
        }
        else {
            argument = fixTag(argument);
            let numberOfDocsModified = await baseCollections.pullOldBaseByBaseTag(msg.author.id, argument);
            if (numberOfDocsModified.nModified > 0) {
                msg.channel.send('Successfully removed.');
            } else {
                msg.channel.send('Error! I have logged the error.');
                console.log('Remove Base Error.');
            }
        }
    }
}
module.exports = {
    RemoveBase
}