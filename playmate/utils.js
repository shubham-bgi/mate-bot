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

module.exports = {
	getUrl, readJson
}