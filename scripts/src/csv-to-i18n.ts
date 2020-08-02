/**
 * Converts a curated csv file to a json file
**/

import * as fs from "fs";

// The text read in by the fs read
let rawdata = fs.readFileSync('src/assets/i18n/translations.csv').toString();

// A list of rows in the file split by newlines(cross os compatable)
let rows = rawdata.split(new RegExp('(\r\n|\r|\n)'));
// The first row should contain on the left the heading "en", and on the right
// the code off the language we are translating to
let languages = rows[0].split(',');
let targetLanguage = languages[1];
// Remove the header from the rows to make processing easier
rows.splice(0, 1);

let translationObject = {};

// Loops through the rows and adds the translation to the json object
for(let i of rows){
    let rowData = i.split(',');
    let englishKey = rowData[0];
    let translation = rowData[1];
    translationObject[englishKey] = translation;
}

fs.writeFileSync(`src/assets/i18n/${targetLanguage}.json`, JSON.stringify(translationObject));