function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function checkFWA(clanDescription) {
    let x = clanDescription.search(/fwa/i);
    let x1 = clanDescription.search(/farming war alliance/i);
    let x2 = clanDescription.search(/farm war alliance/i);
    let x3 = clanDescription.search(/farmwaralliance/i);
    let x4 = clanDescription.search(/f.w.a/i);
    if ( x != -1 || x1 != -1 || x2 != -1 || x3 != -1 || x4 != -1) {
        return true;
    }
    return false;
}
function fixTag(tag) {
    if(!tag.startsWith('#')) { tag = '#'.concat(tag); }
    return tag.replace('0', 'o').toLowerCase();
}
function removeByProperty(arr, prop, value){//remove a item if property matches the value
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(prop) 
           && (arguments.length > 2 && arr[i][prop] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}
function sum(arr, prop){//Add values of a single property in array of objects
    return arr.reduce((a, b) => {
        return a + b[prop];
    }, 0);
};
module.exports = {
    numberWithCommas: numberWithCommas,
    capitalizeFirstLetter: capitalizeFirstLetter,
    checkFWA: checkFWA,
    fixTag: fixTag,
    removeByProperty: removeByProperty,
    sum: sum
}