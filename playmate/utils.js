import Constants from './constants.js';
import fs from 'fs';

export function getUrl(relativeUrl) {
	return Constants.cocUrl + relativeUrl;
}

export function readJson(filePath) {
	let rawData = fs.readFileSync(filePath);
	return JSON.parse(rawData);
}