const Constants = require('./constants.js');
const fs = require('fs');
const path = require('path');

function getUrl(relativeUrl) {
	return Constants.cocUrl + relativeUrl;
}

function readJson(filePath) {
	console.log(filePath);
	let rawData = fs.readFileSync(path.resolve(__dirname, filePath));
	return JSON.parse(rawData);
}

function writeJson(filePath, data) {
	console.log(`Writing data on file path ${filePath}`);
	fs.writeFileSync(path.resolve(__dirname, filePath), JSON.stringify(data));
}

function writeJsonClanData(clanTag, data) {
	let filePath = getClanFilePath(clanTag);
	console.log(`Writing data on file path ${filePath}`);
	fs.writeFileSync(path.resolve(__dirname, filePath), JSON.stringify(data));
	filePath = getClanFilePathWithDate(clanTag);
	fs.writeFileSync(path.resolve(__dirname, filePath), JSON.stringify(data));
}

function readJsonClanData(clanTag) {
	let filePath = getClanFilePath(clanTag);
	let rawData = fs.readFileSync(path.resolve(__dirname, filePath));
	return JSON.parse(rawData);
}

function getClanFilePath( clanTag ) {
	if(clanTag[0] == '#') {
		clanTag = clanTag.slice(1);
	}
	return `json/data/clan/${clanTag}.json`;
}

function getClanFilePathWithDate( clanTag ) {
	if(clanTag[0] == '#') {
		clanTag = clanTag.slice(1);
	}
	return `json/data/clan/${clanTag}-${getDateFormat(new Date())}.json`;
}

function getDateFormat(dateObj) {
	return dateObj.getDate()+'-'+(dateObj.getMonth()+1)+'-'+dateObj.getFullYear();
}

module.exports = {
	getUrl, 
	readJson, 
	writeJsonClanData,
	readJsonClanData
}