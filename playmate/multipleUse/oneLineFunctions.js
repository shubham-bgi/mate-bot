function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function removeFirstLetter(string) {
    return string.substring(1);
}
function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 || url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
}
function generateRandomNumber(fromNumber, toNumber) {
    if(typeof fromNumber === "undefined") {
    return Math.floor(1000 + Math.random() * 9000);
    }
    return Math.floor(fromNumber + Math.random() * (toNumber-fromNumber));
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
function removeElement(arrayName,arrayElement) {
    for(var i=0; i<arrayName.length;i++ ) { 
        if(arrayName[i]==arrayElement) {
            arrayName.splice(i,1);
            i--;
        }
    }
    return arrayName;
}
/* function convertPercentageToLowToMaxBar(number, ) {
    let low1 = 'a';
    let low2 = 'b';
    let mid = 'c';
    let high1 = 'd';
    let high2 = 'e';
    let 
} */
module.exports = {
    numberWithCommas: numberWithCommas,
    capitalizeFirstLetter: capitalizeFirstLetter,
    removeByProperty: removeByProperty,
    sum: sum,
    removeFirstLetter: removeFirstLetter,
    attachIsImage: attachIsImage,
    removeElement: removeElement
}