function fixTag(tag) {
    if(!tag.startsWith('#')) { 
        tag = '#'.concat(tag); 
    }
    return tag.replace(/o/ig, '0').toUpperCase();
}

module.exports = {
    fixTag: fixTag
}